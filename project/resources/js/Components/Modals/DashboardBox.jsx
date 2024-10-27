import React from 'react';

export default function DashboardBox({ title, description, link, icon: Icon, onClick, className}) {
    return (
        <a 
            href={link} 
            className="relative flex items-center flex-col justify-center p-6 bg-white dark:bg-gray-800 h-full rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out mt-20 cursor-pointer"
            onClick={onClick}
        >
            {Icon && (
                <div className="flex items-center justify-center">
                    <Icon className="text-gray-300 dark:text-gray-600 w-36 h-36" />
                </div>
            )} 
            <div className="relative z-10 text-center">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{title}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
            </div>
        </a>
    );
}
