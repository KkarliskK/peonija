import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function ShopView({ auth, categories = [], products = [] }) {
    return (
        <>
            <Head title="Veikals" />
            <GuestLayout auth={auth}>
                <section className="px-8 py-12">
                    <h1 className="text-4xl font-bold mb-8">Veikals</h1>

                    {categories.map(category => (
                        <div key={category.id} className="mb-12">
                            <h2 className="text-3xl font-semibold mb-6">{category.name} ({category.total_products_count} products)</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {products
                                    .filter(product => product.category_id === category.id)
                                    .map(product => (
                                        <div key={product.id} className="border rounded-lg p-4">
                                            <img src={`/images/${product.image}`} alt={product.name} className="mb-4" />
                                            <h3 className="text-xl font-medium">{product.name}</h3>
                                            <p className="text-gray-500">{product.description}</p>
                                            <p className="text-lg font-bold mt-4">€{product.price}</p>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </section>
            </GuestLayout>
        </>
    );
}
