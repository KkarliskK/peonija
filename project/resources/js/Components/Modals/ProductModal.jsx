import { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Inertia } from '@inertiajs/inertia';

export default function ProductModal({ product, closeModal, addToCart }) {
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isFilled, setIsFilled] = useState(product.is_liked);
    const [likeCount, setLikeCount] = useState(product.likes_count);
    const totalPrice = (product.price * quantity).toFixed(2);

   const handleQuantityChange = (value) => {
        if (value === "") {
            setQuantity(value); 
            return;
        }

        const newQuantity = parseInt(value, 10);
        if (!isNaN(newQuantity) && newQuantity >= 1 && newQuantity <= product.quantity) {
            setQuantity(newQuantity);
        }
    };

    const handleLikeClick = async (e) => {
        e.preventDefault();
        try {
            await Inertia.post(`/products/${product.id}/like`, {
                _method: 'POST',
                preserveScroll: true,
                preserveState: true,
            });
            setIsFilled(prev => !prev);
            setLikeCount(prev => isFilled ? prev - 1 : prev + 1);
        } catch (error) {
            console.error('Error liking product:', error);
        }
    };

    const handleAddToCart = async () => {
        if (!quantity || quantity < 1) {
            setQuantity(1); 
            return;
        }

        setLoading(true);
        try {
            if (product) {
                await addToCart(product, quantity);
                closeModal();
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/25 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl overflow-hidden bg-white shadow-xl rounded-2xl">
                <div className="absolute z-10 top-4 right-4">
                    <button 
                        onClick={closeModal}
                        className="p-2 transition-colors duration-200 rounded-full bg-white/80 hover:bg-white"
                    >
                        <IoMdClose size={24} className="text-gray-700" />
                    </button>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="relative h-[300px] md:h-[400px] overflow-hidden">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="absolute inset-0 object-cover w-full h-full"
                        />
                    </div>
                    <div className="flex flex-col p-6 md:pr-8">
                        <div className="flex items-start justify-between mb-4">
                            <h2 className="text-2xl font-semibold text-gray-900">{product.name}</h2>
                            <button 
                                onClick={handleLikeClick}
                                className="flex items-center gap-2 text-gray-500 transition-colors duration-200 hover:text-red-500"
                            >
                                {isFilled ? (
                                    <FaHeart className="text-red-500" size={20} />
                                ) : (
                                    <FaRegHeart size={20} />
                                )}
                                <span className="text-sm font-medium">{likeCount}</span>
                            </button>
                        </div>

                        <div className="flex-grow space-y-4">
                            <p className="text-2xl font-semibold text-gray-900">
                                {product.price} €
                            </p>
                            <p className="text-sm text-gray-600">
                                Piedāvājumā: {product.quantity} vienības
                            </p>
                        </div>

                        <div className="mt-6 space-y-4">
                            <div className="flex items-center gap-3">
                                <label className="text-sm font-medium text-gray-700">Daudzums:</label>
                                <div className="flex items-center">
                                    <input
                                        type="number"
                                        min="1"
                                        max={product.quantity}
                                        value={quantity}
                                        onChange={(e) => handleQuantityChange(e.target.value)}
                                        onBlur={() => {
                                            if (!quantity || quantity < 1) {
                                                setQuantity(1); 
                                            }
                                        }}
                                        className="w-16 px-3 py-2 text-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                disabled={loading}
                                className="w-full px-6 py-3 text-white transition-colors duration-200 bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    'Pievieno...'
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