import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { MdEdit } from "react-icons/md";
import { IoTrashOutline } from 'react-icons/io5';
import Modal from '@/Components/Modals/CartProductModal';
import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import DangerButton from '@/Components/Buttons/DangerButton';

const CartPage = ({ auth, cartItems }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleOpenModal = (item) => {
        setSelectedItem({
            ...item,
            availableQuantity: item.product.quantity 
            
        });
        console.log(item.product.quantity);
        setIsModalOpen(true);
    };
    

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    const handleUpdateQuantity = (id, newQuantity) => {
        console.log(`Updating Item ID: ${id}, New Quantity: ${newQuantity}`);
        Inertia.post(`/cart/update/${id}`, { quantity: newQuantity }, {
            onSuccess: () => {
                console.log(`Quantity for item ${id} updated to ${newQuantity}`);
            },
            onError: (error) => {
                console.error("Failed to update quantity:", error);
            }
        });
    };

    const handleDeleteItem = (item) => {
        const confirmDelete = window.confirm(`Vai tiešām vēlaties dzēst "${item.product.name}" no groza?`);
        if (confirmDelete) {
            Inertia.post(`/cart/remove/${item.id}`, {
                onSuccess: () => {
                    console.log(`Item ${item.product.name} deleted from cart.`);
                },
                onError: (error) => {
                    console.error("Failed to delete item:", error);
                }
            });
        }
    };

    const handleClearCart = () => {
        const confirmClear = window.confirm("Vai tiešām vēlaties iztukšot grozu?");
    
        if (confirmClear) {
            Inertia.post('/cart/clear', {}, {
                onSuccess: () => {
                    console.log('Cart cleared successfully');
                },
                onError: (error) => {
                    console.error("Failed to clear cart:", error);
                }
            });
        }
    };

    return (
        <>
            <Head title="Tavs Grozs" />
            <AuthenticatedLayout auth={auth}>
                {/* Cart Items List */}
                <div className="w-full p-4 h-auto min-h-[50dvh]">
                    {cartItems.length > 0 ? (
                        <div className="flex flex-col">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex justify-between items-center rounded-md sm:h-24 h-28 bg-white sm:p-4 p-2 border-2 border-gray-200 dark:bg-gray-700 w-full">
                                    {/* Image Container */}
                                    <div className='w-20 h-20 relative block'>
                                        <img src={item.product.image} alt={item.product.name} className='h-full w-full rounded-md object-cover' />
                                    </div>
                                    {/* Product Name */}
                                    <div className='flex justify-start items-center w-2/5'>
                                        <h4 className="font-semibold text-lg">{item.product.name}</h4>
                                    </div>
                                    <div className='w-auto flex'>
                                        <p className=''>Skaits grozā: {item.quantity}</p>
                                    </div>
                                    {/* Remove from Cart Button */}
                                    <div className='flex sm:flex-row flex-col justify-center items-center'>
                                        <button
                                            onClick={() => handleDeleteItem(item)} 
                                            className='flex items-center'
                                        >
                                            <IoTrashOutline className="flex items-center text-red-500 hover:text-red-700" size={24} />
                                        </button>
                                        <button onClick={() => handleOpenModal(item)}>
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
                <div className='flex justify-center items-center'>
                    <Link className="mx-4" href='checkout'>
                        <PrimaryButton>Turpināt pasūtījumu</PrimaryButton>
                    </Link>
                    <DangerButton className='mx-4' onClick={handleClearCart}>Iztukšot grozu</DangerButton>
                    </div>

                {/* Modal for Deleting Item and Editing Quantity */}
                {isModalOpen && selectedItem && (
                    <Modal
                        product={selectedItem.product} 
                        closeModal={handleCloseModal}
                        updateQuantity={handleUpdateQuantity} 
                        quantity={selectedItem.quantity} 
                    />
                )}
            </AuthenticatedLayout>
        </>
    );
};

export default CartPage;
