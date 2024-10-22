import { useState, useEffect } from 'react';
import { IoMdClose, IoMdRemove, IoMdAdd } from "react-icons/io";
import { Inertia } from '@inertiajs/inertia'; // Import Inertia for navigation
import BuyButton from '@/Components/Buttons/BuyButton';

export default function CartProductModal({ product, closeModal, quantity, removeFromCart, updateQuantity }) {
    const [loading, setLoading] = useState(false);
    const [quantityState, setQuantity] = useState(quantity || 1); // Initialize quantity with the passed quantity prop

    useEffect(() => {
        setQuantity(quantity); // Update quantity state when the quantity prop changes
    }, [quantity]);

    const handleDeleteFromCart = async () => {
        setLoading(true);
        try {
            await Inertia.delete(`/cart/${product.id}`); // Use Inertia to delete the cart item
            removeFromCart(); // Call the delete handler passed from the parent
            closeModal(); // Close the modal after deletion
        } catch (error) {
            console.error("Error deleting from cart:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleQuantityChange = (change) => {
        setQuantity((prev) => Math.max(1, prev + change)); // Ensure quantity does not go below 1
    };
    
    const handleSaveQuantity = async () => {
        setLoading(true);
        console.log("Preparing to update quantity...");
        console.log("Product ID:", product.id);
        console.log("New Quantity:", quantityState);
    
        try {
            await Inertia.post(`/cart/update/${product.id}`, { quantity: quantityState });
            closeModal(); // Close the modal after a successful update
        } catch (error) {
            console.error("Error saving quantity:", error);
        } finally {
            setLoading(false);
        }
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
                    <BuyButton 
                        className={`text-white p-4 mx-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
                        onClick={handleDeleteFromCart}
                        disabled={loading} 
                    >
                        {loading ? 'Dzēš...' : 'Dzēst no groza'}
                    </BuyButton>
                </div>
            </div>
        </div>
    );
}
