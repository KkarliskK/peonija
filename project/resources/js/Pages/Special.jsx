import OfferCard from '@/Components/Modals/OfferCard';

export default function Special({ offers }) {
    console.log('Offers:', offers); // Check the content of offers

    return (
        <>
            <main id='special_orders' className='h-auto sm:h-dvh mt-12'>
                <div className='flex flex-col w-full justify-center items-center h-full '>
                    <div className='flex mt-8 w-full justify-center items-center'>
                        <h1 className='font-semibold text-4xl sm:text-5xl uppercase text-center dark:text-white'>Populāri Piedāvājumi</h1>
                    </div>
                    <div className='flex flex-col sm:flex-row w-full justify-center items-center h-full p-6 sm:p-12'>
                        {offers.length === 0 ? ( 
                            <p>No products available</p>
                        ) : (
                            offers.map((product, index) => (
                                <OfferCard
                                    key={index}
                                    image={product.image} 
                                    name={product.name}
                                    price={`${product.price} €`} 
                                    isAvailable={product.is_available} 
                                    initialLikesCount={product.likes_count} 
                                    quantity={product.quantity}
                                />
                            ))
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}
