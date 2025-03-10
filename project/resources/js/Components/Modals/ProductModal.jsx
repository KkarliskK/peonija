import { useState, useEffect } from 'react';
import { IoMdClose } from "react-icons/io";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Cookies from 'js-cookie';

export default function ProductModal({ product, closeModal, auth }) {
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isFilled, setIsFilled] = useState(product.is_liked || false);
    const [likeCount, setLikeCount] = useState(product.likes_count || 0);
    const [isLiking, setIsLiking] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationColor, setNotificationColor] = useState('bg-green-600');
    const totalPrice = (product.price * quantity).toFixed(2);

    useEffect(() => {
        setIsFilled(product.is_liked);
        setLikeCount(product.likes_count);
    }, [product.is_liked, product.likes_count]);

    const showToast = (message, color = 'bg-green-600') => {
        setNotificationMessage(message);
        setShowNotification(true);
        setNotificationColor(color);
        setTimeout(() => setShowNotification(false), 2000);
    };

    const handleLikeClick = async (e) => {
        e.preventDefault();
        if (isLiking) return;

        if (!auth) {
            showToast('Lai saglabātu produktu, Jums jāpieslēdzas lapai!', 'bg-yellow-500');
            return;
        }

        setIsLiking(true);
        try {
            const response = await fetch(`/products/${product.id}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                }
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();

            setIsFilled(data.liked);
            setLikeCount(data.likesCount);
            showToast(data.liked ? 'Pievienots izlasei' : 'Noņemts no izlases');
        } catch (error) {
            showToast('Kļūda! Lūdzu, mēģiniet vēlreiz.', 'bg-red-600');
        } finally {
            setIsLiking(false);
        }
    };

    const handleAddToCart = () => {
        setLoading(true);
        
        try {
            const existingCart = Cookies.get('guest_cart') 
                ? JSON.parse(Cookies.get('guest_cart')) 
                : [];
            
            const existingItemIndex = existingCart.findIndex(item => item.id === product.id);
            
            if (existingItemIndex > -1) {
                existingCart[existingItemIndex].quantity += quantity;
            } else {
                existingCart.push({
                    id: product.id,
                    name: product.name,
                    price: typeof product.price === 'string' 
                        ? product.price.replace(/[^\d.]/g, '')
                        : product.price,
                    image: product.image,
                    quantity: quantity
                });
            }
            
            Cookies.set('guest_cart', JSON.stringify(existingCart), { 
                expires: 7,
                path: '/' 
            });
            
            window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart: existingCart } }));
            
            showToast('Pievienots grozam!');
            setTimeout(() => closeModal(), 1000);
        } catch (error) {
            console.error("Error adding to cart:", error);
            showToast('Kļūda! Lūdzu, mēģiniet vēlreiz.', 'bg-red-600');
        } finally {
            setLoading(false);
        }
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const incrementQuantity = () => {
        if (quantity < product.quantity) {
            setQuantity(quantity + 1);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/40 backdrop-blur-sm" onClick={closeModal}>
            <div 
                className="relative w-full max-w-4xl overflow-hidden bg-white shadow-2xl rounded-xl dark:bg-gray-800"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Notification */}
                {showNotification && (
                    <div className={`absolute z-50 px-4 py-2 text-sm text-white rounded-lg right-3 top-3 animate-fade-in ${notificationColor}`}>
                        {notificationMessage}
                    </div>
                )}

                {/* Close button */}
                <button 
                    onClick={closeModal}
                    className="absolute z-10 p-2 transition-all duration-200 rounded-full shadow-md top-4 right-4 bg-white/90 hover:bg-white hover:shadow-lg dark:bg-gray-700/90 dark:hover:bg-gray-700"
                    aria-label="Close"
                >
                    <IoMdClose size={20} className="text-gray-800 dark:text-gray-200" />
                </button>

                <div className="flex flex-col lg:flex-row">
                    {/* Image Section */}
                    <div className="relative w-full h-64 overflow-hidden bg-gray-100 dark:bg-gray-700 lg:w-1/2 sm:h-80 md:h-96 lg:h-auto">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="absolute inset-0 object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                        />
                        
                        {/* Like button overlay */}
                        <button 
                            onClick={handleLikeClick}
                            disabled={isLiking}
                            className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 shadow-md transition-all duration-200 hover:bg-white dark:bg-gray-700/90 dark:hover:bg-gray-700"
                            aria-label={isFilled ? "Unlike product" : "Like product"}
                        >
                            {isFilled ? (
                                <FaHeart className="text-red-500" size={18} />
                            ) : (
                                <FaRegHeart className="text-gray-600 dark:text-gray-300" size={18} />
                            )}
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{likeCount}</span>
                        </button>

                        {(!product.is_available || product.quantity === 0) && (
                            <span className="absolute z-10 px-3 py-1 text-xs font-medium text-white bg-red-500 rounded-full shadow-sm right-3 top-3">
                                Nav pieejams
                            </span>
                        )}
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col w-full p-6 lg:w-1/2">
                        <div className="mb-4">
                            <span className="px-2.5 py-1 text-xs font-semibold tracking-wide text-purple-800 bg-purple-100 rounded-full dark:bg-purple-900 dark:text-purple-100">
                                {product.category || "Produkts"}
                            </span>
                            <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-100">{product.name}</h2>
                            <div className="inline-block px-4 py-2 mt-2 text-lg font-bold rounded-full bg-violet-100 dark:bg-violet-900 text-violet-800 dark:text-violet-100">
                                {typeof product.price === 'number' ? `${product.price} €` : product.price}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="flex-grow mb-6 overflow-y-auto max-h-40 lg:max-h-56 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
                            <h3 className="mb-2 font-medium text-gray-700 text-md dark:text-gray-300">Apraksts</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {product.description || "Nav apraksta."}
                            </p>
                        </div>

                        <div className="mt-auto space-y-5">
                            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Piedāvājumā: <span className="font-semibold text-gray-900 dark:text-gray-200">{product.quantity} vienības</span>
                                </p>
                                
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Daudzums:</span>
                                    <div className="flex items-center justify-between border border-gray-300 rounded-lg dark:border-gray-600">
                                        <button 
                                            onClick={decrementQuantity}
                                            disabled={quantity <= 1}
                                            className="px-3 py-2 text-gray-700 transition-colors bg-gray-100 hover:bg-gray-200 disabled:opacity-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                            aria-label="Decrease quantity"
                                        >
                                            -
                                        </button>
                                        <div className="w-12 px-2 py-2 font-medium text-center text-gray-800 dark:text-gray-200">
                                            {quantity}
                                        </div>
                                        <button 
                                            onClick={incrementQuantity}
                                            disabled={quantity >= product.quantity}
                                            className="px-3 py-2 text-gray-700 transition-colors bg-gray-100 hover:bg-gray-200 disabled:opacity-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                            aria-label="Increase quantity"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                disabled={loading || product.quantity === 0 || !product.is_available}
                                className="w-full py-3.5 px-6 text-white font-medium transition-all duration-200 bg-purple-600 hover:bg-purple-700 rounded-lg shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 dark:bg-purple-700 dark:hover:bg-purple-800"
                            >
                                {loading ? (
                                    'Pievieno...'
                                ) : product.quantity === 0 || !product.is_available ? (
                                    'Nav pieejams'
                                ) : (
                                    `Pievienot grozam · ${totalPrice} €`
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}