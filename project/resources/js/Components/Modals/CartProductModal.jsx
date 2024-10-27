import { useState, useEffect } from 'react';
import { IoMdClose, IoMdRemove, IoMdAdd } from "react-icons/io";
import { Inertia } from '@inertiajs/inertia'; // Import Inertia for navigation
import BuyButton from '@/Components/Buttons/BuyButton';

export default function CartProductModal({ product, closeModal, quantity, updateQuantity }) {
    const [loading, setLoading] = useState(false);
    const [quantityState, setQuantity] = useState(quantity || 1);

    useEffect(() => {
        setQuantity(quantity);
    }, [quantity]);

    const handleQuantityChange = (change) => {
        setQuantity((prev) => Math.max(1, prev + change));
    };
    
    const handleSaveQuantity = () => {
        setLoading(true);
        updateQuantity(product.id, quantityState);
        closeModal();
        setLoading(false); 
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="flex justify-center items-center flex-col bg-white rounded-lg shadow-md relative w-2/5">
                <button className="absolute top-2 right-2 text-gray-500" onClick={closeModal}>
                    <IoMdClose size={32} />
                </button>
                <img src={product.image} alt={product.name} className="w-full object-cover mb-4 rounded" />
                <div className='flex items-start flex-col w-full p-4'>
                    <h2 className="text-3xl font-semibold mb-2">{product.name}</h2>
                    <p className="text-lg mb-4">{product.price} €</p>
                </div>
                {/* Quantity Editing */}
                <div className="flex justify-center items-center w-full mb-4 p-6">
                    <div className='flex justify-center items-center p-2 rounded-lg bg-gradient-to-br from-violet-200 to-pink-100 w-2/6'>
                        <button 
                            className={`p-2 bg-white rounded-full ${quantityState <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`} 
                            onClick={() => handleQuantityChange(-1)} 
                            disabled={quantityState <= 1} 
                        >
                            <IoMdRemove size={20} />
                        </button>
                        <span className="px-4 mx-4 text-xl">{quantityState}</span>
                        <button 
                            className="p-2 bg-white rounded-full" 
                            onClick={() => handleQuantityChange(1)}
                        >
                            <IoMdAdd size={20} />
                        </button>
                    </div>
                </div>
                <div className="flex justify-center items-center w-full mb-4 p-6">
                    <BuyButton 
                        className={`text-white p-4 mx-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
                        onClick={handleSaveQuantity}
                        disabled={loading} 
                    >
                        {loading ? 'Saglabā...' : 'Saglabāt daudzumu'}
                    </BuyButton>
                </div>
            </div>
        </div>
    );
}
