import React from 'react';
import BuyButton from '@/Components/Buttons/BuyButton';

export default function OfferCard({ image, name, price }) {
    return (
        <div className='relative flex flex-col justify-end bg-gradient-to-br from-violet-200 to-pink-100 items-center w-full sm:h-auto h-auto shadow-lg m-4 rounded-md rounded-br-[100px]'>
            <img loading="lazy" className='w-full object-cover rounded-tr-md rounded-tl-md' src={image} alt={name} />
            <div className='flex flex-col w-full justify-center items-center p-2 m-2'>
                <p className='text-lg font-semibold'>{name}</p>
                <div className='flex justify-center items-center w-full p-2'>
                    <h1 className='m-2 p-2 font-semibold text-xl sm:text-2xl'>{price}</h1>
                    <BuyButton disabled={false}>Pirkt</BuyButton>
                </div>
            </div>
        </div>
    );
}