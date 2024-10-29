import React, { useEffect, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Checkbox from '@/Components/Buttons/Checkbox';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

export default function Checkout({ auth, cartItems = [] }) {
    const [stripeKey, setStripeKey] = useState(null);
    const [error, setError] = useState('');
    const { data, setData } = useForm({
        name: auth.user?.name || '',
        email: auth.user?.email || '',
        mobile: auth.user?.phone_number || '',
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

        // Validate address only if delivery is selected
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
                <div className="flex items-center justify-center flex-col w-full min-h-dvh h-auto bg-gray-100">
                    <div className='flex flex-col justify-center items-center sm:w-2/5 w-11/12 sm:h-3/5 h-full py-4 px-2 bg-white shadow-lg rounded-md my-4'>
                        <h1 className="text-2xl font-bold mb-4">Pirkuma veikšana</h1>

                        <form onSubmit={handleCheckout} className="flex justify-center items-center flex-col space-y-4">
                            <div className='w-3/5'>
                                <label htmlFor="name" className="block font-medium">Pilnais vārds</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className='w-3/5'>
                                <label htmlFor="email" className="block font-medium">E-pasts</label>
                                <input
                                    type="text"
                                    id="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className='w-3/5'>
                                <label htmlFor="mobile" className="block font-medium">Telefona numurs</label>
                                <input
                                    type="number"
                                    id="mobile"
                                    value={data.mobile}
                                    onChange={(e) => setData('mobile', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            {/* Select dropdown for delivery option */}
                            <div className='w-3/5'>
                                <label htmlFor="deliveryOption" className="block font-medium">Pasūtīšanas veids</label>
                                <select
                                    id="deliveryOption"
                                    value={deliveryOption}
                                    onChange={(e) => setDeliveryOption(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="delivery">Piegāde</option>
                                    <option value="pickup">Saņemt veikalā</option>
                                </select>
                            </div>

                            {/* Conditionally render address input if delivery is selected */}
                            {deliveryOption === 'delivery' && (
                                <div className='w-3/5'>
                                    <label htmlFor="address" className="block font-medium">Piegādes adrese</label>
                                    <input
                                        type="text"
                                        id="address"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            )}

                            <div className='flex items-center'>
                                <label className="flex items-center">
                                    <Checkbox
                                        name="accept"
                                        checked={data.accept}
                                        onChange={(e) => setData('accept', e.target.checked)}
                                    />
                                    <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">Iepazinos un piekrītu <a className='text-sky-600' href='#'>lietošanas noteikumiem</a> un <a className='text-sky-600' href="#">privātuma politikai</a>.</span>
                                </label>
                            </div>
                            {error && <div className="text-red-500 text-sm">{error}</div>}

                            <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                                Pabeigt pasūtījumu
                            </button>
                        </form>
                    </div>

                    <div className="flex flex-col items-center justify-center bg-white rounded-md shadow-lg sm:w-2/5 w-11/12 my-4 p-4">
                        <h3 className="text-lg font-semibold">Pasūtījuma kopsavilkums</h3>

                        {cartItems.length > 0 ? (
                            <div className="w-full mt-2">
                                <div className="flex justify-between border-b-2 border-gray-300 py-2 font-medium">
                                    <span className="w-1/2 text-left">Prece</span>
                                    <span className="w-1/4 text-center">Daudzums</span>
                                    <span className="w-1/4 text-right">Cena</span>
                                </div>

                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex justify-between border-b py-2 text-sm">
                                        <span className="w-1/2 text-left">{item.product?.name || 'Unnamed Product'}</span>
                                        <span className="w-1/4 text-center">{item.quantity || 0}</span>
                                        <span className="w-1/4 text-right">€{((item.product?.price || 0) * (item.quantity || 0)).toFixed(2)}</span>
                                    </div>
                                ))}

                                <div className="flex justify-between border-t-2 border-gray-300 py-2 mt-2 text-lg font-bold">
                                    <span className="text-left">Kopā</span>
                                    <span className="text-right">€{totalAmount.toFixed(2)}</span>
                                </div>
                            </div>
                        ) : (
                            <p>Jums nav nevienas preces pievienotas grozam.</p>
                        )}
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
