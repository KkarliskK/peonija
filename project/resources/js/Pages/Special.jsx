import { useState, useEffect } from 'react';
import OfferCard from '@/Components/Modals/OfferCard';
import ProductModal from '@/Components/Modals/ProductModal';
import PostNotification from '@/Components/Modals/Notification';

export default function Special({ offers, auth }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [notifMessage, setNotifMessage] = useState('');
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [notifType, setNotifType] = useState('success');
    const [localProducts, setLocalProducts] = useState([]);

    useEffect(() => {
        if (offers && offers.length > 0) {
            setLocalProducts([...offers]);
        }
    }, [offers]);

    const topProducts = localProducts.length > 0 
        ? [...localProducts].sort((a, b) => b.likes_count - a.likes_count).slice(0, 3)
        : [];

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setSelectedProduct(null);
        setIsModalOpen(false);
    };

    const closeNotif = () => setIsNotifOpen(false);

    const showNotification = (message, type = 'success') => {
        setNotifMessage(message);
        setNotifType(type);
        setIsNotifOpen(true);
    };

    const updateProductLike = (productId, isLiked, newLikesCount) => {
        setLocalProducts(currentProducts => 
            currentProducts.map(product => 
                product.id === productId 
                    ? { 
                        ...product, 
                        is_liked: isLiked,
                        likes_count: newLikesCount
                    } 
                    : product
            )
        );

        if (selectedProduct && selectedProduct.id === productId) {
            setSelectedProduct(current => ({
                ...current,
                is_liked: isLiked,
                likes_count: newLikesCount
            }));
        }
    };

    return (
        <section 
            id='special_orders' 
            className='relative min-h-screen py-16 bg-gradient-to-b from-accent to-primary-pink dark:from-gray-800 dark:to-gray-900 sm:py-24'
        >
            <div className='container px-4 mx-auto sm:px-6 lg:px-8'>
                <div className='max-w-3xl mx-auto mb-12 text-center sm:mb-16'>
                    <div className='mb-8 text-center'>
                        <h1 className='relative inline-block mb-2 text-4xl font-bold tracking-wider text-white uppercase md:text-5xl dark:text-white'>
                            Populārākie produkti
                            <span className='absolute left-0 w-full h-1 bg-gray-800 -bottom-2 dark:bg-white opacity-20'></span>
                        </h1>
                    </div>
                    <p className='text-lg leading-relaxed sm:text-xl text-white/90 dark:text-gray-300'>
                        Mūsu klientu iecienītākie piedāvājumi. Uzklikšķiniet uz produkta, lai apskatītu 
                        detalizētāku informāciju un pievienotu to grozam.
                    </p>
                </div>

                {topProducts.length === 0 ? (
                    <div className='text-xl text-center text-white dark:text-gray-200'>
                        Nav pieejamu produktu
                    </div>
                ) : (
                    <div className="max-w-[1600px] mx-auto px-4">
                        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 place-items-center'>
                            {topProducts.map((product) => (
                                <div key={product.id} className="w-full cursor-pointer" onClick={() => openModal(product)}>
                                    <OfferCard
                                        id={product.id}
                                        image={product.image}
                                        name={product.name}
                                        price={`${product.price} €`}
                                        isAvailable={product.is_available}
                                        initialLikesCount={product.likes_count}
                                        isLiked={product.is_liked}
                                        quantity={product.quantity}
                                        auth={auth}
                                        onLikeUpdate={(isLiked, likesCount) => 
                                            updateProductLike(product.id, isLiked, likesCount)
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            
            {isModalOpen && selectedProduct && (
                <ProductModal 
                    product={selectedProduct} 
                    closeModal={closeModal} 
                    auth={auth}
                    showNotification={showNotification}
                    onLikeUpdate={(isLiked, likesCount) => 
                                updateProductLike(selectedProduct.id, isLiked, likesCount)
                            }
                />
            )}
            
            <PostNotification
                isOpen={isNotifOpen}
                message={notifMessage}
                type={notifType}
                onClose={closeNotif}
            />
        </section>
    );
}