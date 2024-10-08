import { Link, Head } from '@inertiajs/react';
import peony from '../../assets/peony.webp';
import css from '../../css/Background.module.css';
import About from './About';
import { TiArrowSortedDown } from "react-icons/ti";
import Graphic from './Graphic';
import Special from './Special';
import Contact from './Contact';
import GuestLayout from '@/Layouts/GuestLayout';


export default function Welcome({ auth, top_products }) {

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    return (
        <>
            <Head title="Sveicināti" />
            <GuestLayout auth={auth}>

            <main className="mt-6 bg-white text-black/50 dark:bg-gray-900 dark:text-gray-200">
                <div className={`h-auto sm:h-[75dvh]`}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 h-full w-full shadow-md">
                        <div className="relative hidden lg:block">
                            <img
                                loading='lazy'
                                src={peony}
                                className="absolute w-2/5 top-20 -left-10 lg:w-4/5 lg:top-10 lg:-left-8 -z-10 sm:z-10"
                                alt="Peony Flower"
                            />
                        </div>
                        <div className="flex flex-col justify-center items-center sm:items-start px-8 lg:px-16">
                            <h1 className="uppercase text-6xl font-semibold tracking-widest text-black sm:text-8xl dark:text-gray-200">
                                Peonija
                            </h1>
                            <p className="mt-5 text-xl text-black dark:text-gray-200">
                                Ziedi | Ziedu kompozīcijas | Telpaugi | Ziedu piegāde
                            </p>

                            <div className="mt-12 w-full lg:w-4/5 text-lg text-black dark:text-gray-200 text-justify sm:text-left">
                                <p>
                                    Kā floristi ar vairāk nekā 20 gadu pieredzi, mēs esam izstrādājuši unikālu prasmi un izpratni par ziedu mākslu.
                                    Mēs sekojam līdzi jaunākajām tendencēm floristikā... 
                                    <a onClick={() => scrollToSection('about')} className='text-black font-semibold cursor-pointer dark:text-white'>Lasīt vairāk</a>
                                </p>
                            </div>
                            <Link
                                className={`${css.button_slide_effect} mb-20 mt-8 text-black bg-white border-2 border-accent rounded-3xl p-3 shadow-xl font-semibold uppercase transition duration-300 ease-in-out hover:text-white sm:my-4 sm:mb-2`}
                                href='/shop'
                            >
                                Apskatīt Veikalu
                            </Link>
                        </div>
                    </div>
                </div>

            <div className='w-full flex items-center justify-center'>
                <TiArrowSortedDown className={`${css.arrow} m-5 p-2`} size={38}/>
                <h1 
                    className='uppercase font-semibold text-2xl cursor-pointer'
                    onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
                >
                    Par mums
                </h1>
                <TiArrowSortedDown className={`${css.arrow} m-5 p-2`} size={38}/>
            </div>
        </main>
        <Special offers={top_products} id='special_orders' />
        <About id='about' />
        <Graphic />        
        <Contact id='contact' />
        </GuestLayout >
        </>
    );
}
