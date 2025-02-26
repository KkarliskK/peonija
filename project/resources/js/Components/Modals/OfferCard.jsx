import React, { useState, useEffect } from 'react';

const OfferCard = ({ id, image, name, price, isAvailable, quantity, initialLikesCount, isLiked }) => {
    const [isFilled, setIsFilled] = useState(isLiked || false);
    const [likeCount, setLikeCount] = useState(initialLikesCount || 0);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [notificationColor, setNotificationColor] = useState('gb-green600');
    const [isLiking, setIsLiking] = useState(false);
    
    const showToast = (message, color = 'bg-green-600') => {
        setNotificationMessage(message);
        setShowNotification(true);
        setNotificationColor(color);
        setTimeout(() => setShowNotification(false), 2000);
    };


    const handleLike = async (e) => {
        e.preventDefault();
        if (isLiking) return; 

        setIsLiking(true);
        try {
            const response = await fetch(`/products/${id}/like`, {
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
            showToast('Kļūda! Lūdzu, mēģiniet vēlreiz.');
        } finally {
            setIsLiking(false);
        }
    };

    const handleAddToCart = (e) => {
        e.preventDefault();
        if (isAvailable && quantity > 0 && selectedQuantity > 0) {
            try {
                const existingCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
                
                const existingItemIndex = existingCart.findIndex(item => item.id === id);
                
                let newQuantity = selectedQuantity;

                if (existingItemIndex !== -1) {
                    const existingItem = existingCart[existingItemIndex];
                    const totalQuantityInCart = existingItem.quantity + selectedQuantity;

                    if (totalQuantityInCart > quantity) {
                        showToast('Prece nav pieejama. (pārbaudiet pieejamo daudzumu)', 'bg-red-600'); 
                        return;
                    }

                    newQuantity = totalQuantityInCart;
                    existingItem.quantity = newQuantity;
                } else {
                    newQuantity = Math.min(selectedQuantity, quantity);
                    
                    if (newQuantity < selectedQuantity) {
                        showToast('Prece nav pieejama. (pārbaudiet pieejamo daudzumu)', 'bg-red-600'); 
                        return;
                    }

                    existingCart.push({
                        id,
                        name,
                        price,
                        image,
                        quantity: newQuantity,
                        stock: quantity
                    });
                }

                localStorage.setItem('guestCart', JSON.stringify(existingCart));
                window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart: existingCart } }));

                showToast('Pievienots grozam');

            } catch (error) {
                showToast('Kļūda! Lūdzu, mēģiniet vēlreiz.', 'bg-red-600');
            }
        } else {
            showToast('Lūdzu, izvēlieties derīgu daudzumu.', 'bg-red-600');
        }
    };

    const incrementQuantity = () => {
        if (selectedQuantity < quantity) {
            setSelectedQuantity(prev => prev + 1);
        }
    };

    const decrementQuantity = () => {
        if (selectedQuantity > 1) {
            setSelectedQuantity(prev => prev - 1);
        }
    };

    useEffect(() => {
        setIsFilled(isLiked);
        setLikeCount(initialLikesCount);
    }, [isLiked, initialLikesCount]);

    return (
        <div className="group relative w-full max-w-md overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl sm:hover:scale-[1.02]">
            {showNotification && (
                <div className={`absolute z-50 px-4 py-2 text-sm text-white rounded-lg right-3 top-3 animate-fade-in ${notificationColor}`}>
                    {notificationMessage}
                </div>
            )}


            <div className="relative overflow-hidden aspect-square">
                <img 
                    loading="lazy" 
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" 
                    src={image} 
                    alt={name} 
                />
                
                {(!isAvailable || quantity === 0) && (
                    <span className="absolute z-10 px-3 py-1 text-xs font-medium text-white bg-red-500 rounded-full shadow-sm right-3 top-3">
                        Nav pieejams
                    </span>
                )}

                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 transition-opacity duration-300 opacity-0 bg-black/40 group-hover:opacity-100">
                    <div className="flex items-center gap-3 p-2 bg-white rounded-lg">
                        <button 
                            onClick={decrementQuantity}
                            className="p-2 text-gray-600 transition-colors rounded-full hover:bg-gray-100"
                            disabled={selectedQuantity <= 1}
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                        </button>
                        <span className="w-12 text-lg font-semibold text-center">
                            {selectedQuantity}
                        </span>
                        <button 
                            onClick={incrementQuantity}
                            className="p-2 text-gray-600 transition-colors rounded-full hover:bg-gray-100"
                            disabled={selectedQuantity >= quantity}
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                    </div>
                    
                    <button
                        onClick={handleAddToCart}
                        disabled={!isAvailable || quantity === 0}
                        className={`flex items-center gap-2 transform rounded-full bg-white px-8 py-4 text-black opacity-0 transition-all duration-300 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 ${
                            (!isAvailable || quantity === 0) 
                                ? 'cursor-not-allowed opacity-50' 
                                : 'hover:bg-violet-600 hover:text-white'
                        }`}
                    >
                        <span>Pievienot grozam</span>
                    </button>
                </div>

                <button 
                    onClick={handleLike}
                    disabled={isLiking}
                    className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-sm shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white"
                >
                    {isFilled ? (
                        <span className="text-red-500">❤️</span>
                    ) : (
                        <span className="text-gray-600">🤍</span>
                    )}
                    <span className="text-gray-700">{likeCount}</span>
                </button>
            </div>

            <div className="p-6 space-y-3">
                <div className="inline-block px-4 py-2 text-lg font-bold rounded-full bg-violet-100 text-violet-800">
                    {price}
                </div>

                <div className="space-y-2">
                    <h3 className="text-xl font-semibold tracking-tight text-gray-900 line-clamp-1">
                        {name}
                    </h3>
                    <p className="text-sm text-gray-500">
                        Pieejami: {quantity}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OfferCard;
