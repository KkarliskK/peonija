import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';

export default function Success({ auth, order }) {
    return (
        <>
            <Head title="Order Success" />
            <AuthenticatedLayout auth={auth}>
                <div className="flex flex-col items-center justify-center w-full min-h-dvh h-auto bg-gray-100">
                    <div className="bg-white shadow-md rounded-md p-8 sm:w-3/5 w-full my-8">
                        <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
                            Pasūtījums izdevies veiksmīgi!
                        </h1>
                        
                        {/* Order Summary */}
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold text-gray-700">Pasūtījuma Detaļas</h2>
                        </div>
                        
                        <div className="border p-4 rounded mb-6">
                            <h3 className="text-lg font-semibold mb-2">Pircēja informācija</h3>
                            <p><strong>Vārds:</strong> {order.name}</p>
                            <p><strong>E-pasts:</strong> {order.email}</p>
                            <p><strong>Telefona Nr.:</strong> {order.mobile}</p>
                            <p><strong>Saņemšanas adrese:</strong> {order.address}</p>
                        </div>
                        
                        {/* Order Items */}
                        <div className="border p-4 rounded mb-6">
                            <h3 className="text-lg font-semibold mb-2">Pasūtītās preces</h3>
                            {order.items.map((item) => {
                                const price = parseFloat(item.price); 
                                const itemTotal = price * item.quantity;

                                return (
                                    <div key={item.id} className="flex justify-between border-b border-gray-300 py-2">
                                        <span>{item.product.name}</span>
                                        <span>{item.quantity} x €{isNaN(price) ? '0.00' : price.toFixed(2)}</span>
                                        <span>€{isNaN(itemTotal) ? '0.00' : itemTotal.toFixed(2)}</span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Total Amount */}
                        <div className="flex justify-between text-lg font-bold border-t pt-4">
                            <span>Kopējā apmaksātā summa:</span>
                            <span>€{parseFloat(order.total_price).toFixed(2)}</span>
                        </div>

                        {/* Return to Shop Button */}
                        <div className="mt-8 text-center">
                            <Link href={route('order.history')} className="text-blue-500 hover:underline">
                                Skatīt pirkumu vēsturi
                            </Link>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
