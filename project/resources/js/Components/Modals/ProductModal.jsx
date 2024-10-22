import { useState } from 'react';
import { IoMdClose, IoMdAdd, IoMdRemove } from "react-icons/io";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Inertia } from '@inertiajs/inertia';
import BuyButton from '@/Components/Buttons/BuyButton';

export default function ProductModal({ product, closeModal, addToCart }) {
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isFilled, setIsFilled] = useState(product.user_liked || false); 
    const [likeCount, setLikeCount] = useState(product.like_count || 0); 
    const totalPrice = (product.price * quantity).toFixed(2);

    const handleQuantityChange = (change) => {
        setQuantity((prev) => Math.max(1, prev + change)); 
    };

    const handleClick = async () => {
        try {
            await Inertia.post(`/products/${product.id}/like`, {
                _method: 'POST', 
            });

            // Optimistic update
            setIsFilled(prev => !prev);
            setLikeCount(prev => isFilled ? prev - 1 : prev + 1);
        } catch (error) {
            console.error('Error liking product:', error);
        }
    };

    const handleAddToCart = async () => {
        setLoading(true); 
        try {
            await addToCart(product, quantity);
            closeModal();  
        } catch (error) {
            console.error("Error adding to cart:", error); 
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="flex justify-center items-center flex-col bg-white rounded-lg shadow-md relative w-2/5">
                <button className="absolute top-2 right-2 text-gray-500" onClick={closeModal}>
                    <IoMdClose size={32}/> 
                </button>
                <img src={product.image} alt={product.name} className="w-full object-cover mb-4 rounded" />
                <div className='flex items-start flex-col w-full p-4'>
                    <h2 className="text-3xl font-semibold mb-2">{product.name}</h2>
                    <p className="text-lg mb-4">{product.price} €</p>
                </div>
                <div className="flex justify-center items-center w-full mb-4 p-6">
                    <div className='flex justify-center items-center p-2 rounded-lg bg-gradient-to-br from-violet-200 to-pink-100 w-2/6'>
                        <button 
                            className={`p-2 bg-white rounded-full ${quantity <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`} 
                            onClick={() => handleQuantityChange(-1)} 
                            disabled={quantity <= 1} 
                        >
                            <IoMdRemove size={20} />
                        </button>
                        <span className="px-4 mx-4 text-xl">{quantity}</span>
                        <button 
                            className="p-2 bg-white rounded-full" 
                            onClick={() => handleQuantityChange(1)}
                        >
                            <IoMdAdd size={20} />
                        </button>
                    </div>
                    <BuyButton 
                        className={` text-white p-4 mx-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
                        onClick={handleAddToCart}
                        disabled={loading} 
                    >
                        {loading ? 'Pievieno...' : `Pievienot grozam (${totalPrice} €)`}
                    </BuyButton>
                    <button onClick={handleClick} className='flex items-center'>
                        {isFilled ? (
                            <FaHeart className='mx-4' size={34} color="red" />
                        ) : (
                            <FaRegHeart className='mx-4' size={34} />
                        )}
                        <span className="text-lg">{likeCount}</span> 
                    </button>
                </div>
            </div>
        </div>
    );
}
