import { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Inertia } from '@inertiajs/inertia';
import BuyButton from '@/Components/Buttons/BuyButton';
import { Link } from '@inertiajs/react';

export default function ProductDisplay({ product, closeModal, addToCart, auth, isModal = false }) {
    const [loading, setLoading] = useState(false);
    const [isFilled, setIsFilled] = useState(product.is_liked);
    const [likeCount, setLikeCount] = useState(product.likes_count);

    const handleLikeClick = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (!auth?.id) return; 
        
        try {
            setLoading(true);
            
            await Inertia.post(`/products/${product.id}/like`, {
                _method: 'POST',
                preserveScroll: true, 
                preserveState: true, 
            });
            
            setIsFilled(!isFilled);
            setLikeCount(isFilled ? likeCount - 1 : likeCount + 1);
        } catch (error) {
            console.error('Error liking product:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={isModal ? "fixed inset-0 bg-black/75 backdrop-blur-sm flex justify-center items-center z-50 p-4" : "w-full"}>
            <div 
                className={`
                    ${isModal ? 'w-full max-w-md md:max-w-xl lg:max-w-2xl' : 'w-full'} 
                    bg-white dark:bg-gray-800 rounded-2xl shadow-xl relative overflow-hidden transition-all duration-300 ease-in-out
                `}
            >
                {isModal && (
                    <button 
                        className="absolute z-10 p-2 text-white transition-all duration-200 rounded-full shadow-lg top-3 right-3 bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-400" 
                        onClick={closeModal}
                        aria-label="Close modal"
                    >
                        <IoMdClose size={20} />
                    </button>
                )}
                
                <div className="flex flex-col md:flex-row">
                    {/* Image container with gradient overlay */}
                    <div className="relative w-full h-64 overflow-hidden md:w-1/2 sm:h-80 md:h-96 group">
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/40 to-transparent group-hover:opacity-100"></div>
                    </div>
                    
                    {/* Product details */}
                    <div className="flex flex-col justify-between w-full p-6 md:w-1/2 md:p-8 dark:text-white">
                        <div>
                            <div className="flex items-start justify-between">
                                <h2 className="mb-2 text-2xl font-semibold text-gray-800 sm:text-3xl dark:text-white">{product.name}</h2>
                                
                                {auth?.id && (
                                    <button 
                                        onClick={handleLikeClick}
                                        disabled={loading}
                                        className="items-center justify-center hidden w-10 h-10 transition-colors duration-200 rounded-full md:flex hover:bg-gray-100 dark:hover:bg-gray-700"
                                        aria-label={isFilled ? "Remove from favorites" : "Add to favorites"}
                                    >
                                        {isFilled ? (
                                            <FaHeart className="text-xl text-red-500" />
                                        ) : (
                                            <FaRegHeart className="text-xl text-gray-500 dark:text-gray-300" />
                                        )}
                                    </button>
                                )}
                            </div>
                            
                            <p className="mb-4 text-xl font-bold text-violet-600 dark:text-violet-400">{product.price} €</p>
                            
                            {product.description && (
                                <div className="mb-6">
                                    <p className="text-sm text-gray-600 dark:text-gray-300 sm:text-base">
                                        {product.description}
                                    </p>
                                </div>
                            )}
                        </div>
                        
                        <div className="mt-auto">
                            {auth?.id ? (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <button 
                                            onClick={handleLikeClick}
                                            disabled={loading}
                                            className="flex items-center gap-2 px-4 py-2 transition-colors duration-200 rounded-lg md:hidden hover:bg-gray-100 dark:hover:bg-gray-700"
                                            aria-label={isFilled ? "Remove from favorites" : "Add to favorites"}
                                        >
                                            {isFilled ? (
                                                <FaHeart className="text-xl text-red-500" />
                                            ) : (
                                                <FaRegHeart className="text-xl text-gray-500 dark:text-gray-300" />
                                            )}
                                            <span className="text-lg">{likeCount}</span>
                                        </button>
                                        
                                        <span className="hidden text-lg md:block">{likeCount} {likeCount === 1 ? 'like' : 'likes'}</span>
                                        
                                        {addToCart && (
                                            <BuyButton 
                                                onClick={() => addToCart(product)} 
                                                loading={loading}
                                                className="w-full sm:w-auto"
                                            />
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <Link 
                                    href="/login" 
                                    className="block w-full px-4 py-3 font-medium text-center text-white transition-colors duration-200 rounded-lg shadow-md bg-violet-600 hover:bg-violet-700"
                                >
                                    Pieslēgties
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}