import React, { useState } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

export default function OfferCard({ image, name, price, isAvailable, quantity, initialLikesCount }) {
    const [isFilled, setIsFilled] = useState(false);
    const [likeCount, setLikeCount] = useState(initialLikesCount || 0);

    return (
        <div className="relative w-full sm:h-auto h-auto shadow-lg m-4 rounded-md rounded-br-[100px] cursor-pointer transition duration-300 ease-in-out hover:scale-105">
            
            {/* Unavailable Badge */}
            {(!isAvailable || quantity === 0) && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md shadow-md z-10">
                    Nav pieejams
                </span>
            )}

            {/* Wrapper for Content with conditional opacity */}
            <div className={`flex flex-col justify-end bg-gradient-to-br from-violet-200 to-pink-100 items-center w-full h-full rounded-md rounded-br-[100px] ${(!isAvailable || quantity === 0) ? 'opacity-50' : ''}`}>
                <img loading="lazy" className='w-full h-48 object-cover rounded-tr-md rounded-tl-md' src={image} alt={name} />
                <div className='flex flex-col w-full justify-center items-start p-2 m-2'>
                    <h1 className='m-2 text-lg text-accent'>{price}</h1>
                    <div className='flex justify-start items-center w-full p-2'>
                        <p className='text-lg font-semibold'>{name}</p>
                        <button className='flex items-center ml-2'>
                            {isFilled ? <FaHeart className='text-red-500' /> : <FaRegHeart className='text-gray-500' />}
                            <span className='text-lg ml-1'>{likeCount}</span>
                        </button>
                    </div>
                    <p className='text-sm text-gray-600 mx-2'>Pieejami: {quantity}</p>
                </div>
            </div>
        </div>
    );
}
