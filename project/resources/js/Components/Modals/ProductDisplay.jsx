import { useState } from 'react';
import { IoMdClose, IoMdAdd, IoMdRemove } from "react-icons/io";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Inertia } from '@inertiajs/inertia';
import BuyButton from '@/Components/Buttons/BuyButton';
import { Link } from '@inertiajs/react';
import { CiCircleInfo } from "react-icons/ci";

export default function ProductDisplay({ product, closeModal, addToCart, auth, isModal = false }) {
    const [loading, setLoading] = useState(false);
    const [isFilled, setIsFilled] = useState(product.is_liked);
    const [likeCount, setLikeCount] = useState(product.likes_count); 
    // const totalPrice = (product.price * quantity).toFixed(2);
    const [isHovered, setIsHovered] = useState(false);

    // Handle liking
    const handleLikeClick = async (e) => {
        e.preventDefault();
        try {
            await Inertia.post(`/products/${product.id}/like`, {
                _method: 'POST',
                preserveScroll: true, 
                preserveState: true, 
            });
            setIsFilled((prev) => !prev);
            setLikeCount((prev) => isFilled ? prev - 1 : prev + 1); 
        } catch (error) {
            console.error('Error liking product:', error);
        }
    };
    return (
        <div className={isModal ? "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" : "w-full"}>
            <div className={`${isModal ? 'sm:w-2/5 w-full' : 'w-full p-4'} bg-white rounded-lg shadow-md relative`}>
                {isModal && (
                    <button className="absolute top-0 right-0 text-red-600 bg-violet-300 p-2 rounded-bl-[25px]" onClick={closeModal}>
                        <IoMdClose size={34} />
                    </button>
                )}
                <div className="w-full h-80 overflow-hidden rounded">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col w-full p-4">
                    <h2 className="text-3xl font-semibold mb-2">{product.name}</h2>
                    <p className="text-lg mb-4">{product.price} €</p>
                </div>
                {auth?.id ? (
                    <div className="flex items-center justify-between w-full p-6">
                        <button onClick={handleLikeClick} className="flex items-center">
                            {isFilled ? (
                                <FaHeart className="text-red-600 text-2xl" />
                            ) : (
                                <FaRegHeart className="text-gray-600 text-2xl" />
                            )}
                            <span className="text-lg ml-2">{likeCount}</span>
                        </button>
                    </div>
                ) : (
                    <Link href="/login" className="p-4 bg-blue-500 text-white rounded-lg text-center">
                        Pieslēgties
                    </Link>
                )}
            </div>
        </div>
    );
}
