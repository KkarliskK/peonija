import { IoIosAddCircleOutline } from "react-icons/io";
import { FaEdit } from 'react-icons/fa';
import { IoMdAddCircle } from 'react-icons/io';
import { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import DashboardBox from '@/Components/Modals/DashboardBox';
import Popup from '@/Components/Modals/Popup';
import PostNotification from '@/Components/Modals/Notification';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';


export default function Categories({ auth, categories = [] }) {  
    const [selectedCategory, setSelectedCategory] = useState(null); 
    const [subcategories, setSubcategories] = useState([]); 
    const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
    const [isCategoryListVisible, setIsCategoryListVisible] = useState(false); 
    const [isSubcategorySectionOpen, setIsSubcategorySectionOpen] = useState(true);
    const [notifMessage, setNotifMessage] = useState('');  
    const [isNotifOpen, setIsNotifOpen] = useState(false); 
    const [notifType, setNotifType] = useState('success');  

    const closeNotif = () => setIsNotifOpen(false);

    const { data, setData, post, processing, reset, errors } = useForm({
        name: '', 
        description: '', 
    });

    const { data: editData, setData: setEditData, post: postEdit, processing: processingEdit, reset: resetEdit, errors: editErrors } = useForm({
        name: '',
        description: '',
    });

    // Add new subcategory
    const addSubcategory = () => {
        setSubcategories([...subcategories, { name: '', description: '' }]);
    };

    // Handle subcategory changes
    const handleSubcategoryChange = (index, field, value) => {
        const updatedSubcategories = [...subcategories];
        updatedSubcategories[index][field] = value;
        setSubcategories(updatedSubcategories);
    };

    // Remove subcategory
    const removeSubcategory = (index) => {
        const updatedSubcategories = subcategories.filter((_, i) => i !== index);
        setSubcategories(updatedSubcategories);
    };

    // Open/Close popups
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
        console.log('Selected Category:', category);
        setSelectedCategory(category);
        setEditData({ name: category.name, description: category.description });
        setSubcategories(category.children || []); 
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

    // Add Category Handler
    const handleAddCategory = (e) => {
        e.preventDefault(); 
        post(route('categories.store'), {
            data: {
                name: data.name,
                description: data.description,
                subcategories: subcategories,
            },
            onSuccess: () => {
                handleAddClose();
                setNotifMessage('Veiksmīgi pievienota jauna kategorija!');
                setNotifType('success');  
                setIsNotifOpen(true);  
            }
        });
    };
    

    // Update Category Handler
    const handleUpdateCategory = (e) => {
        e.preventDefault();
    
        if (selectedCategory) {
            router.put(route('categories.update', selectedCategory.id), {
                ...editData,
                subcategories: subcategories,
            }, {
                onSuccess: () => {
                    handleEditClose();
                    setNotifMessage('Kategorija un apakškategorijas veiksmīgi atjauninātas!');
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
    
    
    
    

    // Delete Category Handler
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
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Pievienot vai rediģēt kategorijas</h2>}
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

                            {/* Subcategory Section */}
                            <div className="mb-4 flex flex-col justify-center items-center">
                                <div className="flex justify-between w-full items-center">
                                    <h4 className="text-md font-semibold mb-2">Apakškategorijas</h4>
                                    <button
                                        type="button"
                                        onClick={() => setIsSubcategorySectionOpen(!isSubcategorySectionOpen)}
                                        className="flex items-center text-blue-600"
                                    >
                                        {isSubcategorySectionOpen ? (
                                            <>
                                                <IoMdArrowDropup className="mr-1" /> Slēpt
                                            </>
                                        ) : (
                                            <>
                                                <IoMdArrowDropdown className="mr-1" /> Parādīt
                                            </>
                                        )}
                                    </button>
                                </div>
                                
                                {isSubcategorySectionOpen && (
                                    <div className="w-full max-h-64 overflow-y-auto">
                                        {subcategories.map((subcategory, index) => (
                                            <div key={index} className="mb-4 p-2 bg-white dark:bg-gray-800 shadow rounded-md">
                                                <input 
                                                    type="text" 
                                                    value={subcategory.name} 
                                                    onChange={(e) => handleSubcategoryChange(index, 'name', e.target.value)} 
                                                    placeholder="Apakškategorijas nosaukums"
                                                    className="w-full p-2 mb-2 border rounded-md dark:bg-gray-700 dark:text-gray-300"
                                                />
                                                <textarea 
                                                    value={subcategory.description} 
                                                    onChange={(e) => handleSubcategoryChange(index, 'description', e.target.value)} 
                                                    placeholder="Apakškategorijas apraksts"
                                                    className="resize-none w-full h-28 p-2 border rounded-md dark:bg-gray-700 dark:text-gray-300"
                                                />
                                                <button 
                                                    type="button" 
                                                    onClick={() => removeSubcategory(index)} 
                                                    className="text-red-600 mt-2"
                                                >
                                                    Dzēst
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <button 
                                    type="button" 
                                    onClick={addSubcategory} 
                                    className="flex items-center text-blue-600 mt-2"
                                >
                                    <IoMdAddCircle className="mr-1" /> Pievienot apakškategoriju
                                </button>
                            </div>

                            <div className="flex justify-center">
                                <button 
                                    type="button" 
                                    onClick={handleEditClose} 
                                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 mr-2"
                                >
                                    Atcelt
                                </button>
                                <button 
                                    type="submit" 
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    disabled={processingEdit}  
                                >
                                    {processingEdit ? 'Saglabā...' : 'Atjaunināt kategoriju'}
                                </button>
                            </div>
                        </form>
                    )
                )}
            </Popup>
            <PostNotification
                isOpen={isNotifOpen}
                message={notifMessage}
                type={notifType}
                onClose={closeNotif}
            />
        </AdminLayout>
    );
}
