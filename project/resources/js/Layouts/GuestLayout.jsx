import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import Dropdown from '@/Components/Buttons/Dropdown';
import { useState, useEffect, useRef } from 'react';
import logo from '../../assets/Peonija_logo.webp';
import NavLink from '@/Components/Buttons/NavLink';
import CartIcon from '@/Components/Modals/CartIcon';
import { FaShoppingCart } from 'react-icons/fa';
import SitePreferences from "@/Components/Modals/SitePreferences";
import SiteMessage from "@/Components/Modals/SiteMessage";

export default function GuestLayout({ auth, children }) {
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
    const [isOpen, setIsOpen] = useState(false);
    const [isDropOpen, setIsDropOpen] = useState(false);
    const dropdownRef = useRef(null);

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

    const toggleDarkMode = () => setDarkMode(!darkMode);
    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) section.scrollIntoView({ behavior: 'smooth' });
    };

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleDropdown = () => setIsDropOpen(!isDropOpen);

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
            <header id="home" className="sticky top-0 z-50 bg-white shadow-sm dark:bg-gray-900">
                <nav className="relative w-full bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
                    <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4 py-2.5">
                        <a href="/" className="flex items-center">
                            <img src={logo} className="h-18 sm:h-20" alt="Your Logo" />
                        </a>

                        {/* Navigation Links + Cart Icon */}
                        <div className="items-center hidden space-x-6 md:flex">
                            <nav className="space-x-4">
                                <NavLink to="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Sākums</NavLink>
                                <NavLink to="#" onClick={(e) => { e.preventDefault(); scrollToSection('special_orders'); }}>Piedāvājumi</NavLink>
                                <NavLink to="#" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>Par Mums</NavLink>
                                <NavLink to="#" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Kontakti</NavLink>
                            </nav>

                            {/* Cart Icon */}
                            <CartIcon />

                            {/* More Dropdown */}
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button ref={dropdownRef} onClick={toggleDropdown} className="relative inline-flex items-center w-full p-3 text-lg text-black rounded-3xl sm:py-2 dark:text-gray-200">
                                        Vairāk
                                        <svg className={`w-2.5 h-2.5 ms-3 transition-transform duration-300 ${isDropOpen ? 'rotate-180' : 'rotate-0'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href="/shop" className="text-gray-700 dark:text-gray-200">Interneta veikals</Dropdown.Link>
                                    <Dropdown.Link href="#" className="text-gray-700 dark:text-gray-200">Blogs</Dropdown.Link>
                                    <Dropdown.Link href="/galerija" className="text-gray-700 dark:text-gray-200">Galerija</Dropdown.Link>
                                    <Dropdown.Link href="/dashboard" className="text-gray-700 dark:text-gray-200">Profils</Dropdown.Link>
                                    <Dropdown.Link onClick={toggleDarkMode} className="text-gray-700 dark:text-gray-200">Gaišais režīms</Dropdown.Link>
                                    {auth?.user ? (
                                        <Dropdown.Link href={route('logout')} method="post" as="button" className="text-lg text-red-500 dark:text-red-400">Izrakstīties</Dropdown.Link>
                                    ) : (
                                        <>
                                            <Dropdown.Link href="/login" className="text-gray-700 dark:text-gray-200">Pierakstīties</Dropdown.Link>
                                            <Dropdown.Link href="/register" className="text-gray-700 dark:text-gray-200">Reģistrēties</Dropdown.Link>
                                        </>
                                    )}
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {/* Mobile Menu Button */}
                        <button onClick={toggleMenu} type="button" className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg ms-3 md:hidden hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {isOpen && (
                        <div className="bg-white border-t border-gray-200 md:hidden dark:bg-gray-900 dark:border-gray-700">
                            <nav className="flex flex-col p-4 space-y-4" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                                <NavLink to="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-lg text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white">Sākums</NavLink>
                                <NavLink to="#" onClick={(e) => { e.preventDefault(); scrollToSection('special_orders'); }} className="text-lg text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white">Piedāvājumi</NavLink>
                                <NavLink to="#" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} className="text-lg text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white">Par Mums</NavLink>
                                <NavLink to="#" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="text-lg text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white">Kontakti</NavLink>

                                <div className="flex items-center justify-between p-2 text-lg text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white">
                                    <CartIcon />
                                </div>

                                {/* Dropdown in Mobile Menu */}
                                <NavLink href="/shop" className="text-lg text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white">Interneta veikals</NavLink>
                                <NavLink href="#" className="text-lg text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white">Blogs</NavLink>
                                <NavLink href="/galerija" className="text-lg text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white">Galerija</NavLink>
                                <NavLink href="/dashboard" className="text-lg text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white">Profils</NavLink>
                                <button onClick={toggleDarkMode} className="w-full text-lg text-left text-gray-700 ps-1 dark:text-gray-200 hover:text-black dark:hover:text-white">Gaišais režīms</button>
                                {auth?.user ? (
                                    <NavLink href={route('logout')} method="post" as="button" className="text-lg text-red-500 dark:text-red-400">Izrakstīties</NavLink>
                                ) : (
                                    <>
                                        <NavLink href="/login" className="text-lg text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white">Pierakstīties</NavLink>
                                        <NavLink href="/register" className="text-lg text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white">Reģistrēties</NavLink>
                                    </>
                                )}
                            </nav>
                        </div>
                    )}
                </nav>
            </header>

            <div>
                {children}
                {/* <SiteMessage /> */}
                <SitePreferences />
            </div>
            

            <footer className="py-16 dark:bg-gray-800">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {/* Website option Section */}
                        <div className="flex flex-col items-center sm:items-start">
                            <div className="flex flex-col justify-center text-center w-fit min-w-24">
                                <h5 className="mb-2 text-lg font-semibold text-black uppercase dark:text-white">Peonija</h5>
                                <hr className="h-px mb-4 border-0 bg-black/20 dark:bg-white/20" />
                            </div>
                            <nav className="flex flex-col items-center space-y-2 sm:items-start">
                                <NavLink to="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-gray-600 w-fit dark:text-gray-300 hover:text-black dark:hover:text-white">Sākums</NavLink>
                                <NavLink to="#" onClick={(e) => { e.preventDefault(); scrollToSection('special_orders'); }} className="text-gray-600 w-fit dark:text-gray-300 hover:text-black dark:hover:text-white">Piedāvājumi</NavLink>
                                <NavLink to="#" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} className="text-gray-600 w-fit dark:text-gray-300 hover:text-black dark:hover:text-white">Par Mums</NavLink>
                                <NavLink to="#" className="text-gray-600 w-fit dark:text-gray-300 hover:text-black dark:hover:text-white">Blogs</NavLink>
                                <NavLink to="/galerija" className="text-gray-600 w-fit dark:text-gray-300 hover:text-black dark:hover:text-white">Galerija</NavLink>
                                <NavLink to="/shop" className="text-gray-600 w-fit dark:text-gray-300 hover:text-black dark:hover:text-white">Interneta Veikals</NavLink>
                            </nav>
                        </div>

                        {/* Rules Section */}
                        <div className="flex flex-col items-center sm:items-start">
                            <div className="w-fit">
                                <h5 className="mb-2 text-lg font-semibold text-black dark:text-white">Noteikumi un BUJ</h5>
                                <hr className="h-px mb-4 border-0 bg-black/20 dark:bg-white/20" />
                            </div>
                            <nav className="flex flex-col items-center space-y-2 sm:items-start">
                                <NavLink to="#" className="text-gray-600 w-fit dark:text-gray-300 hover:text-black dark:hover:text-white">Bieži uzdotie jautājumi</NavLink>
                                <NavLink href="/private-rules" className="text-gray-600 w-fit dark:text-gray-300 hover:text-black dark:hover:text-white">Privātuma politika</NavLink>
                            </nav>
                        </div>

                        {/* Company Info Section */}
                        <div className="flex flex-col items-center sm:items-start">
                            <div className="w-fit">
                                <h5 className="mb-2 text-lg font-semibold text-black dark:text-white">Uzņēmuma informācija</h5>
                                <hr className="h-px mb-4 border-0 bg-black/20 dark:bg-white/20" />
                            </div>
                            <nav className="flex flex-col items-center space-y-2 sm:items-start">
                                <span className="text-gray-600 w-fit dark:text-gray-300">Adrese: Uzvaras Bulvāris 1B, Cēsis</span>
                                <span className="text-gray-600 w-fit dark:text-gray-300">Mobilais: <a href="tel:+37129484017" className="hover:text-black dark:hover:text-white">+371 29484071</a></span>
                                <span className="text-gray-600 w-fit dark:text-gray-300">E-pasts: <br /><a href="mailto:zieduveikalspeonija@gmail.com" className="hover:text-black dark:hover:text-white">zieduveikalspeonija@gmail.com</a></span>
                            </nav>
                        </div>

                        {/* Social Media Section */}
                        <div className="flex flex-col items-center sm:items-start">
                            <div className="w-fit">
                                <h5 className="mb-2 text-lg font-semibold text-black dark:text-white">Sociālie tīkli</h5>
                                <hr className="h-px mb-4 border-0 bg-black/20 dark:bg-white/20" />
                            </div>
                            <nav className="flex flex-col items-center space-y-2 sm:items-start">
                                <NavLink to="#" className="text-gray-600 w-fit dark:text-gray-300 hover:text-black dark:hover:text-white">Facebook</NavLink>
                                <NavLink to="#" className="text-gray-600 w-fit dark:text-gray-300 hover:text-black dark:hover:text-white">Instagram</NavLink>
                            </nav>
                        </div>
                    </div>

                    <div className="pt-8 mt-16 border-t border-black/10 dark:border-white/10">
                        <div className="text-sm text-center text-gray-600 dark:text-gray-400">
                            <p>© Peonija, SIA</p>
                            <p>2021-2024</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}