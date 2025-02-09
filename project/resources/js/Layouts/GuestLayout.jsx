import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import Dropdown from '@/Components/Buttons/Dropdown';
import { useState, useEffect, useRef } from 'react';
import logo from '../../assets/Peonija_logo.webp';
import NavLink from '@/Components/Buttons/NavLink';

export default function GuestLayout({ auth, children }) {

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        const root = window.document.documentElement;

        if (darkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };
    
    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const [isDropOpen, setIsDropOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropOpen(!isDropOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropOpen(false);
            }
        };

        if (isDropOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropOpen]);

    return (
        <>
            <header id="home" className="sticky top-0 z-50 shadow-sm bg-white dark:bg-gray-900">
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
                                <NavLink
                                    to="#"  
                                    onClick={(e) => {
                                        e.preventDefault(); 
                                        window.scrollTo({ top: 0, behavior: 'smooth' });  
                                    }}
                                >
                                    Sākums
                                </NavLink>
                                <NavLink
                                    to="#"
                                    onClick={(e) => {
                                        e.preventDefault();  
                                        scrollToSection('special_orders');  
                                    }}
                                >
                                    Piedāvājumi
                                </NavLink>
                                <NavLink
                                    to="#"
                                    onClick={(e) => {
                                        e.preventDefault();  
                                        scrollToSection('about');  
                                    }}
                                >
                                    Par Mums
                                </NavLink>
                                <NavLink
                                    to="#"
                                    onClick={(e) => {
                                        e.preventDefault();  
                                        scrollToSection('contact');  
                                    }}
                                >
                                    Kontakti
                                </NavLink>
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                        <button
                                            ref={dropdownRef}
                                            onClick={toggleDropdown}
                                            className="w-full text-black rounded-3xl p-3 text-lg sm:py-2 inline-flex items-center relative"
                                        >
                                            Vairāk
                                            <svg
                                                className={`w-2.5 h-2.5 ms-3 transition-transform duration-300 ${isDropOpen ? 'rotate-180' : 'rotate-0'}`}
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 10 6"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="m1 1 4 4 4-4"
                                                />
                                            </svg>
                                        </button>
                                        </Dropdown.Trigger>
                                        <Dropdown.Content>
                                            <Dropdown.Link href="/shop" className="text-gray-700 dark:text-gray-200">Interneta veikals</Dropdown.Link>
                                            <Dropdown.Link href="#" className="text-gray-700 dark:text-gray-200">Blogs</Dropdown.Link>
                                            <Dropdown.Link href="/galerija" className="text-gray-700 dark:text-gray-200">Galerija</Dropdown.Link>
                                            <Dropdown.Link href="/shop" className="text-gray-700 dark:text-gray-200">Piedāvājumi</Dropdown.Link>
                                            <Dropdown.Link href="/dashboard" className="text-gray-700 dark:text-gray-200">Profils</Dropdown.Link>
                                            <Dropdown.Link onClick={toggleDarkMode} className="text-gray-700 dark:text-gray-200">Gaišais režīms</Dropdown.Link>
                                            {auth?.user ? (
                                                <Dropdown.Link
                                                    href={route('logout')}
                                                    method="post"
                                                    as="button"
                                                    className="text-lg text-red-500 dark:text-red-400"
                                                >
                                                    Izrakstīties
                                                </Dropdown.Link>
                                            ) : (
                                                <>
                                                    <Dropdown.Link href="/login" className="text-lg text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
                                                        Pierakstīties
                                                    </Dropdown.Link>
                                                    <Dropdown.Link href="/register" className="text-lg text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
                                                        Reģistrēties
                                                    </Dropdown.Link>
                                                </>
                                            )}
                                        </Dropdown.Content>
                                    </Dropdown>
                            </nav>
                        </div>
                    </div>
                </nav>
            </header>

            <div>{children}</div>

            <footer className="py-16 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Website option Section */}
                    <div className="flex flex-col items-start">
                        <div className="flex flex-col justify-center text-center w-fit min-w-24">
                            <h5 className="font-semibold text-lg text-black dark:text-white mb-2 uppercase">Peonija</h5>
                            <hr className="bg-black/20 dark:bg-white/20 border-0 h-px mb-4" />
                        </div>
                        <nav className="flex flex-col space-y-2">
                        <NavLink to="#" onClick={(e) => {e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' })}}
                            className="w-fit text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
                            Sākums
                        </NavLink>
                        <NavLink to="#" onClick={(e) => {e.preventDefault(); scrollToSection('special_orders')}}
                            className="w-fit text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
                            Piedāvājumi
                        </NavLink>
                        <NavLink to="#" onClick={(e) => {e.preventDefault(); scrollToSection('about')}}
                            className="w-fit text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
                            Par Mums
                        </NavLink>
                        <NavLink to="#" className="w-fit text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
                            Blogs
                        </NavLink>
                        <NavLink to="/galerija" className="w-fit text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
                            Galerija
                        </NavLink>
                        <NavLink to="/shop" className="w-fit text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
                            Interneta Veikals
                        </NavLink>
                        </nav>
                    </div>

                    {/* Rules Section */}
                    <div className="flex flex-col items-start">
                        <div className="w-fit">
                        <h5 className="font-semibold text-lg text-black dark:text-white mb-2">Noteikumi un BUJ</h5>
                        <hr className="bg-black/20 dark:bg-white/20 border-0 h-px mb-4" />
                        </div>
                        <nav className="flex flex-col space-y-2">
                        <NavLink to="#" className="w-fit text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
                            Bieži uzdotie jautājumi
                        </NavLink>
                        <NavLink to="#" className="w-fit text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
                            Privātuma politika
                        </NavLink>
                        </nav>
                    </div>

                    {/* Company Info Section */}
                    <div className="flex flex-col items-start">
                        <div className="w-fit">
                        <h5 className="font-semibold text-lg text-black dark:text-white mb-2">Uzņēmuma informācija</h5>
                        <hr className="bg-black/20 dark:bg-white/20 border-0 h-px mb-4" />
                        </div>
                        <nav className="flex flex-col space-y-2">
                        <span className="w-fit text-gray-600 dark:text-gray-300">
                            Adrese: Uzvaras Bulvāris 1B, Cēsis
                        </span>
                        <span className="w-fit text-gray-600 dark:text-gray-300">
                            Mobilais: <a href="tel:+37129484017" className="hover:text-black dark:hover:text-white">+371 29484071</a>
                        </span>
                        <span className="w-fit text-gray-600 dark:text-gray-300">
                            E-pasts: <br />
                            <a href="mailto:zieduveikalspeonija@gmail.com" className="hover:text-black dark:hover:text-white">
                            zieduveikalspeonija@gmail.com
                            </a>
                        </span>
                        </nav>
                    </div>

                    {/* Social Media Section */}
                    <div className="flex flex-col items-start">
                        <div className="w-fit">
                        <h5 className="font-semibold text-lg text-black dark:text-white mb-2">Sociālie tīkli</h5>
                        <hr className="bg-black/20 dark:bg-white/20 border-0 h-px mb-4" />
                        </div>
                        <nav className="flex flex-col space-y-2">
                        <NavLink to="#" className="w-fit text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
                            Facebook
                        </NavLink>
                        <NavLink to="#" className="w-fit text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
                            Instagram
                        </NavLink>
                        </nav>
                    </div>
                    </div>

                    <div className="mt-16 pt-8 border-t border-black/10 dark:border-white/10">
                    <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                        <p>© Peonija, SIA</p>
                        <p>2021-2024</p>
                    </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
