import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import { useState, useEffect, useRef } from 'react';
import logo from '../../assets/Peonija_logo.png';

export default function GuestLayout({ auth, children }) {
    const [isOpen, setIsOpen] = useState(false);
    
    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            <header id="home" className="sticky top-0 z-50 bg-white shadow-md dark:bg-gray-900">
                <nav className="w-full bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 relative">
                    <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4 py-2.5">
                        <a href="/" className="flex items-center">
                            <img src={logo} className="h-18 sm:h-20" alt="Your Logo" />
                        </a>

                        {/* Menu for Mobile */}
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="inline-flex items-center p-2 ms-3 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700"
                            aria-controls="navbar-dropdown"
                            aria-expanded={isOpen ? 'true' : 'false'}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>

                        {/* Menu for mobile and desktop */}
                        <div
                            id="navbar-dropdown"
                            className={`fixed md:relative md:flex md:items-center top-0 right-0 h-full md:h-auto w-11/12 md:w-auto bg-white dark:bg-gray-900 shadow-lg md:shadow-none transform transition-transform duration-300 ease-in-out md:translate-x-0 z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'} `}
                        >
                            <button onClick={toggleMenu} className="absolute top-4 right-4 p-2 md:hidden text-gray-500 dark:text-gray-400">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            
                            {/* Navigation Links */}
                            <nav className="flex flex-col md:flex-row md:space-x-4 mt-12 md:mt-0 p-6 md:p-0 space-y-4 md:space-y-0">
                                <button
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                    className="text-lg text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
                                >
                                    Sākums
                                </button>
                                <button
                                    onClick={() => scrollToSection('special_orders')}
                                    className="text-lg text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
                                >
                                    Piedāvājumi
                                </button>
                                <button
                                    onClick={() => scrollToSection('about')}
                                    className="text-lg text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
                                >
                                    Par Mums
                                </button>
                                <button
                                    onClick={() => scrollToSection('contact')}
                                    className="text-lg text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
                                >
                                    Kontakti
                                </button>

                                {auth?.user ? (
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="text-lg text-red-500 dark:text-red-400"
                                    >
                                        Izrakstīties
                                    </Link>
                                ) : (
                                    <>
                                        <a href="/login" className="text-lg text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
                                            Pierakstīties
                                        </a>
                                        <a href="/register" className="text-lg text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
                                            Reģistrēties
                                        </a>
                                    </>
                                )}
                            </nav>
                        </div>
                    </div>
                </nav>
            </header>

            <div>{children}</div>

            <footer className="py-16 text-center text-sm bg-white dark:bg-gray-800 text-black dark:text-white/70">
                <p>Footer</p>
            </footer>
        </>
    );
}
