import { useEffect, useRef, useState } from 'react';
import logo from '../../assets/Peonija_logo.webp';
import Dropdown from '@/Components/Buttons/Dropdown';
import NavLink from '@/Components/Buttons/NavLink';
import ResponsiveNavLink from '@/Components/Input/ResponsiveNavLink';
import { Link } from '@inertiajs/react';

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
        <div className="flex justify-between flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 p-2">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <img src={logo} loading='lazy' className="h-18 sm:h-20" alt="Your Logo" />                               
                                </Link>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Panelis
                                </NavLink>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href={route('shop.index')} active={route().current('shop.index')}>
                                    Interneta veikals 
                                </NavLink>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href={route('cart.index')} active={route().current('cart.index')}>
                                    Iepirkuma Grozs 
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative">
                            <Dropdown>
                                        <Dropdown.Trigger>
                                        <button
                                            ref={dropdownRef}
                                            onClick={toggleDropdown}
                                            className="w-full text-black rounded-3xl p-3 sm:py-2 inline-flex items-center relative"
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
                                            <Dropdown.Link href="#" className="text-gray-700 dark:text-gray-200">Galerija</Dropdown.Link>
                                            <Dropdown.Link href="/dashboard" className="text-gray-700 dark:text-gray-200">Profils</Dropdown.Link>
                                            <Dropdown.Link onClick={toggleDarkMode} className="text-gray-700 dark:text-gray-200">
                                                Gaišais režīms
                                            </Dropdown.Link>
                                            
                                            {auth  ? (
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
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
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
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white dark:bg-gray-800 shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>


            <footer className="py-16 text-center text-sm h-auto bg-white dark:bg-gray-800 text-black dark:text-white/70">
                <div className='flex sm:flex-row flex-col justify-center items-center w-full'>
                    <div className='flex flex-col justify-center items-start p-2 m-2'>
                        <p>Sākums</p>
                        <p>Populāri piedāvājumi</p>
                        <p>Par mums</p>
                        <p>Blogs</p>
                        <p>Galerija</p>
                        <p>Interneta veikals</p>
                    </div>
                    <div className='flex flex-col justify-center items-center p-2 m-2'>
                        <h3 className='font-semibold text-md'>Noteikumi un BUJ</h3>
                        <p>Privātuma politika</p>
                    </div>
                    <div className='flex flex-col justify-center items-center p-2 m-2'>
                        <h3 className='font-semibold text-md'>Sazinies ar mums</h3>
                        <p>Adrese: Uzvaras Bulvāris 1B, Cēsis</p>
                        <p>Mobilais: <a href='tel:+37129484017'>+371 29484071</a></p>
                        <p>E-pasts: <a href="mailto: zieduveikalspeonija@gmail.com">zieduveikalspeonija@gmail.com</a></p>
                    </div>
                    <div className='flex flex-col justify-center items-center p-2 m-2'>
                        <p>© Peonija, SIA</p>
                        <p>2021-2024</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
