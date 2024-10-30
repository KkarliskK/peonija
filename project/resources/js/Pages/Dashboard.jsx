import DashboardBox from '@/Components/Modals/DashboardBox';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { FiShoppingCart } from "react-icons/fi";
import { FaUserEdit } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Dashboard" />
            <section className='min-h-[60dvh] h-auto'>
                <div className="w-full min-h-screen h-auto mx-auto sm:px-6 lg:px-8">
                    <div className="px-12 overflow-hidden">
                        <div className="text-gray-900 dark:text-gray-100">
                            <h1 className='text-semibold text-3xl'>Sveiks {auth.user.name}!</h1>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-7xl mx-auto ">
                        <DashboardBox 
                            title="Prikumu vēsture" 
                            description="Pievienot jaunas vai rediģēt esošās kategorijas interneta veikalam." 
                            //link={route('categories.index')} add order history route here
                            icon={FiShoppingCart}
                        />
                        <DashboardBox 
                            className="h-1/5"
                            title="Rediģēt profilu" 
                            description="Pievienot jaunus vai rediģēt esošos produktus interneta veikalam." 
                            link={'/profile'} 
                            icon={FaUserEdit}
                        />
                        <DashboardBox 
                            className="h-1/5"
                            title="Saglabātās preces" 
                            description='Preces, kuras tu interneta veikalā esi atzīmējis ar "Patīk".'
                            link={'/saved-products'} 
                            icon={CiHeart}
                        />
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
