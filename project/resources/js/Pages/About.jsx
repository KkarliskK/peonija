import { Link, Head } from '@inertiajs/react';

export default function About({ auth }) {
    return (
        <>
            <main id='about' className='h-dvh mt-12'>
                <div className='flex w-full justify-center items-center'>
                    <h1 className='font-semibold text-5xl uppercase'>Par Mums</h1>
                </div>
                <div className='flex w-full justify-center items-center h-full'>
                    <div className='flex w-full justify-center items-center'>{/**kreisa puse**/}

                    </div> 
                    <div className='flex w-full justify-center items-center'>{/**laba puse**/}
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1077.3084952933568!2d25.275523764778672!3d57.3143973355247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46ebe14c2c16877b%3A0xa15c4ff5796a32a!2sPeonija!5e0!3m2!1slv!2slv!4v1720449909782!5m2!1slv!2slv"
                            width="600"
                            height="450"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div> 
                </div>
            </main>
        </>
    );
}
