import { Link, Head } from '@inertiajs/react';

export default function Graphic({ auth }) {
    return (
        <>
            <main id='about' className='h-[50dvh] mt-12'>
                <div className='flex w-full justify-center items-center'>
                    <h1 className='font-semibold text-5xl uppercase text-center'>Mēs esam atvērti!</h1>
                </div>
                <div className='flex w-full justify-center items-center h-3/5'>
                    <div className='flex w-full flex-col justify-center items-center'>{/**vidus**/}
                        <p className='text-4xl font-semibold m-1 text-center'>Pirmdiena - Sestdiena</p>
                        <p className='text-2xl font-semibold'>08:00 - 18:00</p>
                        <p className='text-4xl font-semibold m-1'>Svētdiena</p>
                        <p className='text-2xl font-semibold'>08:00 - 16:00</p>
                    </div> 
                </div>
            </main>
        </>
    );
}
