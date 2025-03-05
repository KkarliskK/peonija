import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';

export default function Success({ auth, order }) {
    const safeOrder = order || {};
    const orderItems = safeOrder.items || [];
    
    const totalPrice = parseFloat(safeOrder.total_price || 0);
    const deliveryFee = parseFloat(safeOrder.delivery_fee || 0);
    const discount = parseFloat(safeOrder.discount || 0);
    
    // If no order exists, show an error message
    // if (!safeOrder.id) {
    //     return (
    //         <AuthenticatedLayout auth={auth || {}}>
    //             <div className="flex items-center justify-center min-h-screen bg-gray-50">
    //                 <div className="p-8 text-center bg-white rounded-lg shadow-md">
    //                     <div className="mb-4 text-red-500">
    //                         <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    //                         </svg>
    //                     </div>
    //                     <h2 className="mb-4 text-2xl font-bold text-gray-800">Order Not Found</h2>
    //                     <p className="mb-6 text-gray-600">We couldn't retrieve your order details. Please contact support.</p>
    //                     <div className="flex justify-center space-x-4">
    //                         <Link 
    //                             href={route('shop.index')} 
    //                             className="px-4 py-2 text-white transition rounded-md bg-primary-pink hover:bg-accent"
    //                         >
    //                             Continue Shopping
    //                         </Link>
    //                         <Link 
    //                             href={route('contact')} 
    //                             className="px-4 py-2 text-gray-700 transition border border-gray-300 rounded-md hover:bg-gray-50"
    //                         >
    //                             Contact Support
    //                         </Link>
    //                     </div>
    //                 </div>
    //             </div>
    //         </AuthenticatedLayout>
    //     );
    // }

    return (
        <>
            <Head title="Order Success" />
            <AuthenticatedLayout auth={auth || {}}>
                <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8 bg-gray-50">
                    <div className="max-w-3xl mx-auto">
                        <div className="overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm">
                            {/* Header (unchanged) */}
                            <div className="px-6 py-8 text-center border-b border-green-100 bg-green-50">
                                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full">
                                    <svg className="w-8 h-8 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h1 className="text-2xl font-bold text-green-700 sm:text-3xl">
                                    Pasūtījums izdevies veiksmīgi!
                                </h1>
                                <p className="mt-2 text-green-600">
                                    Jūsu pasūtījums ir saņemts un tiek apstrādāts
                                </p>
                            </div>
                            
                            <div className="px-4 py-5 sm:p-6">
                                <div className="flex flex-col pb-4 mb-5 border-b border-gray-200 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <h2 className="text-sm text-gray-500">Pasūtījuma numurs</h2>
                                        <p className="text-lg font-medium text-gray-900">#{safeOrder.id || 'N/A'}</p>
                                    </div>
                                    <div className="mt-2 sm:mt-0">
                                        <h2 className="text-sm text-gray-500">Datums</h2>
                                        <p className="text-lg font-medium text-gray-900">
                                            {safeOrder.created_at 
                                                ? new Date(safeOrder.created_at).toLocaleDateString('lv-LV', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })
                                                : 'N/A'
                                            }
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="mb-6">
                                    <h3 className="mb-3 text-lg font-medium text-gray-900">Pircēja informācija</h3>
                                    <div className="grid grid-cols-1 gap-3 p-4 rounded-lg bg-gray-50 sm:grid-cols-2">
                                        <div>
                                            <h4 className="text-xs font-medium text-gray-500 uppercase">Vārds</h4>
                                            <p className="mt-1 text-gray-900">{safeOrder.name || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-medium text-gray-500 uppercase">E-pasts</h4>
                                            <p className="mt-1 text-gray-900">{safeOrder.email || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-medium text-gray-500 uppercase">Telefona numurs</h4>
                                            <p className="mt-1 text-gray-900">{safeOrder.mobile || 'N/A'}</p>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <h4 className="text-xs font-medium text-gray-500 uppercase">Saņemšanas adrese</h4>
                                            <p className="mt-1 text-gray-900">{safeOrder.address || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mb-6">
                                    <h3 className="mb-3 text-lg font-medium text-gray-900">Pasūtītās preces</h3>
                                    {orderItems.length === 0 ? (
                                        <div className="p-4 text-center border border-yellow-200 rounded-lg bg-yellow-50">
                                            <p className="text-yellow-700">Nav pasūtītu preču</p>
                                        </div>
                                    ) : (
                                        <div className="overflow-hidden border border-gray-200 rounded-lg">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th scope="col" className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                                            Preces nosaukums
                                                        </th>
                                                        <th scope="col" className="px-4 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase">
                                                            Daudzums
                                                        </th>
                                                        <th scope="col" className="px-4 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                                                            Cena
                                                        </th>
                                                        <th scope="col" className="px-4 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                                                            Summa
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {orderItems.map((item) => {
                                                        const price = parseFloat(item.price || 0);
                                                        const quantity = item.quantity || 0;
                                                        const itemTotal = price * quantity;

                                                        return (
                                                            <tr key={item.id} className="hover:bg-gray-50">
                                                                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                                                    {item.product?.name || 'N/A'}
                                                                </td>
                                                                <td className="px-4 py-3 text-sm text-center text-gray-500">
                                                                    {quantity}
                                                                </td>
                                                                <td className="px-4 py-3 text-sm text-right text-gray-500">
                                                                    €{price.toFixed(2)}
                                                                </td>
                                                                <td className="px-4 py-3 text-sm font-medium text-right text-gray-900">
                                                                    €{itemTotal.toFixed(2)}
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                                <tfoot>
                                                    {deliveryFee > 0 && (
                                                        <tr>
                                                            <td colSpan="3" className="px-4 py-3 text-sm font-medium text-right text-gray-900">Piegādes maksa:</td>
                                                            <td className="px-4 py-3 text-sm font-bold text-right text-gray-900">€{deliveryFee.toFixed(2)}</td>
                                                        </tr>
                                                    )}
                                                    {discount > 0 && (
                                                        <tr>
                                                            <td colSpan="3" className="px-4 py-3 text-sm font-medium text-right text-gray-900">Atlaide:</td>
                                                            <td className="px-4 py-3 text-sm font-bold text-right text-red-600">-€{discount.toFixed(2)}</td>
                                                        </tr>
                                                    )}
                                                    <tr>
                                                        <td colSpan="3" className="px-4 py-3 text-sm font-medium text-right text-gray-900">Maksājuma summa:</td>
                                                        <td className="px-4 py-3 text-lg font-bold text-right text-green-700">€{totalPrice}</td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="flex flex-col items-center justify-center px-4 py-5 border-t border-gray-200 bg-gray-50 sm:px-6 sm:flex-row sm:justify-between">
                                <p className="mb-4 text-sm text-gray-500 sm:mb-0">
                                    Paldies par jūsu pasūtījumu!
                                </p>
                                <div className="flex space-x-4">
                                    <Link href={route('order.history')} className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 transition ease-in-out bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent">
                                        Pirkumu vēsture
                                    </Link>
                                    <Link href={route('shop.index')} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white transition ease-in-out border border-transparent rounded-md shadow-sm bg-primary-pink hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2-all focus:ring-accent">
                                        Turpināt iepirkties
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}