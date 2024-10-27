import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function OrderHistory({ auth, orders }) {
    return (
        <>
            <Head title="Pirkumu Vēsture" />
            <AuthenticatedLayout auth={auth}>
                <div className="flex flex-col items-center justify-center w-full min-h-dvh h-auto bg-gray-100">
                    <div className="bg-white shadow-md rounded-md p-8 sm:w-3/5 w-full sm:my-8 my-4">
                        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">
                            Jūsu pirkumu vēsture
                        </h1>

                        {orders.length > 0 ? (
                            <div>
                                {orders.map((order) => (
                                    <div key={order.id} className="mb-6 border p-4 rounded">
                                        <p><strong>Datums:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
                                        <p><strong>Kopējā summa:</strong> €{Number(order.total_price).toFixed(2)}</p>
                                        <h3 className="font-semibold mt-2">Pirkuma grozs:</h3>
                                        <ul className="list-disc pl-5">
                                            {order.items.map(item => (
                                                <li key={item.id}>
                                                    {item.quantity} x {item.product.name} - €{(item.price * item.quantity).toFixed(2)}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">Jūs vēl neesat veicis nevienu pirkumu.</p>
                        )}
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
