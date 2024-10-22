import { Head, Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';
import { FaAngleLeft } from "react-icons/fa6";
import { FaSearch, FaFilter, FaFolderOpen } from "react-icons/fa";
import OfferCard from '@/Components/Modals/OfferCard'; 
import ProductModal from '@/Components/Modals/ProductModal';  
import PostNotification from '@/Components/Modals/Notification';

export default function ShopView({ auth, categories = [], products = [], pagination }) {
    const [selectedParentCategory, setSelectedParentCategory] = useState(null);  
    const [selectedSubCategory, setSelectedSubCategory] = useState(null); 
    const [filter, setFilter] = useState('all'); 
    const [searchQuery, setSearchQuery] = useState(''); 
    const [isSidebarMinimized, setIsSidebarMinimized] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cart, setCart] = useState([]);
    const [notifMessage, setNotifMessage] = useState('');  
    const [isNotifOpen, setIsNotifOpen] = useState(false); 
    const [notifType, setNotifType] = useState('success');  
    const [currentPage, setCurrentPage] = useState(pagination.currentPage); 
    const itemsPerPage = 8; 

    const closeNotif = () => setIsNotifOpen(false);

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setIsModalOpen(false);
    };

    // Function to add product to cart
    const addToCart = async (product, quantity) => {
        try {
            await Inertia.post('/cart/add', {
                product_id: product.id,
                quantity: quantity,
            });
    
            setCart((prevCart) => {
                const existingItem = prevCart.find((item) => item.product.id === product.id);
                if (existingItem) {
                    return prevCart.map((item) =>
                        item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                    );
                } else {
                    return [...prevCart, { product, quantity }];
                }
            });
    
            setNotifMessage(<>Pasūtījums veiksmīgi pievienots <Link className='underline' href="/cart">grozam</Link>!</>);            
            setNotifType('success');
            setIsNotifOpen(true);
        } catch (error) {
            setNotifMessage('Neizdevās pievienot pasūtījumu.');
            setNotifType('error');
            setIsNotifOpen(true);
        }
    };
    

    const parentCategories = categories.filter(category => !category.parent_id);

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


    const renderPagination = () => {
        const paginationItems = [];

        if (currentPage > 1) {
            paginationItems.push(
                <button
                    key="prev"
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="mx-1 p-2 rounded bg-gray-200 hover:bg-gray-300"
                >
                     Iepriekšējā lapa
                </button>
            );
        }
        for (let i = 1; i <= pagination.lastPage; i++) {
            paginationItems.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`mx-1 p-2 rounded ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    {i}
                </button>
            );
        }
        if (currentPage < pagination.lastPage) {
            paginationItems.push(
                <button
                    key="next"
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="mx-1 p-2 rounded bg-gray-200 hover:bg-gray-300"
                >
                    Nākamā lapa
                </button>
            );
        }

        return paginationItems;
    };


    const handlePageChange = (page) => {
        setCurrentPage(page);
        Inertia.get('/shop', {
            page,
            category: selectedParentCategory || null,
            subcategory: selectedSubCategory || null,
            search: searchQuery, 
            filter 
        }, { preserveState: true }); 
    };
    
    return (
        <>
            <Head title="Veikals" />
            <AuthenticatedLayout auth={auth}>
                <div className="flex w-full h-auto min-h-screen">
                    {/* Sidebar */}
                    <div className={`transition-all duration-300 h-dvh ${isSidebarMinimized ? 'sm:w-16 w-0' : 'sm:w-2/6 w-full sm:relative absolute z-10'} h-screen border-2 p-2 border-gray-100 bg-gray-50 dark:bg-gray-800`}>
                        <div className={`flex items-center mb-4 ${isSidebarMinimized ? 'justify-center' : 'justify-end'}`}>
                            <button onClick={() => setIsSidebarMinimized(!isSidebarMinimized)} className="p-2">
                                <FaAngleLeft size={24} className={`transform transition-transform duration-300 ${isSidebarMinimized ? 'rotate-180' : ''}`} />
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

                        {/* Filter Section */}
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

                    {/* Products section */}
                    <section className={`w-full p-8 dark:bg-gray-700 ${isSidebarMinimized ? '' : 'ml-0'} `}>
                        <h2 className="text-xl font-semibold mb-4">{selectedCategoryName()}</h2> 
                        {sortedProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {sortedProducts.map(product => (
                                    <div 
                                        key={product.id} 
                                        onClick={() => openModal(product)}
                                        className="cursor-pointer"
                                    >
                                        <OfferCard 
                                            className='w-full'
                                            image={product.image} 
                                            name={product.name}
                                            price={`${product.price} €`} 
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>Netika atrasts neviens produkts.</p>
                        )}

                        <div className="flex justify-center mt-4">
                            {renderPagination()}
                        </div>
                    </section>

                    {/* Modal for product details */}
                    {isModalOpen && (
                        <ProductModal 
                            product={selectedProduct} 
                            closeModal={closeModal} 
                            addToCart={addToCart}  
                        />
                    )}
                </div>
                <PostNotification
                    isOpen={isNotifOpen}
                    message={notifMessage}
                    type={notifType}
                    onClose={closeNotif}
                />
            </AuthenticatedLayout>
        </>
    );
}
