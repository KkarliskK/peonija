import OfferCard from '@/Components/Modals/OfferCard';

export default function Special({ offers }) {
    return (
        <section 
            id='special_orders' 
            className='relative min-h-screen py-16 bg-gradient-to-b from-accent to-primary-pink dark:from-gray-800 dark:to-gray-900 sm:py-24'
        >
            <div className='container px-4 mx-auto sm:px-6 lg:px-8'>
                <div className='max-w-3xl mx-auto mb-12 text-center sm:mb-16'>
                    <div className='mb-8 text-center'>
                        <h1 className='relative inline-block mb-2 text-4xl font-bold tracking-wider text-white uppercase md:text-5xl dark:text-white'>
                            Populāri piedāvājumi
                            <span className='absolute left-0 w-full h-1 bg-gray-800 -bottom-2 dark:bg-white opacity-20'></span>
                        </h1>
                    </div>
                    <p className='text-lg leading-relaxed sm:text-xl text-white/90 dark:text-gray-300'>
                        Mūsu veikalā ir pieejami dažādi grieztie ziedi, telpaugi un ar mīlestību veidoti ziedu pušķi. 
                        Mēs lepojamies ar mūsu spēju radīt ziedu kompozīcijas, kas atspoguļo mūsu klientu individuālās 
                        vēlmes un emocijas.
                    </p>
                </div>

                {offers.length === 0 ? (
                    <div className='text-xl text-center text-white dark:text-gray-200'>
                        Nav pieejamu produktu
                    </div>
                ) : (
                    <div className="max-w-[1600px] mx-auto px-4">
                        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 place-items-center'>
                            {offers.map((product) => (
                                <div key={product.id} className="w-full">
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
                    </div>
                )}
            </div>
        </section>
    );
}