import { FaShoppingCart } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import Cookies from 'js-cookie';

const CartIcon = ({ auth }) => {
    const [itemCount, setItemCount] = useState(0);
    const [cart, setCart] = useState([]);
    const [isHovered, setIsHovered] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const MAX_DISPLAY_ITEMS = 4; // Limit display to 4 items

    const getCartFromCookie = () => {
        const guestCart = Cookies.get('guest_cart');
        return guestCart ? JSON.parse(guestCart) : [];
    };

    const updateCartInCookie = (updatedCart) => {
        Cookies.set('guest_cart', JSON.stringify(updatedCart), { 
            expires: 7,
            path: '/' 
        });

        window.dispatchEvent(new CustomEvent('cartUpdated', { 
            detail: { cart: updatedCart } 
        }));
    };

    useEffect(() => {
        const guestCart = getCartFromCookie();
        setCart(guestCart);
        setItemCount(guestCart.length);
        setIsLoading(false);

        const handleCartUpdate = (e) => {
            if (e.detail && e.detail.cart) {
                setCart(e.detail.cart);
                setItemCount(e.detail.cart.length);
            }
        };

        window.addEventListener('cartUpdated', handleCartUpdate);
        return () => window.removeEventListener('cartUpdated', handleCartUpdate);
    }, []);

    const totalPrice = cart.reduce((total, item) => {
        const price = typeof item.price === 'string' 
            ? parseFloat(item.price.replace(/[^0-9.-]+/g, '')) 
            : parseFloat(item.price) || 0;
        const quantity = parseInt(item.quantity, 10) || 0;
        return total + price * quantity;
    }, 0).toFixed(2);

    const displayedItems = cart.slice(0, MAX_DISPLAY_ITEMS);
    const additionalItemsCount = Math.max(0, cart.length - MAX_DISPLAY_ITEMS);

    return (
        <div
            className="relative group" 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href="/cart" className="relative">
                <FaShoppingCart size={24} className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white" />
                {itemCount > 0 && (
                    <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-2 -right-2">
                        {itemCount}
                    </span>
                )}
            </Link>

            {isHovered && (
                <div className="absolute right-0 z-50 p-4 bg-white border rounded-lg shadow-lg top-12 w-72 dark:bg-gray-800 dark:text-white group-hover:block">
                    <h4 className="text-lg font-semibold">Jūsu grozs</h4>
                    {isLoading ? (
                        <p className="py-2 text-center">Ielādē...</p>
                    ) : (
                        <div className="mt-2 space-y-2">
                            {cart.length === 0 ? (
                                <p>Jūsu grozs ir tukšs.</p>
                            ) : (
                                <>
                                    {displayedItems.map((item, index) => (
                                        <div key={index} className="flex justify-between">
                                            <div className="flex items-center">
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name} 
                                                    className="object-cover w-12 h-12 mr-2" 
                                                />
                                                <span className="max-w-[100px] truncate">{item.name}</span>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span>Daudzums: {item.quantity}</span>
                                                <span>
                                                    {typeof item.price === 'string' && item.price.includes('€')
                                                        ? `${(parseFloat(item.price.replace(/[^0-9.-]+/g, '')) * item.quantity).toFixed(2)} €`
                                                        : `${(parseFloat(item.price) * item.quantity).toFixed(2)} €`}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                    {additionalItemsCount > 0 && (
                                        <div className="mt-2 text-sm text-center text-gray-500">
                                            + {additionalItemsCount} papildu prece{additionalItemsCount > 1 ? 's' : ''}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                    <div className="flex justify-between mt-4">
                        <span className="font-semibold">Kopā:</span>
                        <span className="text-xl">{totalPrice} €</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartIcon;