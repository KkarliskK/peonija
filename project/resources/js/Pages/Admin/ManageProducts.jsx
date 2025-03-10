import DashboardBox from '@/Components/Modals/DashboardBox';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaEdit, FaCopy } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import PostNotification from '@/Components/Modals/Notification';
import Checkbox from '@/Components/Buttons/Checkbox';
import { HiOutlineDotsCircleHorizontal, HiMenuAlt2 } from "react-icons/hi";
import { IoTrashOutline, IoSearch, IoFilter } from 'react-icons/io5';
import { MdOutlineCategory } from 'react-icons/md';
import axios from 'axios';

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
    const [searchQuery, setSearchQuery] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(true);
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

        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };

        handleResize(); 
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleImageSelect = (imageUrl) => {
        setSelectedImage(imageUrl); 
        setData('image', imageUrl); 
    };

    const toggleMenu = (product, e) => {
        e.stopPropagation();
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
        //console.log("Form reset"); 
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

    const handleEnableDisable = (e, product) => {
        e.stopPropagation();
        const newStatus = product.is_available === 1 ? 0 : 1;
        //console.log(newStatus === 0 ? 'Disabling product...' : 'Enabling product...');
        
        router.patch(route('products.toggle-availability', product.id), {
            is_available: newStatus
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setNotifMessage('Produkta pieejamība nomainīta veiksmīgi!');
                setNotifType('success');
                setIsNotifOpen(true); 
            },
            onError: (errors) => {
                console.error(errors);
                    setNotifMessage('Neizdevās nomainīt produkta pieejamību!');
                    setNotifType('error');
                    setIsNotifOpen(true);
            }
        });
        
        setIsMenuOpen(false);
    };

    const handleDelete = (e, product) => {
        e.stopPropagation();
        
        if (confirm('Are you sure you want to delete this product?')) {
            //console.log('Deleting product...');
            
            router.delete(route('products.destroy', product.id), {
                preserveScroll: true,
                onSuccess: () => {
                    setNotifMessage('Produkts veiksmīgi izdzēsts!');
                    setNotifType('success');
                    setIsNotifOpen(true); 
                },
                onError: (errors) => {
                    console.error(errors);
                    setNotifMessage('Neizdevās izdzēst produktu!');
                    setNotifType('error');
                    setIsNotifOpen(true);
                }
            });
        }
        
        setIsMenuOpen(false);
    };

    const validatePrice = (value) => {
    const price = Number(value);
    
    if (isNaN(price) || price <= 0) {
        return { isValid: false, message: 'Cena nevar būt negatīva vai nulle' };
    }
    
    if (!/^\d+(\.\d{1,2})?$/.test(value)) {
        return { isValid: false, message: 'Cena var saturēt ne vairāk kā 2 decimālzīmes' };
    }
    
    if (price > 500) {
        return { isValid: false, message: 'Cena ir pārāk augsta' };
    }
    
    return { isValid: true, message: '' };
    };

    const validateQuantity = (value) => {
    const quantity = Number(value);
    
    if (isNaN(quantity) || quantity < 0 || !Number.isInteger(quantity)) {
        return { isValid: false, message: 'Daudzumam jābūt pozitīvam veselam skaitlim' };
    }
    
    if (quantity > 100) {
        return { isValid: false, message: 'Daudzums ir pārāk liels' };
    }
    
    return { isValid: true, message: '' };
    };

    const handlePriceChange = (e) => {
    const value = e.target.value;
    const validation = validatePrice(value);
    
    setData(prevData => ({
            ...prevData,
            price: value,
            priceError: !validation.isValid ? validation.message : ''
        }));
    };

    const handleQuantityChange = (e) => {
    const value = e.target.value;
    const validation = validateQuantity(value);
    
    setData(prevData => ({
            ...prevData,
            quantity: value,
            quantityError: !validation.isValid ? validation.message : ''
        }));
    };

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
        // Filter by search query first
        if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }
        
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

    //function for cloning products
    const handleCloneProduct = (e, product) => {
        e.stopPropagation();
        
        //console.log('Cloning product...', product);
        
        const clonedProduct = {
            name: `${product.name} (Kopija)`,
            description: product.description,
            price: product.price,
            is_available: product.is_available,
            quantity: product.quantity,
            category_id: product.category_id,
            image: product.image
        };
        
        setSelectedProductForEdit(null); 
        setIsFormVisible(true);
        setData(clonedProduct);
        setSelectedImage(product.image);
        
        const category = categories.find(cat => cat.id === product.category_id);
        if (category) {
            if (category.parent_id) {
                setSelectedParentCategory(category.parent_id);
                setSelectedSubCategory(category.id);
            } else {
                setSelectedParentCategory(category.id);
                setSelectedSubCategory(null);
            }
        }
        
        setIsMenuOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const priceValidation = validatePrice(data.price);
        const quantityValidation = validateQuantity(data.quantity);
        
        if (!priceValidation.isValid || !quantityValidation.isValid) {
            setData(prevData => ({
            ...prevData,
            priceError: priceValidation.message,
            quantityError: quantityValidation.message
            }));
            return;
        }
    
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
                }, 1000); 
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

                //console.log("Add product response:", response);

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
                }, 1000); 
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
            auth={auth}
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Pievienot vai rediģēt produktu</h2>}
        >
            <Head title="Manage Products" />

            <div className="relative flex flex-col min-h-screen md:flex-row">
                {/* Mobile sidebar toggle */}
                <button 
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="fixed z-50 p-2 text-white bg-blue-500 rounded-md shadow-lg md:hidden top-4 left-4"
                >
                    <HiMenuAlt2 size={24} />
                </button>

                {/* Sidebar */}
                <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                              md:translate-x-0 transition-transform duration-300 
                              fixed md:relative z-40 md:z-0
                              w-full md:w-1/4 lg:w-1/5 h-screen 
                              bg-white dark:bg-gray-800 shadow-lg md:shadow-none
                              p-4 overflow-y-auto`}>
                    
                    <div className="mt-8 mb-6 md:mt-0">
                        <div className="flex items-center mb-4">
                            <IoFilter size={20} className="mr-2 text-blue-500" />
                            <h3 className="text-lg font-semibold dark:text-gray-200">Filtrēt</h3>
                        </div>
                        <ul className="mt-2 space-y-3">
                            <li>
                                <button
                                    onClick={() => handleFilterChange('all')}
                                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${filter === 'all' ? 'bg-blue-100 text-blue-600 font-medium dark:bg-gray-900 dark:text-gray-200' : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200'}`}
                                >
                                    Visi produkti
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleFilterChange('disabled')}
                                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${filter === 'disabled' ? 'bg-blue-100 text-blue-600 font-medium dark:bg-gray-900 dark:text-gray-200' : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200'}`}
                                >
                                    Atspējoti produkti
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleFilterChange('available')}
                                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${filter === 'available' ? 'bg-blue-100 text-blue-600 font-medium dark:bg-gray-900 dark:text-gray-200' : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200'}`}
                                >
                                    Iespējoti produkti
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleFilterChange('without-category')}
                                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${filter === 'without-category' ? 'bg-blue-100 text-blue-600 font-medium dark:bg-gray-900 dark:text-gray-200' : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200'}`}
                                >
                                    Produkti bez kategorijas
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div className="mt-6">
                        <div className="flex items-center mb-4">
                            <MdOutlineCategory size={20} className="mr-2 text-blue-500" />
                            <h3 className="text-lg font-semibold dark:text-gray-200">Kategorijas</h3>
                        </div>
                        <ul className="mt-2 space-y-3">
                            {parentCategories.map(category => (
                                <li key={category.id}>
                                    <button
                                        onClick={() => handleParentCategoryClick(category.id)}
                                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedParentCategory === category.id ? 'bg-blue-100 text-blue-600 font-medium dark:bg-gray-900 dark:text-gray-200' : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200'}`}
                                    >
                                        <div className="flex justify-between">
                                            <span>{category.name}</span>
                                            <span className="bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full text-xs">
                                                {category.total_products_count || 0}
                                            </span>
                                        </div>
                                    </button>

                                    {selectedParentCategory === category.id && Array.isArray(category.children) && category.children.length > 0 && (
                                        <ul className="mt-2 ml-4 space-y-2">
                                            {category.children.map(child => (
                                                <li key={child.id}>
                                                    <button
                                                        onClick={() => handleSubCategoryClick(child.id)}
                                                        className={`w-full text-left px-3 py-1.5 rounded-lg transition-colors ${selectedSubCategory === child.id ? 'bg-blue-50 text-blue-600 font-medium dark:bg-gray-900 dark:text-gray-200' : 'hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200'}`}
                                                    >
                                                        <div className="flex justify-between">
                                                            <span>{child.name}</span>
                                                            <span className="bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full text-xs">
                                                                {child.products_count || 0}
                                                            </span>
                                                        </div>
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
                <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'md:ml-0' : 'ml-0'}`}>
                    <div className='sticky top-0 z-10 p-4 bg-white shadow-sm dark:bg-gray-800'>
                        <div className='flex flex-col items-start justify-between gap-4 md:flex-row md:items-center'>
                            <div className="text-lg font-medium dark:text-gray-200">
                                Kategorija: <span className="text-blue-600">{getSelectedCategoryName()}</span>
                            </div>
                            
                            <div className="relative w-full md:w-64">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <IoSearch className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Meklēt produktus..."
                                    className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-200"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            
                            {(selectedParentCategory || selectedSubCategory) && (
                                <button
                                    className="flex items-center justify-center w-full px-4 py-2 text-white transition bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 md:w-auto"
                                    onClick={handleAddProduct}
                                >
                                    <IoIosAddCircleOutline className="mr-2" size={20} /> 
                                    Pievienot jaunu produktu
                                </button>
                            )}
                        </div>
                    </div>
                    
                    <div className='flex flex-col gap-6 p-4 lg:flex-row'>
                        {/* Products List */}
                        <div className="w-full lg:w-1/2 h-[calc(100vh-180px)] overflow-y-auto">
                            {filteredProducts.length > 0 ? (
                                <div className="flex flex-col space-y-4">
                                    {filteredProducts.map(product => (
                                        <div
                                            key={product.id}
                                            className="flex flex-col items-start justify-between p-4 transition-shadow bg-white border border-gray-200 shadow-sm cursor-pointer md:flex-row md:items-center rounded-xl dark:bg-gray-700 dark:border-gray-600 hover:shadow-md"
                                            onClick={() => handleEditProductClick(product)}
                                        >
                                            <div className="flex items-center w-full mb-3 md:w-auto md:mb-0">
                                                {/* Image Container */}
                                                <div className='flex-shrink-0 w-16 h-16 md:h-20 md:w-20'>
                                                    <img 
                                                        src={product.image} 
                                                        alt={product.name} 
                                                        className='object-cover w-full h-full rounded-lg shadow-sm' 
                                                    />
                                                </div>
                                                
                                                {/* Product Name and Description */}
                                                <div className='ml-4'>
                                                    <h4 className="text-lg font-semibold dark:text-gray-200">{product.name}</h4>
                                                    <p className="text-sm text-gray-500 dark:text-gray-300 line-clamp-1">
                                                        {product.description}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center justify-between w-full mt-3 md:w-auto md:mt-0">
                                                {/* Product Availability */}
                                                <div className='flex items-center justify-center md:mr-6'>
                                                    <span 
                                                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                                            product.is_available === 0 
                                                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
                                                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                        }`}
                                                    >
                                                        {product.is_available === 0 ? 'Izslēgts' : 'Aktīvs'}
                                                    </span>
                                                </div>
                                        
                                                {/* Product Price */}
                                                <div className='flex items-center justify-center md:mr-6'>
                                                    <p className="font-medium text-gray-800 dark:text-gray-200">
                                                        €{product.price}
                                                    </p>
                                                </div>
                                                
                                                {/* Menu */}
                                                <div className='relative flex items-center justify-center ml-2'>
                                                    <button 
                                                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600"
                                                        onClick={(e) => toggleMenu(product, e)}
                                                    >
                                                        <HiOutlineDotsCircleHorizontal size={24} className="dark:text-gray-200" />
                                                    </button>
                                                    
                                                    {isMenuOpen && selectedProduct === product && (
                                                        <div ref={menuRef} className="absolute right-0 z-10 w-56 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 animate-fade-in">
                                                            <div className="py-1">
                                                                <button
                                                                    onClick={(e) => handleEnableDisable(e, product)}
                                                                    className={`flex items-center w-full px-4 py-2 text-sm 
                                                                        hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                                                    product.is_available === 0 
                                                                    ? 'text-green-600 dark:text-green-400' 
                                                                    : 'text-red-600 dark:text-red-400'
                                                                    }`}
                                                                >
                                                                    {product.is_available === 0 ? 'Ieslēgt' : 'Izslēgt'} 
                                                                </button>
                                                                <button
                                                                    onClick={(e) => handleCloneProduct(e, product)}
                                                                    className="flex items-center w-full px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                                >
                                                                    <FaEdit className="mr-2" /> Klonēt
                                                                </button>
                                                                <button
                                                                    onClick={(e) => handleDelete(e, product)}
                                                                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                                >
                                                                    <IoTrashOutline className="mr-2" /> Delete
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>                                   
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                                    <MdOutlineCategory size={48} className="mb-4 text-gray-400" />
                                    <p className="text-lg text-gray-500">Nav atrasta neviena produkta pēc šī filtrējuma.</p>
                                    <p className="mt-2 text-sm text-gray-400">Mēģiniet mainīt meklēšanas kritērijus.</p>
                                </div>
                            )}
                        </div>

                        {/* Adding or editing product form */}
                        {isFormVisible && (
                            <div className="w-full lg:w-1/2 h-[calc(100vh-180px)] overflow-y-auto bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-semibold dark:text-gray-200">
                                        {selectedProductForEdit ? 'Rediģēt produktu' : 'Pievienot jaunu produktu'}
                                    </h3>
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            resetForm();
                                            setSelectedProductForEdit(null);
                                            setIsFormVisible(false);
                                        }}
                                        className="p-2 text-gray-500 transition-colors rounded-full hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Nosaukums</label>
                                        <input
                                            id='name'
                                            type="text"
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            required
                                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 dark:bg-gray-700"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Apraksts</label>
                                        <textarea
                                            id='description'
                                            value={data.description}
                                            onChange={e => setData('description', e.target.value)}
                                            required
                                            rows={3}
                                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 dark:bg-gray-700"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div>
                                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Cena</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <span className="text-gray-500 dark:text-gray-400">€</span>
                                                </div>
                                                <input
                                                    id='price'
                                                    type="text" 
                                                    value={data.price}
                                                    onChange={handlePriceChange}
                                                    required
                                                    placeholder="0.00"
                                                    className={`pl-8 w-full border ${data.priceError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'} rounded-lg p-2.5 dark:bg-gray-700`}
                                                />
                                            </div>
                                            {data.priceError && (
                                                <p className="mt-1 text-sm text-red-500">{data.priceError}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Skaits</label>
                                            <input
                                                id='quantity'
                                                type="text" 
                                                value={data.quantity}
                                                onChange={handleQuantityChange}
                                                required
                                                placeholder="0"
                                                className={`w-full border ${data.quantityError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'} rounded-lg p-2.5 dark:bg-gray-700`}
                                            />
                                            {data.quantityError && (
                                                <p className="mt-1 text-sm text-red-500">{data.quantityError}</p>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="inline-flex items-center text-sm">
                                            <Checkbox
                                                checked={data.is_available}
                                                onChange={e => setData('is_available', e.target.checked)}
                                            />
                                            <span className='ml-2 font-medium text-gray-700 dark:text-gray-300'>Pieejams</span>
                                        </label>
                                    </div>
                                    {/* Dropdown for Category Selection */}
                                    <div>
                                        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Kategorija</label>
                                        <select
                                            value={data.category_id}
                                            onChange={e => setData('category_id', e.target.value)}
                                            required
                                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 
                                                       bg-white dark:bg-gray-700 appearance-none"
                                        >
                                            <option value="">Izvēlieties kategoriju</option>
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
                                        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Izvēlies bildi</label>
                                        <div className="p-2 overflow-y-auto border border-gray-200 rounded-lg max-h-64 dark:border-gray-700">
                                            {Object.entries(imagesByCategory).map(([category, images]) => (
                                                <div key={category} className="w-full mb-4">
                                                    <h4 className="px-2 py-1 mb-2 text-sm font-semibold rounded bg-gray-50 dark:bg-gray-800 dark:text-gray-200">{category}</h4>
                                                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                                                        {images.map((image, index) => (
                                                            <div key={index} className="relative aspect-square">
                                                                <img
                                                                    src={image}
                                                                    alt={`Image from ${category}`}
                                                                    className={`h-full w-full object-cover rounded cursor-pointer transition 
                                                                            ${selectedImage === image ? 'ring-2 ring-blue-500 scale-95' : 'ring-1 ring-gray-200 dark:ring-gray-700 hover:ring-blue-200'}`}
                                                                    onClick={() => handleImageSelect(image)} 
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
                                            className="w-full p-2 text-white bg-blue-500 rounded-md"
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
