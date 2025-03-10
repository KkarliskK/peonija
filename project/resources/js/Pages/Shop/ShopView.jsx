import { Head, Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState, useEffect } from 'react';
import Sidebar from '@/Components/Modals/Sidebar';
import ProductList from '@/Components/Modals/ProductsList';
import ProductModal from '@/Components/Modals/ProductModal';
import PostNotification from '@/Components/Modals/Notification';
import { FaBars } from "react-icons/fa";

export default function ShopView({ auth, categories = [], products = [] }) {
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
    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [isMobile, setIsMobile] = useState(false);
    
    const parentCategories = categories.filter(category => !category.parent_id); 

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedParentCategory, selectedSubCategory, filter, searchQuery]);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (mobile) {
                setIsSidebarMinimized(true);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const filteredProducts = products.filter(product => {
        if (selectedParentCategory) {
            const subCategoryIds = categories
                .filter(category => category.parent_id === selectedParentCategory)
                .map(subCategory => subCategory.id);
            if (selectedSubCategory) {
                return product.category_id === selectedSubCategory;
            } else {
                return product.category_id === selectedParentCategory || subCategoryIds.includes(product.category_id);
            }
        }
        if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }
        return true;
    });

    const sortedProducts = (() => {
        let sorted = [...filteredProducts];
        if (filter === 'price-asc') return sorted.sort((a, b) => a.price - b.price);
        if (filter === 'price-desc') return sorted.sort((a, b) => b.price - a.price);
        return sorted;
    })();

    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
    const paginatedProducts = sortedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const closeNotif = () => setIsNotifOpen(false);

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setSelectedProduct(null);
        setIsModalOpen(false);
    };

    return (
        <>
            <Head title="Veikals" />
            <AuthenticatedLayout auth={{ user: auth }}>
                <div className="relative flex flex-col w-full h-auto min-h-screen">
                    <div className="flex w-full">
                        <Sidebar
                            isSidebarMinimized={isSidebarMinimized}
                            setIsSidebarMinimized={setIsSidebarMinimized}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            filter={filter}
                            setFilter={setFilter}
                            categories={categories}
                            selectedParentCategory={selectedParentCategory}
                            setSelectedParentCategory={setSelectedParentCategory}
                            selectedSubCategory={selectedSubCategory}
                            setSelectedSubCategory={setSelectedSubCategory}
                            className="flex-shrink-0"
                        />

                        <div className="flex-1">
                            <ProductList 
                                paginatedProducts={paginatedProducts}
                                openModal={openModal}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                totalPages={totalPages}
                                selectedParentCategory={selectedParentCategory} 
                                selectedSubCategory={selectedSubCategory}
                                filter={filter} 
                                searchQuery={searchQuery} 
                                categories={categories}
                            />
                        </div>
                    </div>

                    {/* Mobile Toggle sidebar Button */}
                    {isMobile && isSidebarMinimized && (
                        <button 
                            onClick={() => setIsSidebarMinimized(false)}
                            className="fixed z-50 p-3 text-white transition-all duration-300 bg-blue-900 rounded-full shadow-lg bottom-8 right-8 hover:bg-blue-950"
                            aria-label="Open sidebar"
                        >
                            <FaBars size={20} />
                        </button>
                    )}

                    {/* Product Modal Popup */}
                    {isModalOpen && (
                        <ProductModal 
                            product={selectedProduct} 
                            closeModal={closeModal} 
                            auth={auth} 
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