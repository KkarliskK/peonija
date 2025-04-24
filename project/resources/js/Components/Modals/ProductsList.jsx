import OfferCard from '@/Components/Modals/OfferCard';
import Paginator from "@/Components/Buttons/Paginator";

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
    storeClosed,
    closureReason
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

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo(0, 0);
    };

    return (
        <section className="w-full p-2 sm:p-8 dark:bg-gray-700">
            <h2 className="mb-4 text-xl font-semibold dark:text-gray-200">{selectedCategoryName()}</h2>
            
            {/* Store closed notification */}
            {storeClosed && (
                <div className="p-4 mb-6 text-red-700 bg-red-100 border-l-4 border-red-500 rounded dark:bg-red-900/30 dark:text-red-200 dark:border-red-400">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <p className="font-medium">{closureReason || 'Veikals šobrīd ir slēgts.'}</p>
                    </div>
                    <p className="mt-2 text-sm">Jūs varat pārlūkot produktus, bet pasūtījuma veikšana nav iespējama, kamēr veikals ir slēgts.</p>
                </div>
            )}

            {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-[70dvh]">
                    {sortedProducts.map(product => (
                        <div 
                            key={product.id} 
                            onClick={() => {
                                if (!storeClosed && product.is_available && product.quantity > 0) {
                                    openModal(product);
                                }
                            }}  
                            className={`${(!storeClosed && product.is_available && product.quantity > 0) ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                        >
                            <OfferCard
                                id={product.id}
                                image={product.image}
                                name={product.name}
                                price={`${product.price} €`}
                                isAvailable={product.is_available && !storeClosed}
                                initialLikesCount={product.likes_count}
                                isLiked={product.is_liked}
                                quantity={product.quantity}
                                storeClosed={storeClosed}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <p className="dark:text-gray-200">Netika atrasts neviens produkts.</p>
            )}

            <Paginator 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </section>
    );
};

export default ProductList;