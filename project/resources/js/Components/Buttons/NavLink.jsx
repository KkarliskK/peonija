import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-1 pt-1 border-b-2 leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-accent dark:border-accent text-gray-900 dark:text-gray-100 focus:border-accent '
                    : 'border-transparent text-black dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-accent dark:hover:border-accent focus:text-gray-700 dark:focus:text-gray-300 focus:border-accent dark:focus:border-accent ') +
                className
            }
        >
            {children}
        </Link>
    );
}
