import { Head, Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import GuestLayout from '@/Layouts/GuestLayout';
import { useState, useEffect } from 'react';
import Sidebar from '@/Components/Modals/Sidebar';
import ProductList from '@/Components/Modals/ProductsList';
import ProductModal from '@/Components/Modals/ProductModal';
import PostNotification from '@/Components/Modals/Notification';

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
    
    const parentCategories = categories.filter(category => !category.parent_id); 

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedParentCategory, selectedSubCategory, filter, searchQuery]);

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

    const addToCart = async (product, quantity) => {
        try {
            await Inertia.post('/cart/add', {
                product_id: product.id,
                quantity,
            });
            setCart(prevCart => {
                const existingItem = prevCart.find(item => item.product.id === product.id);
                if (existingItem) {
                    return prevCart.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
                }
                return [...prevCart, { product, quantity }];
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

    return (
        <>
            <Head title="Veikals" />
            <GuestLayout auth={auth}>
                <div className={`flex w-full h-auto min-h-screen relative ${isModalOpen ? '' : ''}`}>
                    {/* Sidebar */}
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
                    />

                    {/* Products section */}
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

                    {/* Product Modal Popup */}
                    {/* {isModalOpen && (
                        <ProductModal 
                            product={selectedProduct} 
                            closeModal={closeModal} 
                            addToCart={addToCart} 
                            auth={auth} 
                        />
                    )} */}
                </div>
                <PostNotification
                    isOpen={isNotifOpen}
                    message={notifMessage}
                    type={notifType}
                    onClose={closeNotif}
                />
            </GuestLayout>
        </>
    );
}
