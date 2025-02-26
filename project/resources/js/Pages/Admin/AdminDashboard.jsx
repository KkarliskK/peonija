import DashboardBox from '@/Components/Modals/DashboardBox';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { FaStoreAlt, FaTv, FaChartLine, FaBox, FaUsers, FaShoppingBag } from 'react-icons/fa';
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdPayment, MdSettings } from "react-icons/md";

export default function AdminDashboard({ auth }) {
    return (
        <AdminLayout
            user={auth.user}
        >
            <Head title="Admin Dashboard" />
            <section className='min-h-screen mb-4 bg-gray-50 dark:bg-gray-900'>
                <div className="container px-4 py-6 mx-auto sm:px-6 lg:px-8">
                    {/* Quick Stats Row */}
                    <div className="mx-auto max-w-7xl">
                        <div className="grid grid-cols-2 gap-4 mb-8 md:grid-cols-4">
                            <div className="p-4 bg-white shadow-sm dark:bg-gray-800 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <FaBox className="w-5 h-5 text-blue-500" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Produkti</p>
                                        <p className="text-xl font-semibold">245</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-white shadow-sm dark:bg-gray-800 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <FaUsers className="w-5 h-5 text-green-500" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Lietotāji</p>
                                        <p className="text-xl font-semibold">1,234</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-white shadow-sm dark:bg-gray-800 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <FaShoppingBag className="w-5 h-5 text-purple-500" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Pasūtījumi</p>
                                        <p className="text-xl font-semibold">89</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-white shadow-sm dark:bg-gray-800 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <FaChartLine className="w-5 h-5 text-red-500" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Ieņēmumi</p>
                                        <p className="text-xl font-semibold">€3,456</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Grid */}
                        <div className="grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 lg:grid-cols-3 max-w-7xl">
                            <DashboardBox 
                                title="Pievienot vai rediģēt kategorijas" 
                                description="Pievienot jaunas vai rediģēt esošās kategorijas interneta veikalam." 
                                link={route('categories.index')} 
                                icon={IoIosAddCircleOutline}
                            />
                            <DashboardBox 
                                title="Pievienot vai rediģēt produktu" 
                                description="Pievienot jaunus vai rediģēt esošos produktus interneta veikalam." 
                                link={route('products.index')} 
                                icon={IoIosAddCircleOutline}
                            />
                            <DashboardBox 
                                title="Veikala statuss" 
                                description="Pārbaudi vai maini veikala darba laiku un maini veikala statusu (atvērts / slēgts)." 
                                link={route('products.index')} 
                                icon={FaStoreAlt}
                            />
                            <DashboardBox 
                                title="Slaidrāde" 
                                description="Slaidrāde veikala TV" 
                                link={route('slideshow.index')}
                                icon={FaTv}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </AdminLayout>
    );
}