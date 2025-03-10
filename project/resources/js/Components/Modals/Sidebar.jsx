import { useState, useEffect } from 'react';
import { FaAngleLeft, FaSearch, FaFilter, FaFolderOpen, FaBars } from "react-icons/fa";

const Sidebar = ({ isSidebarMinimized, setIsSidebarMinimized, searchQuery, setSearchQuery, filter, setFilter, categories, selectedParentCategory, setSelectedParentCategory, selectedSubCategory, setSelectedSubCategory }) => {
    const parentCategories = categories.filter(category => !category.parent_id);
    const [isMobile, setIsMobile] = useState(false);
    
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

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>  
            {!isSidebarMinimized && isMobile && (
                <div 
                    className="fixed inset-0 z-20 bg-black bg-opacity-50"
                    onClick={() => setIsSidebarMinimized(true)}
                ></div>
            )}
            
            <div className={`
                fixed sm:sticky top-0 left-0 h-screen z-30
                ${isSidebarMinimized ? 
                    '-translate-x-full sm:translate-x-0 sm:w-16 w-0' : 
                    'translate-x-0 sm:w-64 w-4/5 max-w-xs'
                } 
                transition-all duration-300 bg-white dark:bg-gray-800 shadow-lg
                border-r border-gray-200 dark:border-gray-700 overflow-y-auto
            `}>
                <div className={`flex items-center mb-4 p-4 ${isSidebarMinimized ? 'justify-center' : 'justify-end'}`}>
                    <button 
                        onClick={() => setIsSidebarMinimized(!isSidebarMinimized)} 
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <FaAngleLeft 
                            size={24} 
                            className={`transform transition-transform duration-300 text-gray-600 dark:text-gray-300 ${isSidebarMinimized ? 'rotate-180' : ''}`} 
                        />
                    </button>
                </div>
                
                <div className={`px-4 mb-6 ${isSidebarMinimized ? 'hidden' : ''}`}>
                    {/* Search Bar */}
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <FaSearch className="text-gray-400 dark:text-gray-200" />
                        </div>
                        <input
                            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" 
                            type="text"
                            placeholder="Meklē Produktu šeit..."
                            value={searchQuery} 
                            onChange={e => setSearchQuery(e.target.value)} 
                        />   
                    </div>
                </div>

                {/* Filter Section */}
                <div className={`mb-6 ${isSidebarMinimized ? 'hidden' : 'px-4'}`}>
                    <div className={`flex items-center mb-4 ${isSidebarMinimized ? 'justify-center' : 'ml-2'}`}>
                        <FaFilter size={20} className={`${isSidebarMinimized ? '' : 'mr-2'} text-blue-500`} />
                        {!isSidebarMinimized && <h3 className="text-lg font-semibold dark:text-gray-200">Filtrēt</h3>}
                    </div>
                    <ul className={`space-y-3 ${isSidebarMinimized ? 'px-2' : ''}`}>
                        <li>
                            <button 
                                onClick={() => handleFilterChange('all')}
                                className={`w-full text-left px-3 py-2 rounded-lg transition-colors
                                    ${filter === 'all' 
                                        ? 'bg-blue-100 text-blue-600 font-medium dark:bg-blue-900 dark:text-blue-200' 
                                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200'
                                    }
                                    ${isSidebarMinimized ? 'flex justify-center' : ''}`
                                }
                                title={isSidebarMinimized ? "Visi produkti" : ""}
                            >
                                {isSidebarMinimized ? (
                                    <span className="flex items-center justify-center w-6 h-6 dark:text-gray-200">
                                        <FaFilter size={16} />
                                    </span>
                                ) : (
                                    "Visi produkti"
                                )}
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => setFilter('popular')}
                                className={`w-full text-left px-3 py-2 rounded-lg transition-colors
                                    ${filter === 'popular' 
                                        ? 'bg-blue-100 text-blue-600 font-medium dark:bg-blue-900 dark:text-blue-200' 
                                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200'
                                    }
                                    ${isSidebarMinimized ? 'flex justify-center' : ''}`
                                }
                                title={isSidebarMinimized ? "Populārākās preces" : ""}
                            >
                                {isSidebarMinimized ? (
                                    <span className="flex items-center justify-center w-6 h-6 dark:text-gray-200">
                                        <FaFilter size={16} />
                                    </span>
                                ) : (
                                    "Populārākās preces"
                                )}
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => setFilter('price-asc')}
                                className={`w-full text-left px-3 py-2 rounded-lg transition-colors
                                    ${filter === 'price-asc' 
                                        ? 'bg-blue-100 text-blue-600 font-medium dark:bg-blue-900 dark:text-blue-200' 
                                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200'
                                    }
                                    ${isSidebarMinimized ? 'flex justify-center' : ''}`
                                }
                                title={isSidebarMinimized ? "Cenas, sākot no zemākās" : ""}
                            >
                                {isSidebarMinimized ? (
                                    <span className="flex items-center justify-center w-6 h-6 dark:text-gray-200">
                                        <FaFilter size={16} />
                                    </span>
                                ) : (
                                    "Cenas, sākot no zemākās"
                                )}
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => setFilter('price-desc')}
                                className={`w-full text-left px-3 py-2 rounded-lg transition-colors
                                    ${filter === 'price-desc' 
                                        ? 'bg-blue-100 text-blue-600 font-medium dark:bg-blue-900 dark:text-blue-200' 
                                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200'
                                    }
                                    ${isSidebarMinimized ? 'flex justify-center' : ''}`
                                }
                                title={isSidebarMinimized ? "Cenas, sākot no augstākās" : ""}
                            >
                                {isSidebarMinimized ? (
                                    <span className="flex items-center justify-center w-6 h-6 dark:text-gray-200">
                                        <FaFilter size={16} />
                                    </span>
                                ) : (
                                    "Cenas, sākot no augstākās"
                                )}
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Categories Section */}
                <div className={`mb-4 ${isSidebarMinimized ? 'hidden' : 'px-4'}`}>
                    <div className={`flex items-center mb-4 ${isSidebarMinimized ? 'justify-center' : 'ml-2'}`}>
                        <FaFolderOpen size={20} className={`${isSidebarMinimized ? '' : 'mr-2'} text-blue-500`} />
                        {!isSidebarMinimized && <h3 className="text-lg font-semibold dark:text-gray-200">Kategorijas</h3>}
                    </div>
                    <ul className={`space-y-3 ${isSidebarMinimized ? 'px-2' : ''}`}>
                        {parentCategories.map(category => (
                            <li key={category.id}>
                                <button
                                    onClick={() => handleParentCategoryClick(category.id)}
                                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors
                                        ${selectedParentCategory === category.id 
                                            ? 'bg-blue-100 text-blue-600 font-medium dark:bg-blue-900 dark:text-blue-200' 
                                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200'
                                        }
                                        ${isSidebarMinimized ? 'flex justify-center dark:text-gray-200' : ''}`
                                    }
                                    title={isSidebarMinimized ? category.name : ""}
                                >
                                    {isSidebarMinimized ? (
                                        <span className="flex items-center justify-center w-6 h-6">
                                            <FaFolderOpen size={16} />
                                        </span>
                                    ) : (
                                        <div className="flex justify-between w-full">
                                            <span>{category.name}</span>
                                            <span className="bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full text-xs">
                                                {category.total_products_count || 0}
                                            </span>
                                        </div>
                                    )}
                                </button>

                                {!isSidebarMinimized && selectedParentCategory === category.id && 
                                Array.isArray(category.children) && category.children.length > 0 && (
                                    <ul className="mt-2 ml-4 space-y-2">
                                        {category.children.map(child => (
                                            <li key={child.id}>
                                                <button
                                                    onClick={() => handleSubCategoryClick(child.id)}
                                                    className={`w-full text-left px-3 py-1.5 rounded-lg transition-colors
                                                        ${selectedSubCategory === child.id 
                                                            ? 'bg-blue-50 text-blue-600 font-medium dark:bg-blue-900 dark:text-blue-200' 
                                                            : 'hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200'
                                                        }`
                                                    }
                                                >
                                                    <div className="flex justify-between w-full">
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
        </>
    );
};

export default Sidebar;