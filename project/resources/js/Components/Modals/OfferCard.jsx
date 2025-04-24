import { useForm } from "@inertiajs/react";
import React, { useState, useEffect } from 'react';

const OfferCard = ({ 
    id, 
    image, 
    name, 
    price, 
    isAvailable, 
    quantity, 
    initialLikesCount, 
    isLiked, 
    auth,
    onLikeUpdate,
    storeClosed
}) => {
    const [isFilled, setIsFilled] = useState(isLiked || false);
    const [likeCount, setLikeCount] = useState(initialLikesCount || 0);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [notificationColor, setNotificationColor] = useState('bg-green-600');
    const { post } = useForm();

    useEffect(() => {
        setIsFilled(isLiked);
        setLikeCount(initialLikesCount);
    }, [isLiked, initialLikesCount]);

    return (
        <div className={`group relative w-full max-w-md overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-md transition-all duration-300 hover:shadow-xl sm:hover:scale-[1.02] ${storeClosed ? 'opacity-75' : ''}`}>
            {showNotification && (
                <div className={`absolute z-50 px-4 py-2 text-sm text-white rounded-lg right-3 top-3 animate-fade-in ${notificationColor}`}>
                    {notificationMessage}
                </div>
            )}

            <div className="relative overflow-hidden aspect-square">
                <img 
                    loading="lazy" 
                    className={`object-cover w-full h-full transition-transform duration-300 ${!storeClosed && 'group-hover:scale-105'}`}
                    src={image} 
                    alt={name} 
                />
                
                {(!isAvailable || quantity === 0 || storeClosed) && (
                    <span className="absolute z-10 px-3 py-1 text-xs font-medium text-white bg-red-500 rounded-full shadow-sm right-3 top-3">
                        {storeClosed ? 'Veikals slēgts' : 'Nav pieejams'}
                    </span>
                )}
                <button 
                    className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-white/90 dark:bg-gray-700/90 px-3 py-1.5 text-sm shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white dark:hover:bg-gray-700"
                >
                    {isFilled ? (
                        <span className="text-red-500">❤️</span>
                    ) : (
                        <span className="text-gray-600 dark:text-gray-300">🤍</span>
                    )}
                    <span className="text-gray-700 dark:text-gray-300">{likeCount}</span>
                </button>
            </div>

            <div className="p-6 space-y-3">
                <div className="inline-block px-4 py-2 text-lg font-bold rounded-full bg-violet-100 dark:bg-violet-900 text-violet-800 dark:text-violet-100">
                    {price}
                </div>

                <div className="space-y-2">
                    <h3 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 line-clamp-1">
                        {name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Pieejami: {quantity}
                    </p>
                    
                    {storeClosed && (
                        <p className="mt-1 text-xs text-red-500 dark:text-red-400">
                            Pasūtījumi nav pieejami, kamēr veikals ir slēgts
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OfferCard;