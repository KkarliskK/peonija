import { Link, Head } from '@inertiajs/react';
import { lazy, Suspense } from 'react';
import { TiArrowSortedDown } from "react-icons/ti";
import GuestLayout from '@/Layouts/GuestLayout';
import peony from '../../assets/peony.webp';


const About = lazy(() => import('./About'));
const Graphic = lazy(() => import('./Graphic'));
const Special = lazy(() => import('./Special'));
const Contact = lazy(() => import('./Contact'));

export default function Welcome({ auth, top_products }) {
    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <Head title="Sveicināti" />
            <GuestLayout auth={auth}>
                <main className="mt-6 bg-white text-black/50 dark:bg-gray-900 dark:text-gray-200">
                    <div className="min-h-[75dvh] relative overflow-hidden">
                        <div className="grid w-full h-full grid-cols-1 gap-8 lg:grid-cols-2">
                            <div className="relative items-center justify-center hidden lg:flex">
                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent dark:from-gray-900/20" />
                                <img
                                    src={peony}
                                    className="object-cover w-4/5 "
                                    alt="Peony Flower"
                                    loading="eager"
                                />
                            </div>

                            <div className="flex flex-col items-center justify-center px-8 space-y-8 lg:items-start lg:px-16">
                                <h1 className="text-6xl font-semibold tracking-widest text-black uppercase sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl dark:text-gray-200 animate-fade-in">
                                    Peonija
                                </h1>
                                
                                <p className="text-lg text-black sm:text-xl dark:text-gray-200 animate-fade-in-delay">
                                    Ziedi | Ziedu kompozīcijas | Telpaugi | Ziedu piegāde
                                </p>

                                <div className="w-full prose prose-lg lg:w-4/5 dark:prose-invert">
                                    <p className="text-base text-justify text-black sm:text-lg sm:text-left">
                                        Kā floristi ar vairāk nekā 20 gadu pieredzi, mēs esam izstrādājuši unikālu prasmi un izpratni par ziedu mākslu.
                                        Mēs sekojam līdzi jaunākajām tendencēm floristikā... 
                                        <button 
                                            onClick={() => scrollToSection('about')}
                                            className="font-semibold text-black rounded dark:text-white hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                                        >
                                            Lasīt vairāk
                                        </button>
                                    </p>
                                </div>

                                <Link
                                    href="/shop"
                                    className="inline-flex items-center px-6 py-3 font-semibold text-black uppercase transition duration-300 ease-in-out bg-white border-2 shadow-xl border-accent rounded-3xl hover:bg-accent hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                                >
                                    Apskatīt Veikalu
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="flex items-center justify-center w-full py-4 cursor-pointer group" onClick={() => scrollToSection('about')}>
                        <TiArrowSortedDown className="transition-colors duration-300 text-primary-pink animate-bounce group-hover:text-accent" size={32} />
                        <h2 className="mx-4 text-xl font-semibold uppercase transition-colors duration-300 text-primary-pink group-hover:text-accent">
                            Par mums
                        </h2>
                        <TiArrowSortedDown className="transition-colors duration-300 text-primary-pink animate-bounce group-hover:text-accent" size={32} />
                    </div>
                </main>

                <Suspense fallback={<div className="flex items-center justify-center h-32">Loading...</div>}>
                    <Special offers={top_products} id="special_orders" />
                    <About id="about" />
                    <Graphic />
                    <Contact id="contact" />
                </Suspense>
            </GuestLayout>
        </>
    );
}