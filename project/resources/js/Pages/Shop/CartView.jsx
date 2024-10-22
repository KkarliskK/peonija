import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { MdEdit } from "react-icons/md";
import { IoTrashOutline } from 'react-icons/io5';
import Modal from '@/Components/Modals/CartProductModal'; 

const CartPage = ({ cartItems, handleRemoveFromCart, handleUpdateCart }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleOpenModal = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    const handleDelete = () => {
        if (selectedItem) {
            handleRemoveFromCart(selectedItem.id);
            handleCloseModal();
        }
    };

    const handleUpdateQuantity = (id, newQuantity) => {
        // Call the provided handler to update the cart item quantity
        handleUpdateCart(id, newQuantity);
        handleCloseModal(); // Close modal after updating
    };

    return (
        <>
            <Head title="Tavs Grozs" />
            <AuthenticatedLayout>
                {/* Cart Items List */}
                <div className="w-full p-4 h-auto min-h-[50dvh]">
                    {cartItems.length > 0 ? (
                        <div className="flex flex-col">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex justify-between items-center rounded-md h-24 bg-white p-4 border-2 border-gray-200 dark:bg-gray-700 w-full">
                                    {/* Image Container */}
                                    <div className='w-20 h-20 relative block'>
                                        <img src={item.product.image} alt={item.product.name} className='h-full w-full rounded-md object-cover' />
                                    </div>
                                    {/* Product Name */}
                                    <div className='flex justify-start items-center w-2/5'>
                                        <h4 className="font-semibold text-lg">{item.product.name}</h4>
                                    </div>
                                    <div className='w-auto flex'>
                                        <p className='mx-2'>Skaits grozā:</p>
                                        <p>{item.quantity}</p>
                                    </div>
                                    {/* Remove from Cart Button */}
                                    <div className='flex justify-center items-center'>
                                        <button
                                            onClick={() => handleOpenModal(item)} 
                                            className='flex items-center'
                                        >
                                            <IoTrashOutline className="flex items-center text-red-500 hover:text-red-700" size={24} />
                                            <MdEdit size={24} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-lg font-semibold">Jūsu iepirkuma grozs ir tukšs.</p>
                    )}
                </div>
                <div>
                    <Link href='checkout'>Continue</Link>
                </div>

                {/* Modal for Deleting Item and Editing Quantity */}
                {isModalOpen && selectedItem && (
                    <Modal
                        product={selectedItem.product} 
                        closeModal={handleCloseModal}
                        removeFromCart={handleDelete}
                        updateQuantity={handleUpdateQuantity} 
                        quantity={selectedItem.quantity} 
                    />
                )}
            </AuthenticatedLayout>
        </>
    );
};

export default CartPage;
