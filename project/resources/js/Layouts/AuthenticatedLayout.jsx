import { useEffect, useRef, useState } from 'react';
import logo from '../../assets/Peonija_logo.webp';
import Dropdown from '@/Components/Buttons/Dropdown';
import NavLink from '@/Components/Buttons/NavLink';
import ResponsiveNavLink from '@/Components/Input/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import CartIcon from '@/Components/Modals/CartIcon';
import SitePreferences from "@/Components/Modals/SitePreferences";

export default function Authenticated({ auth, header, children}) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

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
        <div className="flex flex-col justify-between min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav className="p-2 bg-white border-b border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex items-center shrink-0">
                                <Link href="/">
                                    <img src={logo} loading='lazy' className="h-16 sm:h-20" alt="Your Logo" />                               
                                </Link>
                            </div>
                            {auth?.user && (
                                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                    <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                        Panelis
                                    </NavLink>
                                </div>
                            )}
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href={route('shop.index')} active={route().current('shop.index')}>
                                    Interneta veikals 
                                </NavLink>
                            </div>
                            {auth?.user && (
                                <>
                                    <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                        <NavLink href={route('order.history')} active={route().current('order.history')}>
                                            Pirkumu vēsture 
                                        </NavLink>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            {/* Add CartIcon to desktop view */}
                            <div className="mr-4">
                                <CartIcon />
                            </div>

                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button
                                            ref={dropdownRef}
                                            onClick={toggleDropdown}
                                            className="relative inline-flex items-center w-full p-3 text-black rounded-3xl sm:py-2 dark:text-gray-200"
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
                                        <Dropdown.Link href="/galerija" className="text-gray-700 dark:text-gray-200">Galerija</Dropdown.Link>
                                        
                                        <Dropdown.Link onClick={toggleDarkMode} className="text-gray-700 dark:text-gray-200">
                                            {darkMode ? 'Gaišais' : 'Tumšais'} Režīms
                                        </Dropdown.Link>
                                        
                                        {auth?.user ? (
                                            <>
                                                <Dropdown.Link href="/dashboard" className="text-gray-700 dark:text-gray-200">Profils</Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route('logout')}
                                                    method="post"
                                                    as="button"
                                                    className="text-lg text-red-500 dark:text-red-400"
                                                >
                                                    Izrakstīties
                                                </Dropdown.Link>
                                            </>
                                        ) : (
                                            <>
                                                <Dropdown.Link href="/login" className="text-gray-700 dark:text-gray-200 ">
                                                    Pierakstīties
                                                </Dropdown.Link>
                                                <Dropdown.Link href="/register" className="text-gray-700 dark:text-gray-200 ">
                                                    Reģistrēties
                                                </Dropdown.Link>
                                            </>
                                        )}
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="flex items-center -me-2 sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400"
                            >
                                <svg className="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        {auth?.user && (
                            <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                                Profila Panelis
                            </ResponsiveNavLink>
                        )}
                        <ResponsiveNavLink href={route('shop.index')} active={route().current('shop.index')}>
                            Interneta Veikals
                        </ResponsiveNavLink>
                        {auth?.user && (
                            <>
                                <ResponsiveNavLink href={route('cart.index')} active={route().current('cart.index')}>
                                    Iepirkumu Grozs
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href={route('order.history')} active={route().current('order.history')}>
                                    Pirkumu Vēsture
                                </ResponsiveNavLink>
                            </>
                        )}
                        <ResponsiveNavLink href={route('gallery.index')} active={route().current('gallery.index')}>
                            Galerija
                        </ResponsiveNavLink>

                        {/* Cart Icon in Mobile View */}
                        {auth?.user && (
                            <div className="flex items-center justify-between p-2 text-lg text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white">
                                <CartIcon />
                            </div>
                        )}
                    </div>

                    {auth?.user ? (
                        <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route('profile.edit')}>Profils</ResponsiveNavLink>
                                <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                    Izrakstīties
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    ) : (
                        <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href="/login">Pierakstīties</ResponsiveNavLink>
                                <ResponsiveNavLink href="/register">Reģistrēties</ResponsiveNavLink>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow dark:bg-gray-800">
                    <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>
                {children}
                <SitePreferences />   
            </main>


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
                        <NavLink to="#" onClick={(e) => {e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' })}}
                            className="text-gray-600 w-fit dark:text-gray-300 hover:text-black dark:hover:text-white">
                            Sākums
                        </NavLink>
                        <NavLink to="#" onClick={(e) => {e.preventDefault(); scrollToSection('special_orders')}}
                            className="text-gray-600 w-fit dark:text-gray-300 hover:text-black dark:hover:text-white">
                            Piedāvājumi
                        </NavLink>
                        <NavLink to="#" onClick={(e) => {e.preventDefault(); scrollToSection('about')}}
                            className="text-gray-600 w-fit dark:text-gray-300 hover:text-black dark:hover:text-white">
                            Par Mums
                        </NavLink>
                        <NavLink to="#" className="text-gray-600 w-fit dark:text-gray-300 hover:text-black dark:hover:text-white">
                            Blogs
                        </NavLink>
                        <NavLink to="/galerija" className="text-gray-600 w-fit dark:text-gray-300 hover:text-black dark:hover:text-white">
                            Galerija
                        </NavLink>
                        <NavLink to="/shop" className="text-gray-600 w-fit dark:text-gray-300 hover:text-black dark:hover:text-white">
                            Interneta Veikals
                        </NavLink>
                        </nav>
                    </div>

                    {/* Rules Section */}
                    <div className="flex flex-col items-center sm:items-start">
                        <div className="w-fit">
                        <h5 className="mb-2 text-lg font-semibold text-black dark:text-white">Noteikumi un BUJ</h5>
                        <hr className="h-px mb-4 border-0 bg-black/20 dark:bg-white/20" />
                        </div>
                        <nav className="flex flex-col items-center space-y-2 sm:items-start">
                        <NavLink to="#" className="text-gray-600 w-fit dark:text-gray-300 hover:text-black dark:hover:text-white">
                            Bieži uzdotie jautājumi
                        </NavLink>
                        <NavLink to="/privacy-policy" className="text-gray-600 w-fit dark:text-gray-300 hover:text-black dark:hover:text-white">
                            Privātuma politika
                        </NavLink>
                        </nav>
                    </div>

                    {/* Company Info Section */}
                    <div className="flex flex-col items-center sm:items-start">
                        <div className="w-fit">
                        <h5 className="mb-2 text-lg font-semibold text-black dark:text-white">Uzņēmuma informācija</h5>
                        <hr className="h-px mb-4 border-0 bg-black/20 dark:bg-white/20" />
                        </div>
                        <nav className="flex flex-col items-center space-y-2 sm:items-start">
                        <span className="text-gray-600 w-fit dark:text-gray-300">
                            Adrese: Uzvaras Bulvāris 1B, Cēsis
                        </span>
                        <span className="text-gray-600 w-fit dark:text-gray-300">
                            Mobilais: <a href="tel:+37129484017" className="hover:text-black dark:hover:text-white">+371 29484071</a>
                        </span>
                        <span className="text-gray-600 w-fit dark:text-gray-300">
                            E-pasts: <br />
                            <a href="mailto:zieduveikalspeonija@gmail.com" className="hover:text-black dark:hover:text-white">
                            zieduveikalspeonija@gmail.com
                            </a>
                        </span>
                        </nav>
                    </div>

                    {/* Social Media Section */}
                    <div className="flex flex-col items-center sm:items-start">
                        <div className="w-fit">
                        <h5 className="mb-2 text-lg font-semibold text-black dark:text-white">Sociālie tīkli</h5>
                        <hr className="h-px mb-4 border-0 bg-black/20 dark:bg-white/20" />
                        </div>
                        <nav className="flex flex-col items-center space-y-2 sm:items-start">
                        <NavLink to="#" className="text-gray-600 w-fit dark:text-gray-300 hover:text-black dark:hover:text-white">
                            Facebook
                        </NavLink>
                        <NavLink to="#" className="text-gray-600 w-fit dark:text-gray-300 hover:text-black dark:hover:text-white">
                            Instagram
                        </NavLink>
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
        </div>
    );
}
