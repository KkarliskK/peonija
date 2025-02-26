import { FaShoppingCart } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import axios from 'axios';

const CartIcon = ({ auth }) => {
    const [itemCount, setItemCount] = useState(0);
    const [cart, setCart] = useState([]);
    const [isHovered, setIsHovered] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCartData = async () => {
            if (auth && auth.user) {
                try {
                    // For logged-in users, fetch cart from database
                    const response = await axios.get('/cart');
                    
                    if (response.data && response.data.cartItems) {
                        const formattedCartItems = response.data.cartItems.map(item => ({
                            id: item.id,
                            name: item.product.name,
                            price: item.product.price,
                            quantity: item.quantity,
                            image: item.product.image,
                            product_id: item.product_id
                        }));
                        
                        setCart(formattedCartItems);
                        setItemCount(formattedCartItems.length);
                        localStorage.setItem('userCart', JSON.stringify(formattedCartItems));
                    } else {
                        // If no items in the database cart, check localStorage as fallback
                        const userCart = JSON.parse(localStorage.getItem('userCart') || '[]');
                        setCart(userCart);
                        setItemCount(userCart.length);
                    }
                } catch (error) {
                    console.error('Error fetching cart data:', error);
                    
                    // Fallback to localStorage if API fails
                    const userCart = JSON.parse(localStorage.getItem('userCart') || '[]');
                    setCart(userCart);
                    setItemCount(userCart.length);
                } finally {
                    setIsLoading(false);
                }
            } else {
                // For guest users, get cart from localStorage
                const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
                setCart(guestCart);
                setItemCount(guestCart.length);
                setIsLoading(false);
            }
        };

        fetchCartData();

        // Update cart when a cart update event is triggered
        const handleCartUpdate = (e) => {
            if (e.detail && e.detail.cart) {
                setCart(e.detail.cart);
                setItemCount(e.detail.cart.length);
            } else {
                fetchCartData();
            }
        };

        window.addEventListener('cartUpdated', handleCartUpdate);
        return () => window.removeEventListener('cartUpdated', handleCartUpdate);
    }, [auth]);

    const totalPrice = cart.reduce((total, item) => {
        const price = typeof item.price === 'string' 
            ? parseFloat(item.price.replace(/[^0-9.-]+/g, '')) 
            : parseFloat(item.price) || 0;
        const quantity = parseInt(item.quantity, 10) || 0;
        return total + price * quantity;
    }, 0).toFixed(2);

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

            {/* Hover POPUP */}
            {isHovered && (
                <div className="absolute right-0 p-4 bg-white border rounded-lg shadow-lg top-12 w-72 dark:bg-gray-800 dark:text-white group-hover:block">
                    <h4 className="text-lg font-semibold">Jūsu grozs</h4>
                    {isLoading ? (
                        <p className="py-2 text-center">Ielādē...</p>
                    ) : (
                        <div className="mt-2 space-y-2">
                            {cart.length === 0 ? (
                                <p>Jūsu grozs ir tukšs.</p>
                            ) : (
                                cart.map((item, index) => (
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
                                ))
                            )}
                        </div>
                    )}
                    <div className="flex justify-between mt-4">
                        <span className="font-semibold">Kopā:</span>
                        <span className="text-xl">{totalPrice} €</span>
                    </div>
                    <div className="mt-4">
                        <Link 
                            href="/cart" 
                            className="block w-full py-2 text-center text-white rounded bg-violet-600 hover:bg-violet-700"
                        >
                            Skatīt grozu
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartIcon;