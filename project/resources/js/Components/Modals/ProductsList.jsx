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

            {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-[70dvh] ">
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
