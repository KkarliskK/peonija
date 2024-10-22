import OfferCard from '@/Components/Modals/OfferCard'; 
import Pagination from '@/Components/Buttons/Pagination';

export default function ProductsSection({ 
    sortedProducts, 
    openModal, 
    pagination, 
    setCurrentPage 
}) {
    return (
        <section className="w-full p-8 dark:bg-gray-700">
            <h2 className="text-xl font-semibold mb-4">Visi produkti</h2> 
            {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {sortedProducts.map(product => (
                        <div 
                            key={product.id} 
                            onClick={() => openModal(product)}
                            className="cursor-pointer"
                        >
                            <OfferCard 
                                className='w-full'
                                image={product.image} 
                                name={product.name}
                                price={`${product.price} €`} 
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <p>Netika atrasts neviens produkts.</p>
            )}

            <div className="flex justify-center mt-4">
                <Pagination 
                    currentPage={pagination.current_page} 
                    totalPages={pagination.last_page} 
                    onPageChange={(page) => setCurrentPage(page)} 
                />
            </div>
        </section>
    );
}
