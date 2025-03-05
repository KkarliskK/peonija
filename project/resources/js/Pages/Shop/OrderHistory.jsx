import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function OrderHistory({ auth, orders }) {
    const renderStatusBadge = (status) => {
        let bgColor, textColor, translatedStatus;
        switch (status.toLowerCase()) {
            case 'pending':
                bgColor = 'bg-yellow-100';
                textColor = 'text-yellow-800';
                translatedStatus = 'Procesā';
                break;
            case 'canceled':
                bgColor = 'bg-red-100';
                textColor = 'text-red-800';
                translatedStatus = 'Atcelts';
                break;
            case 'success':
            case 'completed':
                bgColor = 'bg-green-100';
                textColor = 'text-green-800';
                translatedStatus = 'Pabeigts';
                break;
            default:
                bgColor = 'bg-gray-100';
                textColor = 'text-gray-800';
        }
        return (
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor} ml-2`}>
                {translatedStatus}
            </span>
        );
    };

    return (
        <>
            <Head title="Pirkumu Vēsture" />
            <AuthenticatedLayout auth={auth}>
                <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8 bg-gray-50">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
                                Jūsu pirkumu vēsture
                            </h1>
                            <p className="mt-2 text-gray-600">
                                Pārskatiet savus iepriekšējos pirkumus un pasūtījumus
                            </p>
                        </div>

                        {orders.length > 0 ? (
                            <div className="space-y-6">
                                {orders.map((order) => (
                                    <div key={order.id} className="overflow-hidden transition-all bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md">
                                        <div className="flex flex-col px-4 py-3 border-b border-gray-200 bg-gray-50 sm:flex-row sm:items-center sm:justify-between">
                                            <div className="mb-2 sm:mb-0">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                                                    Pasūtījums #{order.id}
                                                </span>
                                                {order.status && renderStatusBadge(order.status)}
                                                <time className="text-sm text-gray-500 sm:ml-2" dateTime={order.created_at}>
                                                    {new Date(order.created_at).toLocaleDateString('lv-LV', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </time>
                                            </div>
                                            <div className="text-lg font-medium text-gray-900">
                                                €{Number(order.total_price).toFixed(2)}
                                            </div>
                                        </div>
                                        
                                        <div className="px-4 py-4 sm:px-6">
                                            <h3 className="mb-3 text-sm font-medium tracking-wider text-gray-500 uppercase">
                                                Pasūtītās preces
                                            </h3>
                                            <div className="overflow-hidden border rounded-md">
                                                <table className="min-w-full divide-y divide-gray-200">
                                                    <thead className="bg-gray-50">
                                                        <tr>
                                                            <th scope="col" className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                                                Prece
                                                            </th>
                                                            <th scope="col" className="px-4 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase">
                                                                Daudzums
                                                            </th>
                                                            <th scope="col" className="px-4 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                                                                Cena
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                        {order.items.map(item => (
                                                            <tr key={item.id} className="hover:bg-gray-50">
                                                                <td className="px-4 py-3 text-sm text-gray-900">
                                                                    {item.product.name}
                                                                </td>
                                                                <td className="px-4 py-3 text-sm text-center text-gray-500">
                                                                    {item.quantity}
                                                                </td>
                                                                <td className="px-4 py-3 text-sm text-right text-gray-900">
                                                                    €{(item.price * item.quantity).toFixed(2)}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                    <tfoot className="bg-gray-50">
                                                        <tr>
                                                            <td colSpan="2" className="px-4 py-2 text-sm font-medium text-right text-gray-900">
                                                                Kopā:
                                                            </td>
                                                            <td className="px-4 py-2 text-sm font-medium text-right text-gray-900">
                                                                €{Number(order.total_price).toFixed(2)}
                                                            </td>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center bg-white border border-gray-200 rounded-lg shadow-sm">
                                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-gray-100 rounded-full">
                                    <svg className="w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                    </svg>
                                </div>
                                <h3 className="mt-4 text-lg font-medium text-gray-900">Nav pirkumu vēstures</h3>
                                <p className="mt-2 text-gray-500">
                                    Jūs vēl neesat veicis nevienu pirkumu mūsu veikalā.
                                </p>
                                <div className="mt-6">
                                    <a href="/shop" className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                        Apskatīt preces
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
