import React from 'react';
import BuyButton from '@/Components/Buttons/BuyButton';

export default function OfferCard({ image, name, price }) {
    return (
        <div className='relative flex flex-col justify-end bg-gradient-to-br from-violet-200 to-pink-100 items-center w-full sm:h-auto h-auto shadow-lg m-4 rounded-md rounded-br-[100px] cursor-pointer transition duration-300 ease-in-out hover:scale-105'>
            <img loading="lazy"     className='w-full h-48 object-cover rounded-tr-md rounded-tl-md' src={image} alt={name} />
            <div className='flex flex-col w-full justify-center items-start p-2 m-2'>
                <h1 className='m-2 text-lg text-accent'>{price}</h1>
                <div className='flex justify-start items-center w-full p-2'>
                    <p className='text-lg font-semibold'>{name}</p>
                    {/* <BuyButton disabled={false}>Pirkt</BuyButton> */}
                </div>
            </div>
        </div>
    ); 
}