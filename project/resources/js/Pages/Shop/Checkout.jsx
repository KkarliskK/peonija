import React, { useEffect, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Checkbox from '@/Components/Buttons/Checkbox';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios'; 
import Cookies from 'js-cookie';

export default function Checkout({ auth, guestUserData = {} }) {
    const [cartItems, setCartItems] = useState([]);
    const [stripeKey, setStripeKey] = useState(null);
    const [error, setError] = useState('');
    const [isFirstPurchase, setIsFirstPurchase] = useState(false);
    const [errors, setErrors] = useState({});
    const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
    const { data, setData } = useForm({
        name: auth.user?.name || guestUserData.name || '',
        email: auth.user?.email || guestUserData.email || '',
        mobile: auth.user?.phone_number || guestUserData.mobile || '',
        address: '',
        paymentMethod: 'stripe',
        accept: false,
    });

    const [deliveryOption, setDeliveryOption] = useState('delivery');
    const storeAddress = "Uzvaras Bulvāris 1B";

    const validateName = (name) => {
        return name.trim().length > 0 ? '' : 'Lūdzu, ievadiet savu vārdu';
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) return 'Lūdzu, ievadiet savu e-pastu';
        return emailRegex.test(email) ? '' : 'Lūdzu, ievadiet derīgu e-pasta adresi';
    };

    const validateMobile = (mobile) => {
        const mobileRegex = /^[0-9+]{8,}$/;
        if (!mobile.trim()) return 'Lūdzu, ievadiet savu telefona numuru';
        return mobileRegex.test(mobile.replace(/[^\d+]/g, '')) ? '' : 'Lūdzu, ievadiet derīgu telefona numuru';
    };

    const validateAddress = (address) => {
        if (deliveryOption === 'pickup') return '';
        return address.trim().length > 0 ? '' : 'Lūdzu norādiet piegādes adresi!';
    };

    const validateTerms = (accept) => {
        return accept ? '' : 'Lūdzu, piekrītiet lietošanas noteikumiem pirms turpinat!';
    };

    const validateForm = () => {
        const newErrors = {
            name: validateName(data.name),
            email: validateEmail(data.email),
            mobile: validateMobile(data.mobile),
            address: validateAddress(data.address),
            accept: validateTerms(data.accept)
        };
        
        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error);
    };

    const handleInputChange = (field, value) => {
        setData(field, value);
        
        if (hasAttemptedSubmit) {
            if (field === 'name') {
                setErrors(prev => ({ ...prev, name: validateName(value) }));
            } else if (field === 'email') {
                setErrors(prev => ({ ...prev, email: validateEmail(value) }));
            } else if (field === 'mobile') {
                setErrors(prev => ({ ...prev, mobile: validateMobile(value) }));
            } else if (field === 'address') {
                setErrors(prev => ({ ...prev, address: validateAddress(value) }));
            } else if (field === 'accept') {
                setErrors(prev => ({ ...prev, accept: validateTerms(value) }));
            }
        }
    };

    const parsePrice = (priceString) => {
        if (!priceString) return 0;
        const numericPrice = priceString.replace(/[^0-9.-]/g, '');
        return parseFloat(numericPrice) || 0;
    };

    const getCartFromCookie = () => {
        try {
            const cartCookie = Cookies.get('guest_cart');
            
            if (cartCookie) {
                const parsedCart = JSON.parse(cartCookie);
                
                return parsedCart.map(item => ({
                    ...item,
                    price: parsePrice(item.price)
                }));
            }
            return [];
        } catch (error) {
            console.error('Comprehensive cart cookie parsing error:', {
                error: error,
                cookieContent: Cookies.get('guest_cart')
            });
            return [];
        }
    };

    useEffect(() => {
        const cartFromCookie = getCartFromCookie();
        setCartItems(cartFromCookie);

        if (auth.user) {
            const fetchFirstPurchaseStatus = async () => {
                try {
                    const response = await axios.get('/check-first-purchase');
                    setIsFirstPurchase(response.data.isFirstPurchase);
                } catch (error) {
                    console.error('Error checking first purchase:', error);
                }
            };

            fetchFirstPurchaseStatus();
        } else {
            setIsFirstPurchase(false);
        }
    }, [auth.user]);

    useEffect(() => {
        const fetchStripeKey = async () => {
            try {
                const response = await axios.get('/config');
                setStripeKey(response.data.stripe_key);
            } catch (error) {
                console.error('Error fetching Stripe key:', error);
            }
        };

        fetchStripeKey();
    }, []);

    const calculateTotal = () => {
        const subtotal = cartItems.reduce((total, item) => {
            return total + (item.price || 0) * (item.quantity || 0);
        }, 0);

        const total = isFirstPurchase ? subtotal * 0.9 : subtotal;
        
        return total + (deliveryOption === 'pickup' ? 0 : 2.99);
    };

    const totalAmount = cartItems.reduce((total, item) => {
        return total + (item.price || 0) * (item.quantity || 0);
    }, 0);

    const sanitizeString = (str) => {
        return str.normalize('NFD')  // Decompose combined characters
                    .replace(/[^\x00-\x7F]/g, '') // Remove non-ASCII characters
                    .replace(/[\u0300-\u036f]/g, ''); // Remove diacritical marks
    };

    const sanitizeCartItem = (item) => {
        return {
            ...item,
            name: sanitizeString(item.name || ''),
            price: parseFloat(item.price || '0').toFixed(2),
            quantity: Math.max(1, parseInt(item.quantity || '1', 10))
        };
    };

    const handleCheckout = async (e) => {
        e.preventDefault();
        setHasAttemptedSubmit(true);
        
        if (!validateForm()) {
            return;
        }

        if (cartItems.length === 0) {
            setError('Jūsu grozs ir tukšs!');
            return;
        }

        try {
            const sanitizedCartItems = cartItems.map(sanitizeCartItem);

            const cartCookie = encodeURIComponent(
                JSON.stringify(sanitizedCartItems)
            );

            const subtotal = cartItems.reduce((total, item) => {
                return total + (item.price || 0) * (item.quantity || 0);
            }, 0);

            const discountAmount = isFirstPurchase ? subtotal * 0.1 : 0;

            const deliveryFee = deliveryOption === 'pickup' ? 0 : 2.99;

            const checkoutData = {
                name: sanitizeString(data.name),
                email: data.email.toLowerCase().trim(),
                mobile: data.mobile.replace(/[^\d+]/g, ''),
                address: deliveryOption === 'pickup' ? storeAddress : sanitizeString(data.address),
                deliveryOption: deliveryOption,
                isFirstPurchase: isFirstPurchase,
                discount: discountAmount, 
                deliveryFee: deliveryFee, 
                totalAmount: calculateTotal() 
            };

            const response = await axios.post('/checkout/create-session', 
                checkoutData,
                {
                    headers: {
                        'X-Cart-Cookie': cartCookie,
                        'Content-Type': 'application/json',
                    }
                }
            );

            const stripe = await loadStripe(stripeKey);

            const { sessionId } = response.data;
            const { error } = await stripe.redirectToCheckout({
                sessionId: sessionId
            });

            if (error) {
                setError('Diemžēl neizdevās apstrādāt pirkumu');
                console.error('Stripe Checkout Error:', error);
            }

        } catch (error) {
            console.error('Checkout Error:', error.response?.data || error.message);
            setError(error.response?.data?.error || 'Pirkuma apstrāde neizdevās');
        }
    };

    return (
        <>
            <Head title="Checkout" />
            <AuthenticatedLayout auth={auth}>
                <div className="px-4 py-8 min-h-dvh dark:bg-gray-900">
                    <div className="max-w-6xl mx-auto">
                        <h1 className="mb-8 text-3xl font-bold text-center text-gray-800 dark:text-gray-200">Pirkuma veikšana</h1>
                        
                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Checkout form */}
                            <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:text-gray-200">
                                <h2 className="pb-2 mb-6 text-xl font-semibold border-b border-gray-200">Jūsu informācija</h2>
                                
                                <form onSubmit={handleCheckout} className="space-y-4">
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div>
                                            <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Pilnais vārds</label>
                                            <input
                                                placeholder="Piem. Jānis Paraudziņš"
                                                type="text"
                                                id="name"
                                                value={data.name}
                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                                className={`w-full text-black border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:border-accent focus:ring-accent dark:bg-gray-800 dark:text-white`}
                                            />
                                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">E-pasts</label>
                                            <input
                                                placeholder="Piem. janisparaudzins@gmail.com"
                                                type="email"
                                                id="email"
                                                value={data.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                className={`w-full text-black border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:border-accent focus:ring-accent dark:bg-gray-800 dark:text-white`}
                                            />
                                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="mobile" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Telefona numurs</label>
                                        <input
                                            placeholder="Piem. 22345678"
                                            type="tel"
                                            id="mobile"
                                            value={data.mobile}
                                            onChange={(e) => handleInputChange('mobile', e.target.value)}
                                            className={`w-full text-black border ${errors.mobile ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:border-accent focus:ring-accent dark:bg-gray-800 dark:text-white`}
                                        />
                                        {errors.mobile && <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="deliveryOption" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Pasūtīšanas veids</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setDeliveryOption('delivery')}
                                                className={`py-3 px-4 border rounded-md flex items-center justify-center transition ${
                                                    deliveryOption === 'delivery'
                                                        ? 'bg-accent-50 border-primary-pink text-accent '
                                                        : 'border-gray-300 text-gray-700 hover:bg-gray-50 dark:text-gray-200'
                                                }`}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                                </svg>
                                                Piegāde
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setDeliveryOption('pickup')}
                                                className={`py-3 px-4 border rounded-md flex items-center justify-center transition ${
                                                    deliveryOption === 'pickup'
                                                        ? 'bg-accent-50 border-primary-pink text-accent'
                                                        : 'border-gray-300 text-gray-700 hover:bg-gray-50 dark:text-gray-200'
                                                }`}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                Saņemt veikalā
                                            </button>
                                        </div>
                                    </div>

                                    {deliveryOption === 'delivery' && (
                                        <div className="mt-4">
                                            <label htmlFor="address" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Piegādes adrese</label>
                                            <textarea
                                                placeholder="Adrese kurā piegādāt pasūtījumu"
                                                id="address"
                                                rows="3"
                                                value={data.address}
                                                onChange={(e) => handleInputChange('address', e.target.value)}
                                                className={`w-full text-black border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:border-accent focus:ring-accent dark:bg-gray-800 dark:text-white`}
                                            />
                                            {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                                        </div>
                                    )}

                                    {deliveryOption === 'pickup' && (
                                        <div className="p-4 mt-4 border border-gray-200 rounded-md bg-gray-50 dark:bg-gray-800">
                                            <div className="flex items-start">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-200 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Veikala adrese:</p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-200">{storeAddress}</p>
                                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-200">Darba laiks: Pirmdiena - Piektdiena, 9:00 - 18:00</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="mt-6">
                                        <h3 className="mb-4 text-lg font-medium">Maksājuma metode</h3>
                                        <div className="flex items-center p-4 border border-gray-200 rounded-md bg-gray-50 dark:bg-gray-800">
                                            <svg className="w-8 h-8 text-blue-500" viewBox="0 0 24 24" fill="none">
                                                <path d="M4 10C4 8.89543 4.89543 8 6 8H18C19.1046 8 20 8.89543 20 10V16C20 17.1046 19.1046 18 18 18H6C4.89543 18 4 17.1046 4 16V10Z" stroke="currentColor" strokeWidth="2" />
                                                <path d="M4 12H20" stroke="currentColor" strokeWidth="2" />
                                            </svg>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-900 dark:text-gray-200">Maksāt ar karti (Stripe)</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-200">Drošs maksājums ar Stripe</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4 mt-6 border-t border-gray-200">
                                        <label className="flex items-start">
                                            <Checkbox
                                                name="accept"
                                                checked={data.accept}
                                                onChange={(e) => handleInputChange('accept', e.target.checked)}
                                                className={`mt-0.5 ${errors.accept ? 'border-red-500' : ''}`}
                                            />
                                            <span className="ml-2 text-sm text-gray-600 dark:text-gray-200">
                                                Iepazinos un piekrītu <a className="text-blue-600 hover:underline" href="/private-rules">lietošanas noteikumiem</a> un <a className="text-blue-600 hover:underline" href="#">privātuma politikai</a>.
                                            </span>
                                        </label>
                                        {errors.accept && <p className="mt-1 text-sm text-red-600">{errors.accept}</p>}
                                    </div>

                                    {error && (
                                        <div className="p-3 text-sm text-red-700 border border-red-200 rounded-md bg-red-50">
                                            {error}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        className="w-full px-4 py-3 mt-6 font-medium text-white transition-all rounded-md shadow-sm bg-primary-pink hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent"
                                    >
                                        Pabeigt pasūtījumu
                                    </button>
                                </form>
                            </div>

                            {/* Right column - Order summary */}
                            <div>
                                <div className="sticky p-6 bg-white rounded-lg shadow-md top-6 dark:bg-gray-800 dark:text-gray-200">
                                    <h2 className="pb-2 mb-6 text-xl font-semibold border-b border-gray-200 dark:text-gray-200">Pasūtījuma kopsavilkums</h2>
                                    
                                    {cartItems.length > 0 ? (
                                        <div className="space-y-4">
                                            <div className="pr-2 overflow-y-auto max-h-64">
                                                {cartItems.map((item) => (
                                                    <div key={item.id} className="flex items-center py-3 border-b border-gray-100">
                                                        <div className="flex items-center justify-center w-16 h-16 mr-4 bg-gray-100 rounded">
                                                            <img 
                                                                src={item.image} 
                                                                alt={item.name} 
                                                                className="object-cover w-full h-full"
                                                            />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="text-sm font-medium">{item.name || 'Unnamed Product'}</h3>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">Skaits: {item.quantity || 0}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-sm font-medium">€{((item.price || 0) * (item.quantity || 0)).toFixed(2)}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="pt-2 space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600 dark:text-gray-200">Preces kopā</span>
                                                    <span>€{totalAmount.toFixed(2)}</span>
                                                </div>
                                                {isFirstPurchase && (
                                                    <div className="flex justify-between text-sm text-green-600">
                                                        <span>Atlaide (10%)</span>
                                                        <span>-€{(totalAmount * 0.1).toFixed(2)}</span>
                                                    </div>
                                                )}
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600 dark:text-gray-200">Piegāde</span>
                                                    <span>{deliveryOption === 'pickup' ? 'Bezmaksas' : '€2.99'}</span>
                                                </div>
                                                <div className="pt-2 mt-2 border-t border-gray-200">
                                                    <div className="flex justify-between">
                                                        <span className="text-base font-medium">Kopā</span>
                                                        <span className="text-base font-medium">
                                                            €{calculateTotal().toFixed(2)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="py-8 text-center">
                                            <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                            </svg>
                                            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-200">Tukšs grozs</h3>
                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">Jums nav nevienas preces pievienotas grozam.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}