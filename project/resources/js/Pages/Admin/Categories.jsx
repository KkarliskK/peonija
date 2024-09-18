import DashboardBox from '@/Components/DashboardBox';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaEdit } from 'react-icons/fa';
import Popup from '@/Components/Popup';
import { useState } from 'react';
import PostNotification from '@/Components/Notification';


export default function Categories({ auth, categories = [] }) {  
    const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
    const [isCategoryListVisible, setIsCategoryListVisible] = useState(false); 
    const [selectedCategory, setSelectedCategory] = useState(null); 
    const [notifMessage, setNotifMessage] = useState('');  
    const [isNotifOpen, setIsNotifOpen] = useState(false); 
    const [notifType, setNotifType] = useState('success'); 

    const closeNotif = () => setIsNotifOpen(false);

    // Inertia's useForm hook for form handling
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '', 
        description: '', 
    });

    const { data: editData, setData: setEditData, post: postEdit, processing: processingEdit, reset: resetEdit, errors: editErrors } = useForm({
        name: '',
        description: '',
    });

    // Handlers to open/close the popups
    const handleAddOpen = () => setIsAddPopupOpen(true);
    const handleAddClose = () => {
        reset(); 
        setIsAddPopupOpen(false);
    };

    const handleEditOpen = () => {
        setIsCategoryListVisible(true); 
        setIsEditPopupOpen(true);
    };

    const handleEditClose = () => {
        setIsEditPopupOpen(false);
        setSelectedCategory(null); 
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setEditData({ name: category.name, description: category.description });
        setIsCategoryListVisible(false); 
    };

    const handleDeleteOpen = () => {
        if (selectedCategory) {
            setIsDeleteConfirmationOpen(true);
        }
    };

    const handleDeleteClose = () => {
        setIsDeleteConfirmationOpen(false);
    };

    const handleAddCategory = (e) => {
        e.preventDefault(); 
        post(route('categories.store'), {  
            onSuccess: () => {
                handleAddClose();
                setNotifMessage('Veiksmīgi pievienota jauna kategorija!');
                setNotifType('success');  
                setIsNotifOpen(true);  
            }
        });
    };

    const handleUpdateCategory = (e) => {
        e.preventDefault(); 
        if (selectedCategory) {
            postEdit(route('categories.update', selectedCategory.id), {  
                onSuccess: () => {
                    handleEditClose(); 
                    setNotifMessage('Kategorija veiksmīgi atjaunināta!');
                    setNotifType('success');  
                    setIsNotifOpen(true);
                },
                onError: () => {
                    setNotifMessage('Kļūda atjauninot kategoriju');
                    setNotifType('error');  
                    setIsNotifOpen(true); 
                }
            });
        }
    };
    

    const handleDeleteCategory = (e) => {
        if (selectedCategory) {
            e.preventDefault(); 
            router.delete(route('categories.destroy', selectedCategory.id), {  
                onSuccess: () => {
                    setIsEditPopupOpen(false);  
                    handleDeleteClose();  
                    setNotifMessage('Kategorija tika izdzēsta!');
                    setNotifType('success');  
                    setIsNotifOpen(true);      
                }
            });
        }
    };
    
    

    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Admin Panelis</h2>}
        >
            <Head title="Kategorijas" />

            <div className="grid grid-cols-1 h-[60dvh] sm:grid-cols-2 gap-6 max-w-7xl mx-auto ">
                <DashboardBox 
                    title="Pievienot Jaunu kategoriju" 
                    description="Pievienot jaunu kategoriju interneta veikalam." 
                    onClick={handleAddOpen}  
                    icon={IoIosAddCircleOutline}
                />
                <DashboardBox 
                    title="Rediģēt esošās kategorijas" 
                    description="Rediģēt vai dzēst esošās kategorijas interneta veikalam." 
                    onClick={handleEditOpen}  
                    icon={FaEdit}
                />
            </div>

            {/* Add Category Popup */}
            <Popup 
                isOpen={isAddPopupOpen} 
                onClose={handleAddClose} 
                title="Pievienot Jaunu kategoriju"
                onConfirm={handleAddCategory} 
            >
                <form onSubmit={handleAddCategory}>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300">Kategorija</label>
                        <input 
                            type="text" 
                            value={data.name} 
                            onChange={(e) => setData('name', e.target.value)} 
                            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-gray-300"
                        />
                        {errors.name && <span className="text-red-600">{errors.name}</span>}
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300">Kategorijas apraksts (nav obligāts)</label>
                        <textarea 
                            value={data.description} 
                            onChange={(e) => setData('description', e.target.value)} 
                            className="resize-none w-full h-56 p-2 border rounded-md dark:bg-gray-700 dark:text-gray-300"
                        />
                        {errors.description && <span className="text-red-600">{errors.description}</span>}
                    </div>

                    <div className="flex justify-center">
                        <button 
                            type="button" 
                            onClick={handleAddClose} 
                            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 mr-2"
                        >
                            Atcelt
                        </button>
                        <button 
                            type="submit" 
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            disabled={processing}  
                        >
                            {processing ? 'Saglabā...' : 'Saglabāt kategoriju'}
                        </button>
                    </div>
                </form>
            </Popup>

            {/* Edit Category Popup */}
            <Popup 
                isOpen={isEditPopupOpen} 
                onClose={handleEditClose} 
                title="Rediģēt kategorijas"
                onConfirm={handleUpdateCategory} 
            >
                {isCategoryListVisible ? (
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">Izvēlieties kategoriju</h3>
                        <ul className="list-disc pl-5">
                            {categories.map(category => (
                                <li key={category.id} className="mb-2 cursor-pointer" onClick={() => handleCategorySelect(category)}>
                                    {category.name}
                                </li>
                            ))}
                        </ul>
                        <div className='flex w-full items-center justify-center'>
                            <button 
                                type="button" 
                                onClick={handleEditClose} 
                                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 mr-2"
                            >
                                Atcelt
                            </button>
                        </div>
                    </div>
                ) : (
                    selectedCategory && (
                        <form onSubmit={handleUpdateCategory}>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300">Kategorija</label>
                                <input 
                                    type="text" 
                                    value={editData.name} 
                                    onChange={(e) => setEditData('name', e.target.value)} 
                                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-gray-300"
                                />
                                {editErrors.name && <span className="text-red-600">{editErrors.name}</span>}
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300">Kategorijas apraksts (nav obligāts)</label>
                                <textarea 
                                    value={editData.description} 
                                    onChange={(e) => setEditData('description', e.target.value)} 
                                    className="resize-none w-full h-56 p-2 border rounded-md dark:bg-gray-700 dark:text-gray-300"
                                />
                                {editErrors.description && <span className="text-red-600">{editErrors.description}</span>}
                            </div>

                            <div className="flex justify-between">
                                <button 
                                    type="button" 
                                    onClick={handleEditClose} 
                                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 mr-2"
                                >
                                    Atcelt
                                </button>
                                <button 
                                    type="button" 
                                    onClick={handleDeleteOpen}
                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                >
                                    Dzēst
                                </button>
                                {selectedCategory && (
                                    <button 
                                        type="button" 
                                        onClick={() => post(route('categories.toggleAvailability', selectedCategory.id))}  
                                        className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
                                    >
                                        {selectedCategory.is_available ? 'Neaktīvs' : 'Aktīvs'}
                                    </button>
                                )}
                                <button 
                                    type="submit" 
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    disabled={processingEdit}  
                                >
                                    {processingEdit ? 'Saglabā...' : 'Saglabāt kategoriju'}
                                </button>
                            </div>
                        </form>
                    )
                )}
            </Popup>

            {/* Delete Confirmation Popup */}
            <Popup 
                isOpen={isDeleteConfirmationOpen} 
                onClose={handleDeleteClose} 
                title="Apstiprinājums"
                onConfirm={handleDeleteCategory}
            >
                <p className="text-red-600">Vai jūs tiešām vēlaties dzēst kategoriju "{selectedCategory?.name}"?</p>
                <div className="flex justify-center mt-4">
                    <button 
                        type="button" 
                        onClick={handleDeleteClose} 
                        className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 mr-2"
                    >
                        Atcelt
                    </button>
                    <button 
                        type="button" 
                        onClick={handleDeleteCategory} 
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                        Dzēst
                    </button>
                </div>
            </Popup>

            <PostNotification
                message={notifMessage} 
                type={notifType}  
                isOpen={isNotifOpen} 
                onClose={closeNotif} 
            />
        </AdminLayout>
    );
}
