import OfferCard from '@/Components/Modals/OfferCard';

const ProductList = ({
    paginatedProducts,
    openModal,
    currentPage,
    setCurrentPage,
    totalPages,
    selectedParentCategory,
    selectedSubCategory,
    filter,
    searchQuery,
    categories,
}) => {
    const selectedCategoryName = () => {
        let title = 'Visi Produkti';

        if (selectedSubCategory) {
            const subCategory = categories.find(cat => cat.id === selectedSubCategory);
            if (subCategory) title = subCategory.name;
        } else if (selectedParentCategory) {
            const parentCategory = categories.find(cat => cat.id === selectedParentCategory);
            if (parentCategory) title = parentCategory.name;
        }

        if (filter === 'price-asc') title += ' - Cenas, sākot no zemākās';
        else if (filter === 'price-desc') title += ' - Cenas, sākot no augstākās';

        if (searchQuery) title += ` | Rezultāti priekš: "${searchQuery}"`;

        return title;
    };

    const sortedProducts = paginatedProducts.sort((a, b) => {
        if (a.is_available && a.quantity > 0 && (!b.is_available || b.quantity === 0)) return -1;
        if ((!a.is_available || a.quantity === 0) && b.is_available && b.quantity > 0) return 1;
        return 0;
    });

    return (
        <section className="w-full p-0 mr-8 sm:p-8 dark:bg-gray-700">
            <h2 className="mb-4 text-xl font-semibold">{selectedCategoryName()}</h2>

            {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-[70dvh]">
                    {sortedProducts.map(product => (
                        <div 
                            key={product.id} 
                            onClick={() => {
                                if (product.is_available && product.quantity > 0) openModal(product);
                            }}  
                            className="cursor-pointer"
                        >
                            <OfferCard
                                id={product.id}
                                image={product.image}
                                name={product.name}
                                price={`${product.price} €`}
                                isAvailable={product.is_available}
                                initialLikesCount={product.likes_count}
                                isLiked={product.is_liked}
                                quantity={product.quantity}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <p>Netika atrasts neviens produkts.</p>
            )}

            <div className="flex justify-center mt-4">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 mx-1 bg-gray-300 rounded disabled:opacity-50"
                >
                    Iepriekšējā lapa
                </button>
                <span className="px-3 py-1">{`Lapa ${currentPage} no ${totalPages}`}</span>
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 mx-1 bg-gray-300 rounded disabled:opacity-50"
                >
                    Nākamā lapa
                </button>
            </div>
        </section>
    );
};

export default ProductList;
