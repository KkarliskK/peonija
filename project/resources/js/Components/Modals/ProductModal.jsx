import { useState } from 'react';
import { IoMdClose, IoMdAdd, IoMdRemove } from "react-icons/io";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Inertia } from '@inertiajs/inertia';
import BuyButton from '@/Components/Buttons/BuyButton';
import { Link } from '@inertiajs/react';
import { CiCircleInfo } from "react-icons/ci";


export default function ProductModal({ product, closeModal, addToCart, auth }) {
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isFilled, setIsFilled] = useState(product.user_liked || false); 
    const [likeCount, setLikeCount] = useState(product.like_count || 0); 
    const totalPrice = (product.price * quantity).toFixed(2);
    const [isHovered, setIsHovered] = useState(false);


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
            <div className="flex justify-center items-center flex-col bg-white rounded-lg shadow-md relative sm:w-2/5 w-full">
                <button className="absolute top-2 right-2 text-gray-500" onClick={closeModal}>
                    <IoMdClose size={32}/> 
                </button>
                <div className='w-full h-80 overflow-hidden rounded'>
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className='flex items-start flex-col w-full p-4'>
                    <h2 className="text-3xl font-semibold mb-2 product-name">{product.name}</h2>
                    <p className="text-lg mb-4">{product.price} €</p>
                </div>
                <div className="flex sm:flex-row flex-col justify-center items-center w-full mb-4 p-6">
                    <div className='flex justify-center items-center p-2 rounded-lg bg-gradient-to-br from-violet-200 to-pink-100 sm:w-2/6 w-4/5 my-2'> 
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
                    {auth?.id ? (
                    <BuyButton
                        onClick={() => handleAddToCart(product, quantity)}
                        className={` text-white p-4 mx-4 my-2 add-to-cart ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
                        disabled={loading} 

                    >
                        {loading ? 'Pievieno...' : `Pievienot grozam (${totalPrice} €)`}
                    </BuyButton>
                ) : (
                    <div className='relative flex flex-row items-center justify-center'>
                        <Link href='/login'>
                            <BuyButton
                                
                                className="text-white p-4 mx-4 login-button"
                            >
                                Pieslēgties
                            </BuyButton>
                        </Link>
                        <CiCircleInfo
                            className='text-black cursor-pointer'
                            size={26}
                            onMouseEnter={() => setIsHovered(true)}   
                            onMouseLeave={() => setIsHovered(false)}
                        />

                        {isHovered && (
                            <div className='rounded bg-gray-100 shadow-md p-2 absolute bottom-12 z-10'>
                                <p className='text-black'>Lai pievienotu produktu grozam, ir nepieciešams pieslēgties savam kontam.</p>
                            </div>
                        )}
                    </div>
                )}
                    <button onClick={handleClick} className='flex items-center'>
                        {isFilled ? (
                            <FaHeart className='sm:mx-4 mx-2 text-2xl' color="red" />
                        ) : (
                            <FaRegHeart className='sm:mx-4 mx-2 text-2xl' />
                        )}
                        <span className="text-lg">{likeCount}</span> 
                    </button>
                </div>
            </div>
        </div>
    );
}
