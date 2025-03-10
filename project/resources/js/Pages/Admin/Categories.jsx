import { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { 
  PlusCircle, Edit, Trash2, ChevronDown, ChevronUp, Plus, X, Save, 
  AlertCircle, CheckCircle, ArrowLeft
} from 'lucide-react';

export default function Categories({ auth, categories = [] }) {  
    const [selectedCategory, setSelectedCategory] = useState(null); 
    const [subcategories, setSubcategories] = useState([]); 
    const [activeModal, setActiveModal] = useState(null);
    const [isSubcategorySectionOpen, setIsSubcategorySectionOpen] = useState(true);
    const [notification, setNotification] = useState({
        isOpen: false,
        message: '',
        type: 'success'
    });

    const { data, setData, post, processing, reset, errors } = useForm({
        name: '', 
        description: '', 
    });

    const { 
        data: editData, 
        setData: setEditData, 
        post: postEdit, 
        processing: processingEdit, 
        reset: resetEdit, 
        errors: editErrors 
    } = useForm({
        name: '',
        description: '',
    });

    const showNotification = (message, type = 'success') => {
        setNotification({
            isOpen: true,
            message,
            type
        });
        
        setTimeout(() => {
            closeNotification();
        }, 3000);
    };

    const closeNotification = () => {
        setNotification(prev => ({ ...prev, isOpen: false }));
    };

    const openModal = (modalName) => {
        setActiveModal(modalName);
        if (modalName === 'edit') {
            setSelectedCategory(null);
        }
    };

    const closeModal = () => {
        setActiveModal(null);
        reset();
        resetEdit();
        setSelectedCategory(null);
    };

    const addSubcategory = () => {
        setSubcategories([...subcategories, { name: '', description: '' }]);
    };

    const handleSubcategoryChange = (index, field, value) => {
        const updatedSubcategories = [...subcategories];
        updatedSubcategories[index][field] = value;
        setSubcategories(updatedSubcategories);
    };

    const removeSubcategory = (index) => {
        const updatedSubcategories = subcategories.filter((_, i) => i !== index);
        setSubcategories(updatedSubcategories);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setEditData({ name: category.name, description: category.description });
        setSubcategories(category.children || []); 
    };

    const handleAddCategory = (e) => {
        e.preventDefault(); 
        post(route('categories.store'), {
            data: {  
                name: data.name,
                description: data.description,
                subcategories: subcategories,
            },
            onSuccess: () => {
                closeModal();
                showNotification('Veiksmīgi pievienota jauna kategorija!');
            }
        });
    };

    const handleUpdateCategory = (e) => {
        e.preventDefault();
    
        if (selectedCategory) {
            router.put(route('categories.update', selectedCategory.id), {
                ...editData,
                subcategories: subcategories,
            }, {
                onSuccess: () => {
                    closeModal();
                    showNotification('Kategorija un apakškategorijas veiksmīgi atjauninātas!');
                },
                onError: () => {
                    showNotification('Kļūda atjauninot kategoriju', 'error');
                }
            });
        }
    };

    const handleDeleteCategory = (e) => {
        e.preventDefault(); 
        if (selectedCategory) {
            router.delete(route('categories.destroy', selectedCategory.id), {  
                onSuccess: () => {
                    closeModal();
                    showNotification('Kategorija tika izdzēsta!');
                }
            });
        }
    };

    return (
        <AdminLayout
            auth={auth}
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Kategoriju pārvaldība</h2>}
        >
            <Head title="Kategorijas" />

            {/* Main content grid */}
            <div className="px-4 mx-auto mt-8 max-w-7xl">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                    {/* Add Category Card */}
                    <div 
                        onClick={() => openModal('add')}
                        className="flex flex-col justify-center items-center p-6 transition-all duration-200 bg-white rounded-lg shadow-md cursor-pointer dark:bg-gray-800 hover:shadow-lg hover:scale-102 min-h-[300px]"
                    >
                        <div className="flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                            <PlusCircle size={48} />
                        </div>
                        <h3 className="mb-2 text-xl font-semibold text-center text-gray-800 dark:text-white">Pievienot Jaunu kategoriju</h3>
                        <p className="text-center text-gray-600 dark:text-gray-300">
                            Pievienot jaunu kategoriju interneta veikalam.
                        </p>
                    </div>

                    {/* Edit Category Card */}
                    <div 
                        onClick={() => openModal('edit')}
                        className="flex flex-col items-center justify-center p-6 transition-all duration-200 bg-white rounded-lg shadow-md cursor-pointer dark:bg-gray-800 hover:shadow-lg hover:scale-102"
                    >
                        <div className="flex items-center justify-center mb-4 text-indigo-600 dark:text-indigo-400">
                            <Edit size={48} />
                        </div>
                        <h3 className="mb-2 text-xl font-semibold text-center text-gray-800 dark:text-white">Rediģēt esošās kategorijas</h3>
                        <p className="text-center text-gray-600 dark:text-gray-300">
                            Rediģēt vai dzēst esošās kategorijas interneta veikalam.
                        </p>
                    </div>
                </div>
            </div>

            {/* Notification */}
            {notification.isOpen && (
                <div 
                    className={`fixed bottom-4 right-4 flex items-center p-4 rounded-lg shadow-lg transition-all duration-300 ${
                        notification.type === 'success' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'
                    }`}
                >
                    <div className="mr-3">
                        {notification.type === 'success' ? (
                            <CheckCircle className="text-green-600 dark:text-green-400" size={24} />
                        ) : (
                            <AlertCircle className="text-red-600 dark:text-red-400" size={24} />
                        )}
                    </div>
                    <div className="mr-2">
                        <p className={`font-medium ${
                            notification.type === 'success' ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
                        }`}>
                            {notification.message}
                        </p>
                    </div>
                    <button 
                        onClick={closeNotification}
                        className="ml-auto text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
                    >
                        <X size={18} />
                    </button>
                </div>
            )}

            {/* Modal System */}
            {activeModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={closeModal}></div>
                    
                    <div className="z-10 w-full max-w-xl p-6 mx-4 overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800 max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                {activeModal === 'add' && "Pievienot Jaunu kategoriju"}
                                {activeModal === 'edit' && !selectedCategory && "Izvēlieties kategoriju"}
                                {activeModal === 'edit' && selectedCategory && "Rediģēt kategoriju"}
                                {activeModal === 'delete' && "Dzēst kategoriju"}
                            </h2>
                            <button 
                                onClick={closeModal}
                                className="p-1 text-gray-600 transition-colors duration-200 rounded-full hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="mb-6">
                            {/* Add Category Form */}
                            {activeModal === 'add' && (
                                <form onSubmit={handleAddCategory}>
                                    <div className="mb-4">
                                        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Kategorija</label>
                                        <input 
                                            id="name"
                                            type="text" 
                                            value={data.name} 
                                            onChange={(e) => setData('name', e.target.value)} 
                                            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                                            placeholder="Ievadiet kategorijas nosaukumu"
                                        />
                                        {errors.name && <span className="text-sm text-red-600">{errors.name}</span>}
                                    </div>
                                    
                                    <div className="mb-4">
                                        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Kategorijas apraksts (nav obligāts)</label>
                                        <textarea 
                                            id="description"
                                            value={data.description} 
                                            onChange={(e) => setData('description', e.target.value)} 
                                            className="w-full p-3 border rounded-lg shadow-sm h-36 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                                            placeholder="Ievadiet kategorijas aprakstu"
                                        />
                                        {errors.description && <span className="text-sm text-red-600">{errors.description}</span>}
                                    </div>
                                    

                                    <div className="flex justify-end space-x-3">
                                        <button 
                                            type="button" 
                                            onClick={closeModal} 
                                            className="px-4 py-2 text-gray-700 transition-colors duration-200 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                        >
                                            Atcelt
                                        </button>
                                        <button 
                                            type="submit" 
                                            className="flex items-center px-4 py-2 text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-70"
                                            disabled={processing}  
                                        >
                                            {processing ? (
                                                <>
                                                    <svg className="w-5 h-5 mr-2 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Saglabā...
                                                </>
                                            ) : (
                                                <>
                                                    <Save size={18} className="mr-2" /> Saglabāt
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}

                            {/* Edit Category List */}
                            {activeModal === 'edit' && !selectedCategory && (
                                <div className="overflow-hidden rounded-lg shadow">
                                    {categories.length === 0 ? (
                                        <div className="p-6 text-center text-gray-600 dark:text-gray-400">
                                            <p>Nav pieejamu kategoriju</p>
                                        </div>
                                    ) : (
                                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {categories.map(category => (
                                                <li 
                                                    key={category.id} 
                                                    className="transition-colors duration-150 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                                                    onClick={() => handleCategorySelect(category)}
                                                >
                                                    <div className="flex items-center justify-between p-4">
                                                        <div>
                                                            <h3 className="font-medium text-gray-800 dark:text-gray-200">{category.name}</h3>
                                                            {category.description && (
                                                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                                    {category.description.length > 100 
                                                                        ? `${category.description.substring(0, 100)}...` 
                                                                        : category.description
                                                                    }
                                                                </p>
                                                            )}
                                                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                                                                {category.children?.length > 0 
                                                                    ? `${category.children.length} apakškategorijas` 
                                                                    : 'Nav apakškategoriju'
                                                                }
                                                            </p>
                                                        </div>
                                                        <ChevronDown size={20} className="text-gray-400" />
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            )}

                            {/* Edit Category Form */}
                            {activeModal === 'edit' && selectedCategory && (
                                <form onSubmit={handleUpdateCategory}>
                                    <div className="mb-4">
                                        <button 
                                            type="button" 
                                            onClick={() => setSelectedCategory(null)}
                                            className="flex items-center mb-4 text-blue-600 dark:text-blue-400"
                                        >
                                            <ArrowLeft size={16} className="mr-1" /> Atpakaļ pie kategoriju saraksta
                                        </button>
                                        
                                        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Kategorija</label>
                                        <input 
                                            type="text" 
                                            value={editData.name} 
                                            onChange={(e) => setEditData('name', e.target.value)} 
                                            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                                        />
                                        {editErrors.name && <span className="text-sm text-red-600">{editErrors.name}</span>}
                                    </div>
                                    
                                    <div className="mb-6">
                                        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Kategorijas apraksts (nav obligāts)</label>
                                        <textarea 
                                            value={editData.description} 
                                            onChange={(e) => setEditData('description', e.target.value)} 
                                            className="w-full p-3 border rounded-lg shadow-sm h-36 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                                        />
                                        {editErrors.description && <span className="text-sm text-red-600">{editErrors.description}</span>}
                                    </div>

                                    {/* Subcategory Section */}
                                    <div className="p-4 mb-6 border rounded-lg dark:border-gray-700">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="font-medium text-gray-800 dark:text-gray-200">Apakškategorijas</h3>
                                            <div className="flex space-x-2">
                                                <button 
                                                    type="button"
                                                    onClick={() => setIsSubcategorySectionOpen(!isSubcategorySectionOpen)}
                                                    className="flex items-center px-3 py-1 text-sm text-gray-700 transition-colors duration-200 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                                >
                                                    {isSubcategorySectionOpen ? (
                                                        <>
                                                            <ChevronUp size={16} className="mr-1" /> Slēpt
                                                        </>
                                                    ) : (
                                                        <>
                                                            <ChevronDown size={16} className="mr-1" /> Parādīt
                                                        </>
                                                    )}
                                                </button>
                                                <button 
                                                    type="button"
                                                    onClick={addSubcategory}
                                                    className="flex items-center px-3 py-1 text-sm text-white transition-colors duration-200 bg-blue-600 rounded-md hover:bg-blue-700"
                                                >
                                                    <Plus size={16} className="mr-1" /> Pievienot
                                                </button>
                                            </div>
                                        </div>
                                        
                                        {isSubcategorySectionOpen && (
                                            subcategories.length === 0 ? (
                                                <p className="py-4 text-center text-gray-500 dark:text-gray-400">Nav pievienotu apakškategoriju</p>
                                            ) : (
                                                <div className="pr-1 space-y-4 overflow-y-auto max-h-64">
                                                    {subcategories.map((subcategory, index) => (
                                                        <div key={index} className="p-4 border rounded-lg dark:border-gray-700">
                                                            <div className="flex justify-between mb-2">
                                                                <h4 className="font-medium text-gray-700 dark:text-gray-300">Apakškategorija #{index + 1}</h4>
                                                                <button 
                                                                    type="button" 
                                                                    onClick={() => removeSubcategory(index)}
                                                                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                                                >
                                                                    <Trash2 size={18} />
                                                                </button>
                                                            </div>
                                                            <input 
                                                                type="text" 
                                                                value={subcategory.name} 
                                                                onChange={(e) => handleSubcategoryChange(index, 'name', e.target.value)} 
                                                                placeholder="Apakškategorijas nosaukums"
                                                                className="w-full p-2 mb-2 border rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                                                            />
                                                            <textarea 
                                                                value={subcategory.description} 
                                                                onChange={(e) => handleSubcategoryChange(index, 'description', e.target.value)} 
                                                                placeholder="Apakškategorijas apraksts"
                                                                className="w-full h-20 p-2 border rounded-md resize-none dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            )
                                        )}
                                    </div>

                                    <div className="flex justify-between">
                                        <button 
                                            type="button" 
                                            onClick={() => openModal('delete')}
                                            className="flex items-center px-4 py-2 text-white transition-colors duration-200 bg-red-600 rounded-lg hover:bg-red-700"
                                        >
                                            <Trash2 size={18} className="mr-2" /> Dzēst kategoriju
                                        </button>

                                        <div className="flex space-x-3">
                                            <button 
                                                type="button" 
                                                onClick={closeModal} 
                                                className="px-4 py-2 text-gray-700 transition-colors duration-200 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                            >
                                                Atcelt
                                            </button>
                                            <button 
                                                type="submit" 
                                                className="flex items-center px-4 py-2 text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-70"
                                                disabled={processingEdit}  
                                            >
                                                {processingEdit ? (
                                                    <>
                                                        <svg className="w-5 h-5 mr-2 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Atjaunina...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Save size={18} className="mr-2" /> Atjaunināt
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            )}

                            {/* Delete Confirmation */}
                            {activeModal === 'delete' && selectedCategory && (
                                <div className="text-center">
                                    <div className="flex justify-center mb-4">
                                        <div className="p-3 text-red-500 bg-red-100 rounded-full dark:bg-red-900">
                                            <AlertCircle size={32} />
                                        </div>
                                    </div>
                                    <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Vai tiešām vēlaties dzēst šo kategoriju?</h3>
                                    <p className="mb-6 text-gray-600 dark:text-gray-400">
                                        Dzēšot kategoriju "{selectedCategory.name}", tiks dzēstas arī visas tās apakškategorijas. Šo darbību nevar atsaukt.
                                    </p>
                                    <div className="flex justify-center space-x-4">
                                        <button 
                                            onClick={() => setActiveModal('edit')}
                                            className="px-4 py-2 text-gray-700 transition-colors duration-200 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                        >
                                            Atcelt
                                        </button>
                                        <button 
                                            onClick={handleDeleteCategory}
                                            className="px-4 py-2 text-white transition-colors duration-200 bg-red-600 rounded-lg hover:bg-red-700"
                                        >
                                            Dzēst kategoriju
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}