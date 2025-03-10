import { Link, Head } from '@inertiajs/react';

export default function Graphic({ auth }) {
    return (
        <>
            <main id='about' className='relative py-12 overflow-hidden bg-white dark:bg-gray-900'>
                {/* Background pattern - subtle dots instead of large icons */}
                <div className='absolute inset-0 pointer-events-none opacity-10 dark:opacity-5'>
                    <div className='absolute inset-0 bg-repeat' style={{ 
                        backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                        backgroundSize: '30px 30px'
                    }}></div>
                </div>
                
                {/* Content container with max width for better readability */}
                <div className='container relative z-10 px-6 mx-auto'>
                    <div className='mb-8 text-center'>
                        <h1 className='relative inline-block mb-2 text-4xl font-bold tracking-wider uppercase md:text-5xl dark:text-white'>
                            Mēs esam atvērti!
                            <span className='absolute left-0 w-full h-1 bg-gray-800 -bottom-2 dark:bg-white opacity-20'></span>
                        </h1>
                    </div>
                    
                    {/* Opening hours card */}
                    <div className='max-w-2xl mx-auto overflow-hidden rounded-lg shadow-lg bg-gray-50 dark:bg-gray-800'>
                        {/* Weekdays */}
                        <div className='p-6 border-b border-gray-200 dark:border-gray-700'>
                            <div className='flex flex-col justify-between md:flex-row md:items-center'>
                                <h2 className='mb-2 text-2xl font-semibold md:text-3xl dark:text-white md:mb-0'>
                                    Pirmdiena - Sestdiena
                                </h2>
                                <p className='text-xl font-medium text-gray-700 md:text-2xl dark:text-gray-300'>
                                    08:00 - 18:00
                                </p>
                            </div>
                        </div>
                        
                        {/* Sunday */}
                        <div className='p-6'>
                            <div className='flex flex-col justify-between md:flex-row md:items-center'>
                                <h2 className='mb-2 text-2xl font-semibold md:text-3xl dark:text-white md:mb-0'>
                                    Svētdiena
                                </h2>
                                <p className='text-xl font-medium text-gray-700 md:text-2xl dark:text-gray-300'>
                                    08:00 - 16:00
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Decorative elements - small and subtle */}
                    <div className='flex justify-center mt-8'>
                        <div className='flex items-center space-x-4'>
                            <div className='w-16 h-1 bg-gray-300 rounded-full dark:bg-gray-700'></div>
                            <div className='w-2 h-2 bg-gray-400 rounded-full dark:bg-gray-600'></div>
                            <div className='w-16 h-1 bg-gray-300 rounded-full dark:bg-gray-700'></div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}