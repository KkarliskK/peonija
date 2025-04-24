import { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Switch } from '@headlessui/react';
import { FaExclamationTriangle } from 'react-icons/fa';
import PostNotification from '@/Components/Modals/Notification';
import { Inertia } from '@inertiajs/inertia';


export default function StoreStatus({ auth, storeSettings }) {
    const [isStoreOpen, setIsStoreOpen] = useState(storeSettings?.is_open || false);
    const [notifMessage, setNotifMessage] = useState('');
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [notifType, setNotifType] = useState('success');
    
    const dayNameMapping = {
        'Monday': 'Pirmdiena',
        'Tuesday': 'Otrdiena',
        'Wednesday': 'Trešdiena',
        'Thursday': 'Ceturtdiena',
        'Friday': 'Piektdiena',
        'Saturday': 'Sestdiena',
        'Sunday': 'Svētdiena'
    };
    
    const { data, setData, post, processing, errors } = useForm({
        is_open: storeSettings?.is_open || false,
        working_hours: storeSettings?.working_hours || [
            { day: 'Monday', open_time: '09:00', close_time: '18:00', is_open: true },
            { day: 'Tuesday', open_time: '09:00', close_time: '18:00', is_open: true },
            { day: 'Wednesday', open_time: '09:00', close_time: '18:00', is_open: true },
            { day: 'Thursday', open_time: '09:00', close_time: '18:00', is_open: true },
            { day: 'Friday', open_time: '09:00', close_time: '18:00', is_open: true },
            { day: 'Saturday', open_time: '10:00', close_time: '16:00', is_open: true },
            { day: 'Sunday', open_time: '10:00', close_time: '14:00', is_open: false }
        ],
        special_closures: storeSettings?.special_closures || []
    });

    const [newClosure, setNewClosure] = useState({
        date: '',
        reason: '',
    });

    useEffect(() => {
        setData('is_open', isStoreOpen);
    }, [isStoreOpen]);

    const closeNotif = () => {
        setIsNotifOpen(false);
    };

    const showNotification = (message, type = 'success') => {
        setNotifMessage(message);
        setNotifType(type);
        setIsNotifOpen(true);
        setTimeout(() => {
            setIsNotifOpen(false);
        }, 3000);
    };

    const handleToggleStore = (newStatus) => {
        setIsStoreOpen(newStatus);
        
        Inertia.post(route('store.toggleStatus'), {
            is_open: newStatus
        }, {
            onSuccess: () => {
                showNotification(newStatus ? 'Veikals veiksmīgi atvērts!' : 'Veikals veiksmīgi slēgts!');
            },
            onError: () => {
                setIsStoreOpen(!newStatus);
                showNotification('Neizdevās atjaunināt veikala statusu', 'error');
            }
        });
    };

    const updateWorkingHours = (index, field, value) => {
        const updatedHours = [...data.working_hours];
        updatedHours[index][field] = value;
        setData('working_hours', updatedHours);
    };

    const toggleDayStatus = (index) => {
        const updatedHours = [...data.working_hours];
        updatedHours[index].is_open = !updatedHours[index].is_open;
        setData('working_hours', updatedHours);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('store.updateHours'), {
            onSuccess: () => {
                showNotification('Darba stundas veiksmīgi atjauninātas!');
            },
            onError: () => {
                showNotification('Neizdevās atjaunināt darba stundas', 'error');
            }
        });
    };

    const addSpecialClosure = () => {
        if (!newClosure.date || !newClosure.reason) {
            showNotification('Lūdzu, aizpildiet gan datumu, gan iemeslu', 'error');
            return;
        }

        const updatedClosures = [...data.special_closures, newClosure];
        setData('special_closures', updatedClosures);
        setNewClosure({ date: '', reason: '' });
        showNotification('Speciālā slēgšana pievienota');
    };

    const removeSpecialClosure = (index) => {
        const updatedClosures = [...data.special_closures];
        updatedClosures.splice(index, 1);
        setData('special_closures', updatedClosures);
        showNotification('Speciālā slēgšana noņemta');
    };

    return (
        <AdminLayout
            auth={auth}
            user={auth.user}
        >
            <Head title="Veikala statuss" />
            <PostNotification
                isOpen={isNotifOpen}
                message={notifMessage}
                type={notifType}
                onClose={closeNotif}
            />
            <section className="min-h-screen mb-4 bg-gray-50 dark:bg-gray-900">
                <div className="container px-4 py-6 mx-auto sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">Veikala statuss</h1>

                        {/* Main toggle switch */}
                        <div className="p-6 mb-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Veikala statuss</h2>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Atvērt / aizvērt veikalu
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <span className="mr-3 text-sm text-gray-500 dark:text-gray-300">
                                        {isStoreOpen ? 'Atvērts' : 'Slēgts'}
                                    </span>
                                    <Switch
                                        checked={isStoreOpen}
                                        onChange={handleToggleStore}
                                        className={`${
                                            isStoreOpen ? 'bg-green-500' : 'bg-gray-300'
                                        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                                    >
                                        <span
                                            className={`${
                                                isStoreOpen ? 'translate-x-6' : 'translate-x-1'
                                            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                                        />
                                    </Switch>
                                </div>
                            </div>

                            {!isStoreOpen && (
                                <div className="flex items-center p-4 mt-4 bg-orange-100 border-l-4 border-orange-500 rounded dark:bg-orange-900/30 dark:border-orange-400">
                                    <FaExclamationTriangle className="mr-3 text-orange-500" />
                                    <span className="text-sm text-orange-700 dark:text-orange-300">
                                        Interneta veikals šobrīd ir slēgts. Lietotāji nevarēs veikt pasūtījumus.
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Working hours form */}
                        <form onSubmit={handleSubmit} className="p-6 mb-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
                            <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Regulārās darba stundas</h2>
                            
                            <div className="mb-6">
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-left text-gray-500 border-b dark:border-gray-700">
                                            <th className="pb-2">Diena</th>
                                            <th className="pb-2">Atvēršanas laiks</th>
                                            <th className="pb-2">Slēgšanas laiks</th>
                                            <th className="pb-2">Statuss</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.working_hours.map((day, index) => (
                                            <tr key={day.day} className="border-b dark:border-gray-700">
                                                <td className="py-3">
                                                    <span className="font-medium text-gray-700 dark:text-gray-200">
                                                        {dayNameMapping[day.day]}
                                                    </span>
                                                </td>
                                                <td className="py-3">
                                                    <input
                                                        type="time"
                                                        value={day.open_time}
                                                        onChange={(e) => updateWorkingHours(index, 'open_time', e.target.value)}
                                                        disabled={!day.is_open}
                                                        className="w-full p-2 text-sm border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                    />
                                                </td>
                                                <td className="py-3">
                                                    <input
                                                        type="time"
                                                        value={day.close_time}
                                                        onChange={(e) => updateWorkingHours(index, 'close_time', e.target.value)}
                                                        disabled={!day.is_open}
                                                        className="w-full p-2 text-sm border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                    />
                                                </td>
                                                <td className="py-3">
                                                    <Switch
                                                        checked={day.is_open}
                                                        onChange={() => toggleDayStatus(index)}
                                                        className={`${
                                                            day.is_open ? 'bg-green-500' : 'bg-gray-300'
                                                        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                                                    >
                                                        <span
                                                            className={`${
                                                                day.is_open ? 'translate-x-6' : 'translate-x-1'
                                                            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                                                        />
                                                    </Switch>
                                                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                                                        {day.is_open ? 'Atvērts' : 'Slēgts'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                                >
                                    {processing ? 'Saglabā...' : 'Saglabāt darba stundas'}
                                </button>
                            </div>
                        </form>

                        {/* Special closures section */}
                        <div className="p-6 mb-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
                            <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Speciālās slēgšanas</h2>
                            <p className="mb-4 text-gray-600 dark:text-gray-300">
                                Pievieno speciālos datumus, kad veikals būs slēgts (svētku dienas, atvaļinājums, u.c.)
                            </p>

                            <div className="grid gap-4 mb-4 sm:grid-cols-3">
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Datums</label>
                                    <input
                                        type="date"
                                        value={newClosure.date}
                                        onChange={(e) => setNewClosure({...newClosure, date: e.target.value})}
                                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Iemesls</label>
                                    <div className="flex">
                                        <input
                                            type="text"
                                            value={newClosure.reason}
                                            onChange={(e) => setNewClosure({...newClosure, reason: e.target.value})}
                                            placeholder="piem., svētku brīvdienas, atvaļinājums"
                                            className="w-full p-2 border rounded-l rounded-r-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        />
                                        <button
                                            type="button"
                                            onClick={addSpecialClosure}
                                            className="px-4 py-2 text-white bg-blue-600 rounded-l-none rounded-r hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        >
                                            Pievienot
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {data.special_closures.length > 0 ? (
                                <div className="mt-4 overflow-hidden border rounded dark:border-gray-700">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 dark:bg-gray-700">
                                            <tr>
                                                <th className="px-4 py-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-300">Datums</th>
                                                <th className="px-4 py-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-300">Iemesls</th>
                                                <th className="px-4 py-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-300">Darbības</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {data.special_closures.map((closure, index) => (
                                                <tr key={index}>
                                                    <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap dark:text-gray-300">
                                                        {closure.date}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                                        {closure.reason}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm whitespace-nowrap">
                                                        <button
                                                            type="button"
                                                            onClick={() => removeSpecialClosure(index)}
                                                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                                        >
                                                            Noņemt
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500 dark:text-gray-400">Nav pievienota neviena speciālā diena.</p>
                            )}

                            <div className="flex justify-end mt-4">
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={processing}
                                    className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                                >
                                    {processing ? 'Saglabā...' : 'Saglabāt speciālās dienas'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AdminLayout>
    );
}