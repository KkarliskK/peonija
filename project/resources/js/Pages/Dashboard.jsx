import DashboardBox from '@/Components/Modals/DashboardBox';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import { FiShoppingCart, FiPackage, FiTag, FiBell } from "react-icons/fi";
import { FaUserEdit } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";

export default function Dashboard({ auth }) {
    return (
            <GuestLayout auth={auth}>
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

                    {/* Current Promotions */}
                    <div className="mx-auto mt-16 max-w-7xl">
                        <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">Aktīvās akcijas</h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="p-6 text-white shadow-md bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                                <FiTag className="w-8 h-8 mb-4" />
                                <h3 className="mb-2 text-xl font-semibold">Jauno klientu atlaide</h3>
                                <p>Saņemiet 10% atlaidi savam pirmajam pirkumam</p>
                            </div>
                            <div className="p-6 text-white shadow-md bg-gradient-to-r from-green-500 to-teal-500 rounded-xl">
                                <FiPackage className="w-8 h-8 mb-4" />
                                <h3 className="mb-2 text-xl font-semibold">Bezmaksas piegāde</h3>
                                <p>Pasūtījumiem virs 50€</p>
                            </div>
                        </div>
                    </div>

                    {/* Notifications Section */}
                    <div className="mx-auto mt-16 mb-16 max-w-7xl">
                        <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">Paziņojumi</h2>
                        <div className="overflow-hidden bg-white shadow-md dark:bg-gray-800 rounded-xl">
                            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                <div className="flex items-start gap-4 p-6">
                                    <FiBell className="w-6 h-6 mt-1 text-accent" />
                                    <div>
                                        <h3 className="font-medium text-gray-900 dark:text-white">Laipni lūdzam mūsu veikalā!</h3>
                                        <p className="mt-1 text-gray-500 dark:text-gray-400">Izpētiet mūsu jaunāko produktu klāstu un īpašos piedāvājumus.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}