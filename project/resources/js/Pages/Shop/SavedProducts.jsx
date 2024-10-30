import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProductDisplay from '@/Components/Modals/ProductDisplay';

export default function SavedProducts({ auth, likedProducts }) {
    return (
        <>
            <Head title="Saglabātās preces" />
            <AuthenticatedLayout auth={auth}>
                <div className="flex flex-col items-center justify-center w-full min-h-dvh h-auto bg-gray-100">
                    <h1 className='text-3xl font-semibold my-8'>Saglabātie produkti</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-[70dvh] p-4">
                        {likedProducts.map((product) => (
                            <ProductDisplay
                                key={product.id}
                                product={product}
                                auth={auth}
                                isModal={false}  
                            />
                        ))}
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
