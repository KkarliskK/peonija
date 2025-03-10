import { Head, Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';
import ProductList from '@/Components/Modals/ProductsList';
import ProductModal from '@/Components/Modals/ProductModal';
import PostNotification from '@/Components/Modals/Notification';

export default function SavedProducts({ auth, categories = [], likedProducts = [] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [notifMessage, setNotifMessage] = useState('');
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [notifType, setNotifType] = useState('success');
    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    
    const products = likedProducts.map(product => {
        // console.log('Original product:', product);
        
        const normalizedProduct = {
            ...product,
            formatted_price: product.formatted_price || `€${product.price}`,
            is_available: product.is_available || true,
            is_liked: true 
        };
        
        if (product.likes_count !== undefined) {
            normalizedProduct.likes_count = product.likes_count;
        } else {
            normalizedProduct.likes_count = 1;
        }
        
        if (typeof product.category_id === 'object' && product.category_id !== null) {
            normalizedProduct.category_id = product.category_id.id;
            normalizedProduct.category_name = product.category_id.name;
        } else {
            const category = categories.find(cat => cat.id === product.category_id);
            normalizedProduct.category_name = category ? category.name : '';
        }
        
        // console.log('Normalized product:', normalizedProduct);
        return normalizedProduct;
    });

    const totalPages = Math.ceil(products.length / itemsPerPage);
    const paginatedProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const closeNotif = () => setIsNotifOpen(false);

    const openModal = (product) => {
        const sanitizedProduct = { ...product };
        
        Object.keys(sanitizedProduct).forEach(key => {
            if (typeof sanitizedProduct[key] === 'object' && sanitizedProduct[key] !== null && !Array.isArray(sanitizedProduct[key])) {
                sanitizedProduct[key] = JSON.stringify(sanitizedProduct[key]);
            }
        });
        
        setSelectedProduct(sanitizedProduct);
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setSelectedProduct(null);
        setIsModalOpen(false);
    };

    return (
        <>
            <Head title="Saglabātās preces" />
            <AuthenticatedLayout auth={{ user: auth }}>
                <div className="relative flex flex-col w-full h-auto min-h-screen">
                    <div className="flex w-full">
                        <div className="flex-1">
                            <div className="p-4 bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <h1 className="text-2xl font-semibold dark:text-gray-200">Saglabātie produkti</h1>
                                <p className="mt-1 text-gray-500 dark:text-gray-400">
                                    Šeit ir jūsu saglabātie produkti
                                </p>
                            </div>
                            
                            {paginatedProducts.length > 0 ? (
                                <ProductList 
                                    paginatedProducts={paginatedProducts}
                                    openModal={openModal}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    totalPages={totalPages}
                                    selectedParentCategory={null} 
                                    selectedSubCategory={null}
                                    filter="all" 
                                    searchQuery="" 
                                    categories={categories}
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center w-full p-8 mt-8 text-center">
                                    <p className="text-xl text-gray-500">Nav saglabāto produktu</p>
                                    <Link 
                                        href="/shop" 
                                        className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
                                    >
                                        Doties uz veikalu
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

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