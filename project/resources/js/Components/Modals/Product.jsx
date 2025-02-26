export default function Special({ offers }) {
    return (
        <>
            <main id='special_orders' className='mt-12 h-dvh sm:h-dvh'>
                <div className='flex flex-col items-center justify-center w-full h-full '>
                    <div className='flex items-center justify-center w-full mt-8'>
                        <h1 className='text-4xl font-semibold text-center uppercase sm:text-5xl'>Populāri Piedāvājumi</h1>
                    </div>

                    <div className='flex flex-col items-center justify-center w-full h-full sm:flex-row'>
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
