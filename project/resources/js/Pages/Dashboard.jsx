import DashboardBox from '@/Components/Modals/DashboardBox';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Head } from '@inertiajs/react';
import { FiShoppingCart, FiPackage, FiTag, FiBell } from "react-icons/fi";
import { FaUserEdit } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";

export default function Dashboard({ auth, news }) {  
    
        const getIconComponent = (iconName) => {
        const iconComponents = {
            'FiBell': FiBell,
            'FiTag': FiTag,
            'FiPackage': FiPackage,
            'FiShoppingCart': FiShoppingCart,
            'FaUserEdit': FaUserEdit,
            'CiHeart': CiHeart
            //more icons coming soon
        };
        
        return iconComponents[iconName] || FiBell; 
        };
    
    return (
            <AuthenticatedLayout auth={auth}>
            <Head title="Dashboard" />
            <section className='min-h-screen mb-4 bg-gray-50 dark:bg-gray-900'>
                <div className="container w-full px-4 mx-auto sm:px-6 lg:px-8">
                    <div className="py-12 mx-auto max-w-7xl">
                        <div className="text-gray-900 dark:text-gray-100">
                            <h1 className='text-4xl font-bold tracking-tight'>
                                Sveiks, <span className="text-accent">{auth.user.name}</span>!
                            </h1>
                            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                                Ko vēlaties darīt šodien?
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 mx-auto sm:grid-cols-2 lg:grid-cols-3 max-w-7xl">
                        <DashboardBox 
                            title="Prikumu vēsture"
                            description="Pārskatiet savus iepriekšējos pirkumus un pasūtījumu statusus."
                            icon={FiShoppingCart}
                            link={'/order-history'}
                        />
                        <DashboardBox 
                            title="Rediģēt profilu" 
                            description="Atjauniniet savu profila informāciju un iestatījumus." 
                            link={'/profile'} 
                            icon={FaUserEdit}
                        />
                        <DashboardBox 
                            title="Saglabātās preces" 
                            description='Apskatiet savas atzīmētās preces un pievienojiet tās grozam.'
                            link={'/saved-products'} 
                            icon={CiHeart}
                        />
                    </div>

                    {/* News Section */}
                    <div className="mx-auto mt-16 max-w-7xl">
                        <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">Jaunumi</h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {news && news.length > 0 ? news.map((item) => {
                                const IconComponent = getIconComponent(item.icon || 'FiBell');
                                
                                return (
                                    <div 
                                        key={item.id}
                                        className={`p-6 text-white shadow-md bg-gradient-to-r from-${item.from_color} to-${item.to_color} rounded-xl`}
                                    >
                                        {IconComponent && <IconComponent className="w-8 h-8 mb-4" />}
                                        <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                                        <p>{item.content}</p>
                                    </div>
                                );
                            }) : (
                                <div className="col-span-2 p-6 text-center bg-white shadow-md dark:bg-gray-800 rounded-xl">
                                    <p className="text-gray-500 dark:text-gray-400">Nav jaunu ziņu.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}