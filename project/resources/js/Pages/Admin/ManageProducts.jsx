import DashboardBox from '@/Components/DashboardBox';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaEdit } from 'react-icons/fa';
import { useState } from 'react';
import PostNotification from '@/Components/Notification';
import Checkbox from '@/Components/Checkbox';

export default function ManageProducts({ auth, categories = [], products = [] }) {
    const [notifMessage, setNotifMessage] = useState('');
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [notifType, setNotifType] = useState('success');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [filter, setFilter] = useState('all'); 
    const [isFormVisible, setIsFormVisible] = useState(false);  

    const { data, setData, post, reset } = useForm({
        name: '',
        description: '', 
        price: '',
        is_available: false ,
        category_id: selectedCategory || ''
    });

    const parentCategories = categories.filter(category => !category.parent_id);
    
    const subCategories = selectedCategory
        ? categories.filter(category => category.parent_id === selectedCategory)
        : [];

    const closeNotif = () => setIsNotifOpen(false);

    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
        setFilter('all'); 
    };

    const handleFilterChange = (filterType) => {
        setFilter(filterType);
        setSelectedCategory(null); 
    };

    const filteredProducts = products.filter(product => {
        if (filter === 'disabled') return product.is_available === 0;  
        if (filter === 'available') return product.is_available === 1; 
        if (filter === 'without-category') return !product.category_id; 
        if (selectedCategory) return product.category_id === selectedCategory;
        return true; 
    });    
    

    const handleAddProduct = () => {
        // Toggle the form visibility
        setIsFormVisible(!isFormVisible);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        post('/admin/products', { 
            data: {
                name: data.name,
                description: data.description,
                price: data.price,
                is_available: data.is_available, 
                category_id: data.category_id, 
            },
            onSuccess: () => {
                setNotifMessage('Product added successfully!');
                setNotifType('success');
                setIsNotifOpen(true);
                setIsFormVisible(false);
                reset(); 
            },
            onError: () => {
                setNotifMessage('Failed to add product.');
                setNotifType('error');
                setIsNotifOpen(true);
            }
        });
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
                                    onClick={() => handleCategoryClick(category.id)}
                                    className={`text-sm ${selectedCategory === category.id ? 'font-bold text-blue-500' : ''}`}
                                >
                                    {category.name}
                                </button>
                                
                                {/* Display subcategories if the parent category is selected */}
                                {selectedCategory === category.id && subCategories.length > 0 && (
                                    <ul className="ml-4 mt-2 space-y-1">
                                        {subCategories.map(subCategory => (
                                            <li key={subCategory.id}>
                                                <button
                                                    onClick={() => handleCategoryClick(subCategory.id)}
                                                    className={`text-sm ${selectedCategory === subCategory.id ? 'font-bold text-blue-500' : ''}`}
                                                >
                                                    {subCategory.name}
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
                        <div>Izvēlētā kategorija</div> {/**Add the categorys name here**/}
                        <div>Meklēt</div>{/**Add a searchbar here**/}
                        <button
                            className="mt-4 flex items-center justify-center p-2 bg-blue-500 text-white rounded-md w-1/5"
                            onClick={handleAddProduct} 
                        >
                            <IoIosAddCircleOutline className="mr-2" /> Pievienot jaunu produktu
                        </button>
                    </div>
                    <div className='flex flex-row w-full'>
                        {/* Products List */}
                        <div className="w-full p-4" style={{ height: '500px', overflowY: 'auto' }}>
                            {filteredProducts.length > 0 ? (
                                <div className="flex flex-col">
                                {filteredProducts.map(product => (
                                    <div
                                        key={product.id}
                                        className="flex justify-between items-center rounded-md h-24 bg-white p-4 border-2 border-gray-200 dark:bg-gray-700 w-full"
                                    >
                                        <h4 className="font-semibold text-lg">{product.name}</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            {product.is_available === 0 ? 'Disabled' : 'Active'} 
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            €{product.price}
                                        </p>
                                        <Checkbox className='h-6 w-6' />
                                    </div>
                                ))}
                                </div>
                            ) : (
                                <p>Nav atrasta neviena produkta pēc šī filtrējuma.</p>
                            )}
                        </div>
                        
                        {/* Conditionally render the form if isFormVisible is true */}
                        {isFormVisible && (
                            <div className="w-full p-4" style={{ height: '500px', overflowY: 'auto' }}>
                                <h3 className="text-lg font-semibold mb-4">Pievienot jaunu produkut</h3>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Produkta nosaukums</label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Produkta apraksts</label>
                                        <input
                                            type="text"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cena</label>
                                        <input
                                            type="number"
                                            value={data.price}
                                            onChange={(e) => setData('price', e.target.value)}
                                            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Kategorija</label>
                                        <select
                                            value={data.category_id}
                                            onChange={(e) => setData('category_id', e.target.value)}
                                            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        >
                                            <option value="">Izvēlies kategoriju</option>
                                            {categories.map(category => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Produkta pieejamība</label>
                                        <input
                                            type="checkbox"
                                            checked={data.isavailable} // Use checked instead of value
                                            onChange={(e) => setData('is_available', e.target.checked)} // Use e.target.checked to get the checkbox state
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="mt-4 flex items-center justify-center p-2 bg-green-500 text-white rounded-md"
                                    >
                                        Saglabāt produktu
                                    </button>
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
