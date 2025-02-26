import React from 'react';

export default function DashboardBox({ title, description, link, icon: Icon, onClick, className }) {
    return (
        <a 
            href={link} 
            className="relative flex flex-col items-center justify-center h-full p-8 transition-all duration-300 ease-in-out bg-white shadow-lg cursor-pointer group dark:bg-gray-800 rounded-xl hover:shadow-xl hover:-translate-y-1"
            onClick={onClick}
        >
            {Icon && (
                <div className="flex items-center justify-center mb-6 transition-transform duration-300 transform group-hover:scale-105">
                    <Icon className="w-32 h-32 transition-colors duration-300 text-primary-pink/30 group-hover:text-primary-pink-40" />
                </div>
            )} 
            <div className="relative z-10 text-center">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{title}</h3>
                <p className="mt-3 text-gray-600 dark:text-gray-400">{description}</p>
            </div>
            <div className="absolute bottom-0 left-0 w-0 h-1 transition-all duration-300 bg-primary-pink group-hover:w-full"></div>
        </a>
    );
}