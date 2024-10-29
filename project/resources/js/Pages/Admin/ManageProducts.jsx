import DashboardBox from '@/Components/Modals/DashboardBox';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaEdit } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import PostNotification from '@/Components/Modals/Notification';
import Checkbox from '@/Components/Buttons/Checkbox';
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { IoTrashOutline } from 'react-icons/io5';

export default function ManageProducts({ auth, categories = [], products = [] }) {
    const [notifMessage, setNotifMessage] = useState('');
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [notifType, setNotifType] = useState('success');
    const [selectedParentCategory, setSelectedParentCategory] = useState(null);  
    const [selectedSubCategory, setSelectedSubCategory] = useState(null); 
    const [selectedProductForEdit, setSelectedProductForEdit] = useState(null); 
    const [filter, setFilter] = useState('all'); 
    const [isFormVisible, setIsFormVisible] = useState(false);  
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null); 
    const menuRef = useRef(null);
    const [images, setImages] = useState([]); 
    const [imagesByCategory, setImagesByCategory] = useState({});
    const [selectedImage, setSelectedImage] = useState('');

    useEffect(() => {
        const fetchImages = async () => {
            const response = await fetch('/products/images'); 
            if (!response.ok) {
                console.error('Error fetching images:', response.statusText);
                return; 
            }
            const imagesData = await response.json();
            setImagesByCategory(imagesData); 
        };

        fetchImages();
    }, []);



    const handleImageSelect = (imageUrl) => {
        setSelectedImage(imageUrl); 
        setData('image', imageUrl); 
    };

    const toggleMenu = (product) => {
        if (selectedProduct === product) {
            setIsMenuOpen(!isMenuOpen);
        } else {
            setSelectedProduct(product);
            setIsMenuOpen(true);
        }
    };

    const handleOutsideClick = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuOpen(false);
            setSelectedProduct(null);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const handleEnableDisable = () => {
        // need to make on off
        console.log(selectedProduct.is_available === 1 ? 'Disabling product...' : 'Enabling product...');
        setIsMenuOpen(false);
    };

    const handleDelete = () => {
        // make delete
        console.log('Deleting product...');
        setIsMenuOpen(false);
    };

    const handleRemoveFromCategory = () => {
        //make remove from cat lol
        console.log('Removing product from category...');
        setIsMenuOpen(false);
    };

    // Move the resetForm function outside the handleSubmit
    const resetForm = () => {
        setData({ 
            name: '',
            description: '',
            price: '',
            is_available: false,
            quantity: '',
            category_id: selectedSubCategory || selectedParentCategory || '' ,
            image: '',
        });
        setSelectedImage(''); 
        setIsFormVisible(false); 
        console.log("Form reset"); 
    };

    const { data, setData, post } = useForm({
        name: '',
        description: '', 
        price: '',
        is_available: false,
        quantity: '',
        category_id: selectedSubCategory || selectedParentCategory || '' ,
        image: '', 
    });

    const parentCategories = categories.filter(category => !category.parent_id);
    const subCategories = selectedParentCategory
        ? categories.filter(category => category.parent_id === selectedParentCategory)
        : [];

    const closeNotif = () => setIsNotifOpen(false);

    const handleParentCategoryClick = (categoryId) => {
        setSelectedParentCategory(categoryId);
        setSelectedSubCategory(null);  
        setFilter('all'); 
    };

    const handleSubCategoryClick = (categoryId) => {
        setSelectedSubCategory(categoryId);
        setFilter('all'); 
    };

    const handleFilterChange = (filterType) => {
        setFilter(filterType);
        setSelectedParentCategory(null);  
        setSelectedSubCategory(null);
    };

    const filteredProducts = products.filter(product => {
        if (selectedParentCategory) {
            const subCategoryIds = categories
                .filter(category => category.parent_id === selectedParentCategory)
                .map(subCategory => subCategory.id);
            
            if (selectedSubCategory) {
                if (product.category_id !== selectedSubCategory) return false; 
            } else {
                if (product.category_id !== selectedParentCategory && !subCategoryIds.includes(product.category_id)) {
                    return false; 
                }
            }
        }
    
        if (filter === 'disabled') return product.is_available === 0;  
        if (filter === 'available') return product.is_available === 1; 
        if (filter === 'without-category') return !product.category_id;
    
        return true;
    });
    
    

    const handleAddProduct = () => {
        setIsFormVisible(!isFormVisible);
    };

    const handleEditProductClick = (product) => {
        setSelectedProductForEdit(product);
        setIsFormVisible(true);  
        setData({  
            name: product.name,
            description: product.description,
            price: product.price,
            is_available: product.is_available,
            quantity: product.quantity,
            category_id: product.category_id,
            image: product.image,  
        });
        
        setSelectedImage(product.image);
    
        const category = categories.find(cat => cat.id === product.category_id);
        if (category) {
            if (category.parent_id) {
                setSelectedSubCategory(category.id);
                setSelectedParentCategory(category.parent_id);
            } else {
                setSelectedParentCategory(category.id);
                setSelectedSubCategory(null);
            }
        }
    };

    const getSelectedCategoryName = () => {
        if (selectedSubCategory) {
            const subCategory = categories.find(cat => cat.id === selectedSubCategory);
            return subCategory ? subCategory.name : 'All Products';
        }
        if (selectedParentCategory) {
            const parentCategory = categories.find(cat => cat.id === selectedParentCategory);
            return parentCategory ? parentCategory.name : 'All Products';
        }
        return 'Visi produkti'; 
    };
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            if (selectedProductForEdit) {
                // Edit a product
                const response = await axios.put(`/admin/products/${selectedProductForEdit.id}`, {
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    is_available: data.is_available,
                    quantity: data.quantity,
                    category_id: data.category_id,
                    image: selectedImage,
                });
    
                setNotifMessage('Produkts veiksmīgi atjaunināts!');
                setNotifType('success');
                setIsNotifOpen(true);
                resetForm();

                setTimeout(() => {
                    router.get('/admin/manageproducts', {}, { replace: true });
                }, 3000); 
            } else {
                // Add a new product
                const response = await axios.post('/admin/products', {
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    is_available: data.is_available,
                    quantity: data.quantity,
                    category_id: data.category_id,
                    image: selectedImage,
                });

                console.log("Add product response:", response);

                if (response.data && response.data.message) {
                    setNotifMessage(response.data.message); 
                } else {
                    setNotifMessage('Produkts veiksmīgi pievienots!'); 
                }
                setNotifType('success');
                setIsNotifOpen(true); 
                resetForm();

                setTimeout(() => {
                    router.get('/admin/manageproducts', {}, { replace: true });
                }, 3000); 
            }
        } catch (error) {
            console.error("Kļūda pievienojot produktu:", error);
            setNotifMessage(selectedProductForEdit ? 'Neizdevās atjaunināt produktu.' : 'Neizdevās pievienot produktu.');
            setNotifType('error');
            setIsNotifOpen(true);
        }
    };
    

    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Pievienot vai rediģēt produktu</h2>}
        >
            <Head title="Manage Products" />

            <div className="flex">
                {/* Sidebar */}
                <div className="w-1/4 h-screen border-2 border-gray-200 p-4 bg-gray-100 dark:bg-gray-800">
                    <div className="mb-4">
                        <h3 className="font-semibold text-lg">Filtrēt</h3>
                        <ul className="mt-2 space-y-2">
                            <li>
                                <button
                                    onClick={() => handleFilterChange('all')}
                                    className={`text-sm ${filter === 'all' ? 'font-bold text-blue-500' : ''}`}
                                >
                                    Visi produkti
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleFilterChange('disabled')}
                                    className={`text-sm ${filter === 'disabled' ? 'font-bold text-blue-500' : ''}`}
                                >
                                    Atspējoti produkti
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleFilterChange('available')}
                                    className={`text-sm ${filter === 'available' ? 'font-bold text-blue-500' : ''}`}
                                >
                                    Iespējoti produkti
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleFilterChange('without-category')}
                                    className={`text-sm ${filter === 'without-category' ? 'font-bold text-blue-500' : ''}`}
                                >
                                    Produkti bez kategorijas
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg">Kategorijas</h3>
                        <ul className="mt-2 space-y-2">
                            {parentCategories.map(category => (
                                <li key={category.id}>
                                    <button
                                        onClick={() => handleParentCategoryClick(category.id)}
                                        className={`text-sm category-button ${selectedParentCategory === category.id ? 'font-bold text-blue-500' : ''}`}
                                    >
                                        {category.name} ({category.total_products_count}) 
                                    </button>

                                    {selectedParentCategory === category.id && Array.isArray(category.children) && category.children.length > 0 && (
                                        <ul className="ml-4 mt-2 space-y-1">
                                            {category.children.map(child => (
                                                <li key={child.id}>
                                                    <button
                                                        onClick={() => handleSubCategoryClick(child.id)}
                                                        className={`text-sm ${selectedSubCategory === child.id ? 'font-bold text-blue-500' : ''}`}
                                                    >
                                                        {child.name} ({child.products_count}) 
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>

                    </div>

                </div>
                {/* Main Content */}
                <div className='flex flex-col w-full'>
                    
                    <div className='flex justify-between items-center w-full p-4'>
                        <div>Izvēlētā kategorija: {getSelectedCategoryName()}</div>
                        <div>Meklēt</div>{/**Add a searchbar here**/}
                        
                        {/* Only show the Add Product button if a category is selected */}
                        {(selectedParentCategory || selectedSubCategory) && (
                            <button
                                className=" new-product mt-4 flex items-center justify-center p-2 bg-blue-500 text-white rounded-md w-1/5"
                                onClick={handleAddProduct} 
                            >
                                <IoIosAddCircleOutline className="mr-2" /> Pievienot jaunu produktu
                            </button>
                        )}
                    </div>
                    
                    <div className='flex flex-row w-full'>
                        {/* Products List */}
                        <div className="w-full p-4 h-[70dvh]" style={{ overflowY: 'auto' }}>
                            {filteredProducts.length > 0 ? (
                                <div className="flex flex-col">
                                    {filteredProducts.map(product => (
                                        <div
                                            key={product.id}
                                            className="flex justify-between items-center rounded-md h-24 bg-white p-4 border-2 border-gray-200 dark:bg-gray-700 w-full cursor-pointer"
                                            onClick={() => handleEditProductClick(product)}  
                                        >
                                            {/* Image Container */}
                                            <div className='w-20 h-20 relative block'>
                                                <img 
                                                    src={product.image} 
                                                    alt='product image' 
                                                    className='h-full w-full rounded-md object-cover' 
                                                />
                                            </div>
                                            
                                            {/* Product Name */}
                                            <div className='flex justify-start items-center w-2/5'>
                                                <h4 className="font-semibold text-lg">{product.name}</h4>
                                            </div>
                                            
                                            {/* Product Availability */}
                                            <div className='flex justify-center items-center w-1/5'>
                                                <p 
                                                    className={`text-sm text-center ${
                                                        product.is_available === 0 
                                                        ? 'text-red-500 font-bold bg-red-100 p-2 rounded-md' 
                                                        : 'text-green-500 font-semibold bg-green-100 p-2 rounded-md' 
                                                    } dark:${product.is_available === 0 ? 'text-red-300' : 'text-green-300'}`}
                                                >
                                                    {product.is_available === 0 ? 'Izslēgts' : 'Aktīvs'} 
                                                </p>
                                            </div>
                                    
                                            {/* Product Price */}
                                            <div className='flex justify-center items-center w-1/5'>
                                                <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 text-center">
                                                    €{product.price}
                                                </p>
                                            </div>
                                            
                                            {/* Menu */}
                                            <div className='flex justify-center items-center relative'>
                                                <HiOutlineDotsCircleHorizontal size={32} onClick={(e) => { e.stopPropagation(); toggleMenu(product); }} />
                                                {isMenuOpen && selectedProduct === product && (
                                                    <div ref={menuRef} className="absolute right-10 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                                                        <div className="py-2">
                                                            <button
                                                                onClick={handleEnableDisable}
                                                                className={`flex items-center w-full px-4 py-2 text-sm text-center hover:bg-gray-100 ${
                                                                    product.is_available === 0 
                                                                    ? 'text-green-500 p-2 rounded-md' 
                                                                    : 'text-red-500 p-2 rounded-md' 
                                                                } dark:${product.is_available === 0 ? 'text-red-300' : 'text-green-300'}`}
                                                            >
                                                                {product.is_available === 0 ? 'Ieslēgt' : 'Izslēgt'} 
                                                            </button>
                                                            <button
                                                                onClick={handleDelete}
                                                                className="flex items-center w-full px-4 py-2 text-red-500 text-sm hover:bg-gray-100"
                                                            >
                                                                <IoTrashOutline className="mr-2" /> Delete
                                                            </button>
                                                            <button
                                                                onClick={handleRemoveFromCategory}
                                                                className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                                                            >
                                                                Remove from Category
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>                                   
                                    ))}
                                </div>
                            ) : (
                                <p>Nav atrasta neviena produkta pēc šī filtrējuma.</p>
                            )}
                        </div>

                        {/* Adding or editing product form */}
                        {isFormVisible && (
                            <div className="w-full p-4" style={{ height: '500px', overflowY: 'auto' }}>
                                <h3 className="text-lg font-semibold mb-4">
                                    {selectedProductForEdit ? 'Rediģēt produktu' : 'Pievienot jaunu produktu'}
                                </h3>
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label>Nosaukums</label>
                                        <input
                                            id='name'
                                            type="text"
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            required
                                            className="w-full border border-gray-300 rounded-md p-2"
                                        />
                                    </div>
                                    <div>
                                        <label>Apraksts</label>
                                        <textarea
                                            id='description'
                                            value={data.description}
                                            onChange={e => setData('description', e.target.value)}
                                            required
                                            className="w-full border border-gray-300 rounded-md p-2"
                                        />
                                    </div>
                                    <div>
                                        <label>Cena</label>
                                        <input
                                            id='price'
                                            type="number"
                                            value={data.price}
                                            onChange={e => setData('price', e.target.value)}
                                            required
                                            className="w-full border border-gray-300 rounded-md p-2"
                                        />
                                    </div>
                                    <div>
                                        <label className='flex items-center'>
                                            <Checkbox
                                                checked={data.is_available}
                                                onChange={e => setData('is_available', e.target.checked)}
                                            />
                                            <span className='mx-2'>Pieejams</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label>Skaits</label>
                                        <input
                                            id='quantity'
                                            type="number"
                                            value={data.quantity}
                                            onChange={e => setData('quantity', e.target.value)}
                                            required
                                            className="w-full border border-gray-300 rounded-md p-2"
                                        />
                                    </div>
                                    {/* Dropdown for Category Selection */}
                                    <div>
                                        <label>Kategorija</label>
                                        <select
                                            value={data.category_id}
                                            onChange={e => setData('category_id', e.target.value)}
                                            required
                                            className="categories-select w-full border border-gray-300 rounded-md p-2"
                                        >
                                            <option value="">Izvēlieties kategoriju</option>
                                            {/* Render only the selected parent category and its subcategories */}
                                            {selectedParentCategory && (
                                                <option className='option' key={selectedParentCategory} value={selectedParentCategory}>
                                                    {parentCategories.find(cat => cat.id === selectedParentCategory)?.name}
                                                </option>
                                            )}
                                            {subCategories.map(sub => (
                                                <option key={sub.id} value={sub.id}>
                                                    {sub.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                    <label>Izvēlies bildi</label>
                                    <div className="flex flex-wrap">
                                        {Object.entries(imagesByCategory).map(([category, images]) => (
                                            <div key={category} className="w-full mb-4">
                                                <h4 className="font-semibold text-lg">{category}</h4>
                                                <div className="flex flex-wrap">
                                                    {images.map((image, index) => (
                                                        <div key={index} className="m-2 image">
                                                            <img
                                                                src={image}
                                                                alt={`Image from ${category}`}
                                                                className={`h-20 w-20 cursor-pointer ${selectedImage === image ? 'border-2 border-blue-500' : 'border-2 border-transparent'}`}
                                                                onClick={() => handleImageSelect(image)} // Select image on click
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                    <div className="mt-4">
                                        <button
                                            type="submit"
                                            className="p-2 bg-blue-500 text-white rounded-md w-full"
                                        >
                                            {selectedProductForEdit ? 'Atjaunot produktu' : 'Pievienot produktu'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                    </div>

                </div>
            </div>

            <PostNotification
                message={notifMessage}
                type={notifType}
                isOpen={isNotifOpen}
                onClose={closeNotif}
            />
        </AdminLayout>
    );
}
