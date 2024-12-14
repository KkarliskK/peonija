import DashboardBox from '@/Components/Modals/DashboardBox';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { FaStoreAlt, FaTv } from 'react-icons/fa';
import { IoIosAddCircleOutline } from "react-icons/io";



export default function AdminDashboard({ auth }) {
    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Admin Dashboard</h2>}
        >
            <Head title="Admin Dashboard" />

            <div className="grid grid-cols-1 h-[60dvh] sm:grid-cols-2 gap-6 max-w-7xl mx-auto ">
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
        </AdminLayout>
    );
}
