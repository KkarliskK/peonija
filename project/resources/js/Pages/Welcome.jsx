import { Link, Head } from '@inertiajs/react';
import peony from '../../assets/peony.png';
import logo from '../../assets/Peonija_logo.png';
import css from '../../css/Background.module.css';
import About from './About';
import { TiArrowSortedDown } from "react-icons/ti";
import Graphic from './Graphic';
import { useEffect, useState } from 'react';
import Special from './Special';
import Contact from './Contact';
import { route } from 'ziggy-js';

export default function Welcome({ auth, laravelVersion, phpVersion }) {

    // console.log(route()); // To list all routes available
    // console.log(route('admin.dashboard'));


    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode === 'enabled') {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        if (darkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('darkMode', 'disabled');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('darkMode', 'enabled');
        }
        setDarkMode(!darkMode);
    };

    return (
        <>
            <Head title="Sveicināti" />
            <header className="flex h-2/5 justify-center items-center">
                <div className="flex lg:justify-start w-full">
                    {/** Logo **/}
                    <img className='w-full sm:w-1/6' src={logo} alt="peonija logo" />
                    
                    {/* Desktop Links */}
                    <nav className="hidden sm:flex flex-1 justify-center gap-8 items-center">
                        {auth.user ? (
                            <>
                                <button
                                    onClick={() => document.getElementById('home').scrollIntoView({ behavior: 'smooth' })}
                                    className="rounded-md px-3 py-2 text-black dark:text-white transition hover:text-black/70 dark:hover:text-white/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:focus-visible:ring-white"
                                >
                                    Sākums
                                </button>
                                <button
                                    onClick={() => document.getElementById('special_orders').scrollIntoView({ behavior: 'smooth' })}
                                    className="rounded-md px-3 py-2 text-black dark:text-white transition hover:text-black/70 dark:hover:text-white/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:focus-visible:ring-white"
                                >
                                    Piedāvājumi
                                </button>
                                <button
                                    onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
                                    className="rounded-md px-3 py-2 text-black dark:text-white transition hover:text-black/70 dark:hover:text-white/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:focus-visible:ring-white"
                                >
                                    Par Mums
                                </button>
                                <button
                                    onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                                    className="rounded-md px-3 py-2 text-black dark:text-white transition hover:text-black/70 dark:hover:text-white/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:focus-visible:ring-white"
                                >
                                    Kontakti
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => document.getElementById('home').scrollIntoView({ behavior: 'smooth' })}
                                    className="rounded-md px-3 py-2 text-black dark:text-white transition hover:text-black/70 dark:hover:text-white/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:focus-visible:ring-white"
                                >
                                    Sākums
                                </button>
                                <button
                                    onClick={() => document.getElementById('special_orders').scrollIntoView({ behavior: 'smooth' })}
                                    className="rounded-md px-3 py-2 text-black dark:text-white transition hover:text-black/70 dark:hover:text-white/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:focus-visible:ring-white"
                                >
                                    Piedāvājumi
                                </button>
                                <button
                                    onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
                                    className="rounded-md px-3 py-2 text-black dark:text-white transition hover:text-black/70 dark:hover:text-white/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:focus-visible:ring-white"
                                >
                                    Par Mums
                                </button>
                                <button
                                    onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                                    className="rounded-md px-3 py-2 text-black dark:text-white transition hover:text-black/70 dark:hover:text-white/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:focus-visible:ring-white"
                                >
                                    Kontakti
                                </button>
                                <Link
                                    href={route('login')}
                                    className="rounded-md px-3 py-2 text-black dark:text-white transition hover:text-black/70 dark:hover:text-white/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:focus-visible:ring-white"
                                >
                                    Pieslēgties
                                </Link>
                                <Link
                                    href={route('register')}
                                    className=" rounded-md px-3 py-2 text-black dark:text-white transition hover:text-black/70 dark:hover:text-white/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:focus-visible:ring-white"
                                >
                                    Reģistrēties
                                </Link>
                            </>
                        )}
                    </nav>

                    {/* Burger Icon (Visible in all views) */}
                    <div className="block flex items-center ml-auto">
                        <button onClick={toggleMenu} className="flex items-center p-2 rounded-md focus:outline-none">
                            <svg
                                className="w-6 h-6 text-black dark:text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>

                    {/* Dropdown Menu */}
                    {isOpen && (
                        <div className="absolute top-16 right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md z-50 text-center">
                            <div className="flex flex-col space-y-2 p-2 items-center">
                                {auth.user ? (
                                    <>
                                        <Link
                                            href={route('dashboard')}
                                            className="w-full rounded-md px-3 py-2 text-black dark:text-white transition hover:text-black/70 dark:hover:text-white/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:focus-visible:ring-white"
                                        >
                                            {auth.user.name}
                                        </Link>
                                        <button
                                            className="w-full rounded-md px-3 py-2 text-black dark:text-white transition hover:text-black/70 dark:hover:text-white/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:focus-visible:ring-white"
                                        >
                                            Galerija
                                        </button>
                                        <button
                                            className="w-full rounded-md px-3 py-2 text-black dark:text-white transition hover:text-black/70 dark:hover:text-white/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:focus-visible:ring-white"
                                        >
                                            Blogs
                                        </button>
                                        <button
                                            className="w-full rounded-md px-3 py-2 text-black dark:text-white transition hover:text-black/70 dark:hover:text-white/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:focus-visible:ring-white"
                                        >
                                            Kontakti
                                        </button>
                                        <Link
                                            href={route('logout')}
                                            className="w-full rounded-md px-3 py-2 text-black dark:text-white transition hover:text-black/70 dark:hover:text-white/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:focus-visible:ring-white"
                                            method="post" as="button"
                                        >
                                            Izrakstīties
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            className="w-full rounded-md px-3 py-2 text-black dark:text-white transition hover:text-black/70 dark:hover:text-white/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:focus-visible:ring-white"
                                        >
                                            Galerija
                                        </button>
                                        <button
                                            className="w-full rounded-md px-3 py-2 text-black dark:text-white transition hover:text-black/70 dark:hover:text-white/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:focus-visible:ring-white"
                                        >
                                            Blogs
                                        </button>
                                        <button
                                            className="w-full rounded-md px-3 py-2 text-black dark:text-white transition hover:text-black/70 dark:hover:text-white/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:focus-visible:ring-white"
                                        >
                                            Kontakti
                                        </button>
                                        <Link
                                            href={route('login')}
                                            className="w-full rounded-md px-3 py-2 text-black dark:text-white transition hover:text-black/70 dark:hover:text-white/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:focus-visible:ring-white"
                                        >
                                            Pieslēgties
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="w-full rounded-md px-3 py-2 text-black dark:text-white transition hover:text-black/70 dark:hover:text-white/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:focus-visible:ring-white"
                                        >
                                            Reģistrēties
                                        </Link>
                                        <button
                                            onClick={toggleDarkMode}
                                            className={`w-full rounded-md px-3 py-2 transition focus:outline-none focus-visible:ring-[#FF2D20] ${darkMode ? 'text-white bg-black' : 'text-black bg-white'}`}
                                            >
                                            {darkMode ? 'Disable Dark Mode' : 'Enable Dark Mode'}
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </header>

        <main className="mt-6">
            <div id='home' className={`${css.background} h-[75dvh] text-black/50 dark:bg-black dark:text-white/50`}>
                <div className={`flex flex-col h-full w-full justify-center items-center shadow-lg`}>
                    <div className='flex flex-col items-start justify-center'>
                        <img src={peony} className=' sm:w-4/5 lg:w-2/5 mt-8 absolute top-32 -left-52 '/>
                        <h1 className='uppercase text-8xl font-semibold tracking-widest text-black'>Peonija</h1>
                        <p className={`text-black mt-5 text-xl text-center`}>Ziedi | Ziedu kompozīcijas | Telpaugi | Ziedu piegāde</p>
                        <p className='mt-12 text-black text-lg text-center'>Ziedu veikals Cēsīs, </p>
                        <button className={`${css.button_slide_effect} text-black bg-white border-2 border-accent rounded-3xl p-3 shadow-xl font-semibold uppercase transition duration-300 ease-in-out hover:text-white sm:my-4`}>
                            Apskatīt Veikalu
                        </button>

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
        <Special id='special_orders' />
        <About id='about' />
        <Graphic />        
        <Contact id='contact' />
        {/* <Shop /> */}
        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
            Laravel v{laravelVersion} (PHP v{phpVersion})
        </footer>
        </>
    );
}
