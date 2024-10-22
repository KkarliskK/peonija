import React, { useEffect, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Checkbox from '@/Components/Buttons/Checkbox';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios'; 

export default function Checkout({ cartItems = [] }) {
    const [stripeKey, setStripeKey] = useState(null);
    const { data, setData } = useForm({
        name: '',
        email: '',
        mobile: '',
        paymentMethod: '',
    });

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
        
        if (!stripeKey) {
            console.error('Stripe key is not set');
            return;
        }

        try {
            const response = await axios.post('/checkout/create-session', {
                cartItems: cartItems,
            });

            const { sessionId } = response.data;

            const stripe = await loadStripe(stripeKey); 
            await stripe.redirectToCheckout({ sessionId });
        } catch (error) {
            console.error('Error creating checkout session:', error);
        }
    };

    const totalAmount = cartItems.reduce((total, item) => {
        return total + (item.product?.price || 0) * (item.quantity || 0);
    }, 0);

    return (
        <>
            <Head title="Checkout" />
            <AuthenticatedLayout>
                <div className="w-full p-4 h-dvh">
                    <h1 className="text-2xl font-bold mb-4">Pirkuma veikšana</h1>
                    
                    <form onSubmit={handleCheckout} className="flex justify-center items-center flex-col space-y-4">
                        {/* Name Input */}
                        <div>
                            <label htmlFor="name" className="block font-medium">Pilnais vārds</label>
                            <input
                                type="text"
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        {/* email Input */}
                        <div>
                            <label htmlFor="email" className="block font-medium">E-pasts</label>
                            <input
                                type="text"
                                id="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        {/* mobile Input */}
                        <div>
                            <label htmlFor="mobile" className="block font-medium">Telefona numurs</label>
                            <input
                                type="number"
                                id="mobile"
                                value={data.mobile}
                                onChange={(e) => setData('mobile', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        {/* accept the thingy */}
                        <div className='flex items-center'>
                            <Checkbox className='m-2' />
                            <label htmlFor="paymentMethod" className="block font-medium">
                                Es piekrītu, ka pasūtījumu varēšu saņemt tikai uz vietas - veikalā.
                            </label>
                        </div>

                        {/* Order Summary */}
                        <div>
                            <h3 className="text-lg font-semibold">Pasūtījuma kopsavilkums</h3>
                            {cartItems.length > 0 ? (
                                cartItems.map((item) => (
                                    <div key={item.id} className="flex justify-between">
                                        <span>{item.product?.name || 'Unnamed Product'} x {item.quantity || 0}</span>
                                        <span>€{((item.product?.price || 0) * (item.quantity || 0)).toFixed(2)}</span>
                                    </div>
                                ))
                            ) : (
                                <p>Jums nav nevienas preces pievienotas grozam.</p>
                            )}
                            <div className="mt-2 font-bold">Kopā: €{totalAmount.toFixed(2)}</div>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                            Veikt pasūtījumu
                        </button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
