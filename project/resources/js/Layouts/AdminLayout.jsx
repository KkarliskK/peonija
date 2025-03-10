import { useEffect, useRef, useState } from 'react';
import logo from '../../assets/Peonija_logo.png';
import Dropdown from '@/Components/Buttons/Dropdown';
import NavLink from '@/Components/Buttons/NavLink';
import ResponsiveNavLink from '@/Components/Input/ResponsiveNavLink';
import { Link } from '@inertiajs/react';

export default function Authenticated({ user, header, children, auth }) {
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
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav className="py-4 bg-white border-b border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex items-center shrink-0">
                                <Link href="/">
                                    <img src={logo} alt='logo' className="h-20" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Admin Dashboard
                                </NavLink>
                                <NavLink href={route('products.index')} active={route().current('dashboard')}>
                                    Pārvaldīt produktus
                                </NavLink>
                                <NavLink href={route('categories.index')} active={route().current('dashboard')}>
                                    Pārvaldīt kategorijas
                                </NavLink>
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Veikala statuss
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
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
                                                <Dropdown.Link href="/dashboard" className="text-gray-700 dark:text-gray-200">Admin panelis</Dropdown.Link>
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
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Admin Panelis
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800 dark:text-gray-200">{user.name}</div>
                            <div className="text-sm font-medium text-gray-500">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Izrakstīties
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow dark:bg-gray-800">
                    <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
        
    );
}
