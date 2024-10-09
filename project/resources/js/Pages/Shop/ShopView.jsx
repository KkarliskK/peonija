import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';
import { FaAngleLeft } from "react-icons/fa6";
import { FaSearch, FaFilter, FaFolderOpen } from "react-icons/fa";
import OfferCard from '@/Components/Modals/OfferCard'; 

export default function ShopView({ auth, categories = [], products = [] }) {
    const [selectedParentCategory, setSelectedParentCategory] = useState(null);  
    const [selectedSubCategory, setSelectedSubCategory] = useState(null); 
    const [filter, setFilter] = useState('all'); 
    const [searchQuery, setSearchQuery] = useState(''); 
    const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

    const parentCategories = categories.filter(category => !category.parent_id);
    
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
        if (filterType === 'all') {
            setSelectedParentCategory(null);
            setSelectedSubCategory(null);
        }
        setFilter(filterType);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
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

        if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }

        return true;
    });

    const sortedProducts = (() => {
        let sorted = [...filteredProducts]; 
        if (filter === 'price-asc') {
            return sorted.sort((a, b) => a.price - b.price);
        } else if (filter === 'price-desc') {
            return sorted.sort((a, b) => b.price - a.price);
        } else {
            return sorted; 
        }
    })();

    const selectedCategoryName = () => {
        let title = 'Visi produkti'; 
    
        if (selectedSubCategory) {
            const subCategory = categories.find(cat => cat.id === selectedSubCategory);
            if (subCategory) {
                title = subCategory.name; 
            }
        } 
        else if (selectedParentCategory) {
            const parentCategory = categories.find(cat => cat.id === selectedParentCategory);
            if (parentCategory) {
                title = parentCategory.name; 
            }
        }
    
        if (filter === 'price-asc') {
            title += ' - Cenas, sākot no zemākās';
        } else if (filter === 'price-desc') {
            title += ' - Cenas, sākot no augstākās';
        } else if (filter === 'popular') {
            title += ' - Populāri produkti';
        }
    
        if (searchQuery) {
            title += ` | Rezultāti priekš: "${searchQuery}"`;
        }
    
        return title; 
    };
    
    return (
        <>
            <Head title="Veikals" />
            <AuthenticatedLayout auth={auth}>
                <div className="flex w-full h-screen">
                    {/* Sidebar */}
                    <div className={`transition-width duration-300 ${isSidebarMinimized ? 'w-16' : 'w-1/5'} h-screen border-2 border-gray-200 p-4 bg-gray-100 dark:bg-gray-800`}>
                        <div className="flex items-center justify-between mb-4">
                            <button onClick={() => setIsSidebarMinimized(!isSidebarMinimized)} className="p-2">
                                <FaAngleLeft className={`transform transition-transform duration-300 ${isSidebarMinimized ? 'rotate-180' : ''}`} />
                            </button>
                        </div>

                        <div className={`mb-4 ${isSidebarMinimized ? 'hidden' : ''}`}>
                            {/* Search Bar */}
                            <div className={`flex justify-center items-center w-full my-4`}>
                                {isSidebarMinimized ? (
                                    <FaSearch className="mr-2" />
                                ) : (
                                    <div className="relative w-full">
                                        <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2" />
                                        <input
                                            className='rounded-lg border outline-none bg-gray-200 p-2 pl-8 w-full' // Add padding-left to prevent overlap
                                            type='text'
                                            placeholder='Meklē Produktu šeit...'
                                            value={searchQuery} 
                                            onChange={handleSearchChange} 
                                        />   
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Filter Section */}
                        <div className={`mb-4 ${isSidebarMinimized ? 'hidden' : ''}`}>
                            <div className="flex items-center">
                                <FaFilter className="mr-2" />
                                <h3 className={`font-semibold text-lg`}>Filtrēt</h3>
                            </div>
                            <ul className={`mt-2 space-y-2`}>
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
                                        onClick={() => handleFilterChange('popular')}
                                        className={`text-sm ${filter === 'popular' ? 'font-bold text-blue-500' : ''}`}
                                    >
                                        Populārākās preces
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => handleFilterChange('price-asc')}
                                        className={`text-sm ${filter === 'price-asc' ? 'font-bold text-blue-500' : ''}`}
                                    >
                                        Cenas, sākot no zemākās
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => handleFilterChange('price-desc')}
                                        className={`text-sm ${filter === 'price-desc' ? 'font-bold text-blue-500' : ''}`}
                                    >
                                        Cenas, sākot no augstākās
                                    </button>
                                </li>
                            </ul>
                        </div>

                        {/* Categories Section */}
                        <div className={`mb-4 ${isSidebarMinimized ? 'hidden' : ''}`}>
                            <div className="flex items-center">
                                <FaFolderOpen className="mr-2" />
                                <h3 className={`font-semibold text-lg`}>Kategorijas</h3>
                            </div>
                            <ul className={`mt-2 space-y-2`}>
                                {parentCategories.map(category => (
                                    <li key={category.id}>
                                        <button
                                            onClick={() => handleParentCategoryClick(category.id)}
                                            className={`text-sm ${selectedParentCategory === category.id ? 'font-bold text-blue-500' : ''}`}
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

                        {/* Minimized Icons */}
                        {isSidebarMinimized && (
                            <div className="flex flex-col items-center">
                                <button onClick={() => setIsSidebarMinimized(false)} className="p-2" aria-label="Open Search">
                                    <FaSearch />
                                </button>
                                <button onClick={() => setIsSidebarMinimized(false)} className="p-2" aria-label="Filter Products">
                                    <FaFilter />
                                </button>
                                <button className="p-2" onClick={() => setIsSidebarMinimized(false)} aria-label="Filter Categories">
                                    <FaFolderOpen />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Products section */}
                    <section className="w-full p-8 bg-white dark:bg-gray-700">
                        <h2 className="text-xl font-semibold mb-4">{selectedCategoryName()}</h2> 
                        {sortedProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {sortedProducts.map(product => (
                                    <OfferCard 
                                        className='w-full'
                                        key={product.id}
                                        image={product.image} 
                                        name={product.name}
                                        price={`${product.price} EUR`} 
                                    />
                                ))}
                            </div>
                        ) : (
                            <p>No products found.</p>
                        )}
                    </section>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
