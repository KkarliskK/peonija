import { FaSearch, FaFilter, FaFolderOpen, FaAngleLeft } from "react-icons/fa";
import { useState } from "react";

export default function Sidebar({ 
    categories, 
    filter, 
    setFilter, 
    selectedParentCategory, 
    setSelectedParentCategory, 
    selectedSubCategory, 
    setSelectedSubCategory, 
    searchQuery, 
    setSearchQuery, 
    isSidebarMinimized, 
    setIsSidebarMinimized 
}) {
    const parentCategories = categories.filter(category => !category.parent_id);

    return (
        <div className={`transition-width duration-300 h-dvh ${isSidebarMinimized ? 'w-16' : 'w-1/5'} h-screen border-2 p-2 border-gray-100 bg-gray-50 dark:bg-gray-800`}>
            <div className={`flex items-center mb-4 ${isSidebarMinimized ? 'justify-center' : 'justify-end'}`}>
                <button onClick={() => setIsSidebarMinimized(!isSidebarMinimized)} className="p-2">
                    <FaAngleLeft size={24} className={`transform transition-transform duration-300 ${isSidebarMinimized ? 'rotate-180' : ''}`} />
                </button>
            </div>

            <div className={`mb-4 ${isSidebarMinimized ? 'hidden' : ''}`}>
                <div className={`flex justify-center items-center w-full my-4`}>
                    {isSidebarMinimized ? (
                        <FaSearch className="mr-2" />
                    ) : (
                        <div className="relative w-full">
                            <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2" />
                            <input
                                className='rounded-full border-none outline-none bg-gray-200 p-2 pl-8 w-full' 
                                type='text'
                                placeholder='Meklē Produktu šeit...'
                                value={searchQuery} 
                                onChange={e => setSearchQuery(e.target.value)} 
                            />   
                        </div>
                    )}
                </div>
            </div>

            <div className={`mb-4 ${isSidebarMinimized ? 'hidden' : ''}`}>
                <div className="flex items-center">
                    <FaFilter className="mr-2" />
                    <h3 className={`font-semibold text-lg`}>Filtrēt</h3>
                </div>
                <ul className={`mt-2 space-y-2`}>
                    <li>
                        <button
                            onClick={() => {
                                setFilter('all')
                                setSelectedParentCategory(null); 
                                setSelectedSubCategory(null); 
                            }}
                            className={`text-sm w-full rounded-lg bg-gray-50 p-2 text-start ${filter === 'all' ? 'font-bold bg-slate-200' : ''}`}
                        >
                            Visi produkti
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setFilter('popular')}
                            className={`text-sm w-full rounded-lg bg-gray-50 p-2 text-start ${filter === 'popular' ? 'font-bold bg-slate-200' : ''}`}
                        >
                            Populārākās preces
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setFilter('price-asc')}
                            className={`text-sm w-full rounded-lg bg-gray-50 p-2 text-start ${filter === 'price-asc' ? 'font-bold bg-slate-200' : ''}`}
                        >
                            Cenas, sākot no zemākās
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setFilter('price-desc')}
                            className={`text-sm w-full rounded-lg bg-gray-50 p-2 text-start ${filter === 'price-desc' ? 'font-bold bg-slate-200' : ''}`}
                        >
                            Cenas, sākot no augstākās
                        </button>
                    </li>
                </ul>
            </div>

            <div className={`mb-4 ${isSidebarMinimized ? 'hidden' : ''}`}>
                <div className="flex items-center">
                    <FaFolderOpen className="mr-2" />
                    <h3 className={`font-semibold text-lg`}>Kategorijas</h3>
                </div>
                <ul className={`mt-2 space-y-2`}>
                    {parentCategories.map(category => (
                        <li key={category.id}>
                            <button
                                onClick={() => {
                                    setSelectedParentCategory(category.id);
                                    setSelectedSubCategory(null); 
                                }}
                                className={`text-sm w-full rounded-lg bg-gray-50 p-2 text-start ${selectedParentCategory === category.id ? 'font-bold bg-slate-200' : ''}`}
                            >
                                {category.name} ({category.total_products_count}) 
                            </button>

                            {selectedParentCategory === category.id && Array.isArray(category.children) && category.children.length > 0 && (
                                <ul className="ml-4 mt-2 space-y-1">
                                    {category.children.map(child => (
                                        <li key={child.id}>
                                            <button
                                                onClick={() => setSelectedSubCategory(child.id)}
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
    );
}
