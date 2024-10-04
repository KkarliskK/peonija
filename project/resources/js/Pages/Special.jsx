import OfferCard from '@/Components/Modals/OfferCard';

export default function Special({ offers }) {
    console.log('Offers:', offers); // Check the content of offers

    return (
        <>
            <main id='special_orders' className='h-dvh sm:h-dvh mt-12'>
                <div className='flex flex-col w-full justify-center items-center h-full '>
                    <div className='flex mt-8 w-full justify-center items-center'>
                        <h1 className='font-semibold text-4xl sm:text-5xl uppercase text-center'>Populāri Piedāvājumi</h1>
                    </div>
                    <div className='flex flex-col sm:flex-row w-full justify-center items-center h-full'>
                        {offers.length === 0 ? ( // Conditional rendering for no products
                            <p>No products available</p>
                        ) : (
                            offers.map((product, index) => (
                                <OfferCard
                                    key={index}
                                    image={product.image}
                                    name={product.name}
                                    price={product.price}
                                />
                            ))
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}
