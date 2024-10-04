export default function Special({ offers }) {
    return (
        <>
            <main id='special_orders' className='h-dvh sm:h-dvh mt-12'>
                <div className='flex flex-col w-full justify-center items-center h-full '>
                    <div className='flex mt-8 w-full justify-center items-center'>
                        <h1 className='font-semibold text-4xl sm:text-5xl uppercase text-center'>Populāri Piedāvājumi</h1>
                    </div>

                    <div className='flex flex-col sm:flex-row w-full justify-center items-center h-full'>
                        {/* Dynamically render OfferCard components */}
                        {offers.map((offer, index) => (
                            <OfferCard
                                key={index}
                                image={offer.image}
                                title={offer.title}
                                price={offer.price}
                            />
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}
