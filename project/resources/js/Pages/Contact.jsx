import { Link, Head } from '@inertiajs/react';

export default function Contact({ auth }) {
    return (
        <>
            <main id='about' className='h-dvh mt-12'>
                <div className='flex w-full justify-center items-center'>
                    <h1 className='font-semibold text-5xl uppercase'>Kontakti</h1>
                </div>
                <div className='flex w-full justify-center items-center h-full'>
                    <div className='flex w-full justify-center items-center'>{/**kreisa puse**/}

                    </div> 
                    <div className='flex w-full justify-center items-center'>{/**laba puse**/}
                        
                    </div> 
                </div>
            </main>
        </>
    );
}
