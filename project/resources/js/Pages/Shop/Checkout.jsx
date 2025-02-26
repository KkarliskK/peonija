import React, { useEffect, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Checkbox from '@/Components/Buttons/Checkbox';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

export default function Checkout({ auth, cartItems = [], guestUserData = {} }) {
    const [stripeKey, setStripeKey] = useState(null);
    const [error, setError] = useState('');
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

    const handleCheckout = async (e) => {
        e.preventDefault();

        setError('');
        if (!data.accept) {
            setError('Jums jāpiekrīt lietošanas noteikumiem un privātuma politikai, lai turpinātu.');
            return;
        }

        if (deliveryOption === 'delivery' && !data.address) {
            setError('Piegādes adrese ir obligāta, ja izvēlēts piegādes veids.');
            return;
        }

        if (!stripeKey) {
            console.error('Stripe key is not set');
            return;
        }

        try {
            const response = await axios.post('/checkout/create-session', {
                cartItems: cartItems,
                name: data.name,
                email: data.email,
                mobile: data.mobile,
                address: deliveryOption === 'delivery' ? data.address : storeAddress,
            });

            const { sessionId } = response.data;
            const stripe = await loadStripe(stripeKey);
            await stripe.redirectToCheckout({ sessionId });
        } catch (error) {
            console.error('Error creating checkout session:', error);
            setError('Notika kļūda. Lūdzu, pārbaudiet ievadi un mēģiniet vēlreiz.');
        }
    };

    const totalAmount = cartItems.reduce((total, item) => {
        return total + (item.product?.price || 0) * (item.quantity || 0);
    }, 0);

    return (
        <>
            <Head title="Checkout" />
            <AuthenticatedLayout auth={auth}>
                <div className="px-4 py-8 min-h-dvh bg-gradient-to-b from-gray-50 to-gray-100">
                    <div className="max-w-6xl mx-auto">
                        <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">Pirkuma veikšana</h1>
                        
                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Left column - Checkout form */}
                            <div className="p-6 bg-white rounded-lg shadow-md">
                                <h2 className="pb-2 mb-6 text-xl font-semibold border-b border-gray-200">Jūsu informācija</h2>
                                
                                <form onSubmit={handleCheckout} className="space-y-4">
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div>
                                            <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">Pilnais vārds</label>
                                            <input
                                                type="text"
                                                id="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-accent focus:ring-accent"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">E-pasts</label>
                                            <input
                                                type="email"
                                                id="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-accent focus:ring-accent"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="mobile" className="block mb-1 text-sm font-medium text-gray-700">Telefona numurs</label>
                                        <input
                                            type="tel"
                                            id="mobile"
                                            value={data.mobile}
                                            onChange={(e) => setData('mobile', e.target.value)}
                                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-accent focus:ring-accent"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="deliveryOption" className="block mb-1 text-sm font-medium text-gray-700">Pasūtīšanas veids</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setDeliveryOption('delivery')}
                                                className={`py-3 px-4 border rounded-md flex items-center justify-center transition ${
                                                    deliveryOption === 'delivery'
                                                        ? 'bg-accent-50 border-primary-pink text-accent'
                                                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
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
                                                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
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
                                            <label htmlFor="address" className="block mb-1 text-sm font-medium text-gray-700">Piegādes adrese</label>
                                            <textarea
                                                id="address"
                                                rows="3"
                                                value={data.address}
                                                onChange={(e) => setData('address', e.target.value)}
                                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-accent focus:ring-accent"
                                                required
                                            />
                                        </div>
                                    )}

                                    {deliveryOption === 'pickup' && (
                                        <div className="p-4 mt-4 border border-gray-200 rounded-md bg-gray-50">
                                            <div className="flex items-start">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-700">Veikala adrese:</p>
                                                    <p className="text-sm text-gray-600">{storeAddress}</p>
                                                    <p className="mt-1 text-xs text-gray-500">Darba laiks: Pirmdiena - Piektdiena, 9:00 - 18:00</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="mt-6">
                                        <h3 className="mb-4 text-lg font-medium">Maksājuma metode</h3>
                                        <div className="flex items-center p-4 border border-gray-200 rounded-md bg-gray-50">
                                            <svg className="w-8 h-8 text-blue-500" viewBox="0 0 24 24" fill="none">
                                                <path d="M4 10C4 8.89543 4.89543 8 6 8H18C19.1046 8 20 8.89543 20 10V16C20 17.1046 19.1046 18 18 18H6C4.89543 18 4 17.1046 4 16V10Z" stroke="currentColor" strokeWidth="2" />
                                                <path d="M4 12H20" stroke="currentColor" strokeWidth="2" />
                                            </svg>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-900">Maksāt ar karti (Stripe)</p>
                                                <p className="text-xs text-gray-500">Drošs maksājums ar Stripe</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4 mt-6 border-t border-gray-200">
                                        <label className="flex items-start">
                                            <Checkbox
                                                name="accept"
                                                checked={data.accept}
                                                onChange={(e) => setData('accept', e.target.checked)}
                                                className="mt-0.5"
                                            />
                                            <span className="ml-2 text-sm text-gray-600">
                                                Iepazinos un piekrītu <a className="text-blue-600 hover:underline" href="#">lietošanas noteikumiem</a> un <a className="text-blue-600 hover:underline" href="#">privātuma politikai</a>.
                                            </span>
                                        </label>
                                    </div>

                                    {error && (
                                        <div className="p-3 text-sm text-red-700 border border-red-200 rounded-md bg-red-50">
                                            {error}
                                        </div>
                                    )}
                                </form>
                            </div>

                            {/* Right column - Order summary */}
                            <div>
                                <div className="sticky p-6 bg-white rounded-lg shadow-md top-6">
                                    <h2 className="pb-2 mb-6 text-xl font-semibold border-b border-gray-200">Pasūtījuma kopsavilkums</h2>
                                    
                                    {cartItems.length > 0 ? (
                                        <div className="space-y-4">
                                            <div className="pr-2 overflow-y-auto max-h-64">
                                                {cartItems.map((item) => (
                                                    <div key={item.id} className="flex items-center py-3 border-b border-gray-100">
                                                        <div className="flex items-center justify-center w-16 h-16 mr-4 bg-gray-100 rounded">
                                                            {/* Placeholder for product image */}
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="text-sm font-medium">{item.product?.name || 'Unnamed Product'}</h3>
                                                            <p className="text-xs text-gray-500">Skaits: {item.quantity || 0}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-sm font-medium">€{((item.product?.price || 0) * (item.quantity || 0)).toFixed(2)}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="pt-2 space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">Preces kopā</span>
                                                    <span>€{totalAmount.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">Piegāde</span>
                                                    <span>{deliveryOption === 'pickup' ? 'Bezmaksas' : '€2.99'}</span>
                                                </div>
                                                <div className="pt-2 mt-2 border-t border-gray-200">
                                                    <div className="flex justify-between">
                                                        <span className="text-base font-medium">Kopā</span>
                                                        <span className="text-base font-medium">
                                                            €{(totalAmount + (deliveryOption === 'pickup' ? 0 : 2.99)).toFixed(2)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                onClick={handleCheckout}
                                                className="w-full px-4 py-3 mt-6 font-medium text-white transition rounded-md shadow-sm bg-primary-pink hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent"
                                            >
                                                Pabeigt pasūtījumu
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="py-8 text-center">
                                            <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                            </svg>
                                            <h3 className="mt-2 text-sm font-medium text-gray-900">Tukšs grozs</h3>
                                            <p className="mt-1 text-sm text-gray-500">Jums nav nevienas preces pievienotas grozam.</p>
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