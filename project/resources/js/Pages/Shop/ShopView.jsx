import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState, useRef, useEffect } from 'react';

export default function ShopView({ auth, categories = [], products = [] }) {

    const [selectedParentCategory, setSelectedParentCategory] = useState(null);  
    const [selectedSubCategory, setSelectedSubCategory] = useState(null); 
    const [filter, setFilter] = useState('all'); 


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

    return (
        <>
            <Head title="Veikals" />
            <AuthenticatedLayout auth={auth}>
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
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg">Kategorijas</h3>
                        <ul className="mt-2 space-y-2">
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

                </div>
                <section className="">
                    {categories.map(category => (
                        <div key={category.id} className="mb-12">
                            <h2 className="text-3xl font-semibold mb-6">{category.name} ({category.total_products_count} products)</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {products
                                    .filter(product => product.category_id === category.id)
                                    .map(product => (
                                        <div key={product.id} className="border rounded-lg p-4">
                                            <img src={`${product.image}`} alt={product.name} className="mb-4" />
                                            <h3 className="text-xl font-medium">{product.name}</h3>
                                            <p className="text-gray-500">{product.description}</p>
                                            <p className="text-lg font-bold mt-4">€{product.price}</p>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </section>
            </AuthenticatedLayout>
        </>
    );
}
