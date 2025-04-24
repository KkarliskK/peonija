import { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { FiBell, FiTag, FiPackage, FiShoppingCart } from "react-icons/fi";
import { FaUserEdit } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";

export default function ManageNews({ auth, news }) {
    const [editingId, setEditingId] = useState(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        id: '',
        title: '',
        content: '',
        from_color: 'blue-500',
        to_color: 'purple-500',
        icon: 'FiBell'
    });

    const colorOptions = [
        'blue-500', 'purple-500', 'green-500', 'teal-500', 
        'red-500', 'yellow-500', 'pink-500', 'indigo-500'
    ];
    useEffect(() => {
    document.documentElement.style.setProperty('--tw-blue-500', '#3b82f6');
    document.documentElement.style.setProperty('--tw-purple-500', '#8b5cf6');
    document.documentElement.style.setProperty('--tw-green-500', '#22c55e');
    document.documentElement.style.setProperty('--tw-teal-500', '#14b8a6');
    document.documentElement.style.setProperty('--tw-red-500', '#ef4444');
    document.documentElement.style.setProperty('--tw-yellow-500', '#eab308');
    document.documentElement.style.setProperty('--tw-pink-500', '#ec4899');
    document.documentElement.style.setProperty('--tw-indigo-500', '#6366f1');
    }, []);

    const iconOptions = [
        { name: 'FiBell', component: FiBell },
        { name: 'FiTag', component: FiTag },
        { name: 'FiPackage', component: FiPackage },
        { name: 'FiShoppingCart', component: FiShoppingCart },
        { name: 'FaUserEdit', component: FaUserEdit },
        { name: 'CiHeart', component: CiHeart }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        post(editingId ? `/admin/news/${editingId}` : 'news', {
            onSuccess: () => {
                reset();
                setEditingId(null);
            }
        });
    };

    const editNews = (item) => {
        setData({
            id: item.id,
            title: item.title,
            content: item.content,
            from_color: item.from_color,
            to_color: item.to_color,
            icon: item.icon || 'FiBell'
        });
        setEditingId(item.id);
    };

    const deleteNews = (id) => {
        if (confirm('Are you sure you want to delete this news item?')) {
            post(`/admin/news/${id}/delete`);
        }
    };

    return (
        <AdminLayout
            auth={auth}
            user={auth.user}
        >
            <Head title="Jaunumu sadaļa" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <h1 className="mb-6 text-2xl font-semibold">Pievienot / rediģēt jaunumus</h1>

                    <div className="p-6 mb-8 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <h2 className="mb-4 text-lg font-medium">
                            {editingId ? 'Rediģēt ziņojumu' : 'Pievienot jaunu ziņojumu'}
                        </h2>
                        <form onSubmit={handleSubmit} method="POST">
                            <div className="mb-4">
                                <label className="block mb-2 text-gray-700">Virsraksts</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border rounded"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    required
                                />
                                {errors.title && <div className="mt-1 text-red-500">{errors.title}</div>}
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-gray-700">Apraksts</label>
                                <textarea
                                    className="w-full px-3 py-2 border rounded"
                                    value={data.content}
                                    onChange={e => setData('content', e.target.value)}
                                    rows={3}
                                    required
                                />
                                {errors.content && <div className="mt-1 text-red-500">{errors.content}</div>}
                            </div>

                            <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                                <div>
                                    <label className="block mb-2 text-gray-700">Sākuma krāsa</label>
                                    <select
                                        className="w-full px-3 py-2 border rounded"
                                        value={data.from_color}
                                        onChange={e => setData('from_color', e.target.value)}
                                    >
                                        {colorOptions.map(color => (
                                            <option key={color} value={color}>{color}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block mb-2 text-gray-700">Beigu krāsa</label>
                                    <select
                                        className="w-full px-3 py-2 border rounded"
                                        value={data.to_color}
                                        onChange={e => setData('to_color', e.target.value)}
                                    >
                                        {colorOptions.map(color => (
                                            <option key={color} value={color}>{color}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Preview box to see the color gradient */}
                            <div 
                            className="p-4 mb-4 text-white shadow-md rounded-xl"
                            style={{
                                background: `linear-gradient(to right, var(--tw-${data.from_color}), var(--tw-${data.to_color}))`
                            }}
                            >
                                <p>Krāsu priekšskats</p>
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-gray-700">Ikona</label>
                                <select
                                    className="w-full px-3 py-2 border rounded"
                                    value={data.icon}
                                    onChange={e => setData('icon', e.target.value)}
                                >
                                    {iconOptions.map(icon => (
                                        <option key={icon.name} value={icon.name}>{icon.name}</option>
                                    ))}
                                </select>
                                <div className="flex gap-4 mt-2">
                                    {iconOptions.map(icon => (
                                        <div 
                                            key={icon.name}
                                            className={`p-2 rounded cursor-pointer ${data.icon === icon.name ? 'bg-blue-100' : ''}`}
                                            onClick={() => setData('icon', icon.name)}
                                        >
                                            <icon.component className="w-6 h-6" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end gap-2">
                                {editingId && (
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-gray-200 rounded"
                                        onClick={() => {
                                            reset();
                                            setEditingId(null);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-white bg-blue-500 rounded"
                                    disabled={processing}
                                >
                                    {editingId ? 'Rediģēt' : 'Izveidot'} ziņojumu
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="p-6 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <h2 className="mb-4 text-lg font-medium">Pašlaik aktīvie ziņojumi</h2>
                        {news && news.length > 0 ? (
                            <div className="grid gap-4">
                                {news.map(item => (
                                    <div key={item.id} className="flex items-start justify-between p-4 border rounded">
                                        <div>
                                            <h3 className="font-medium">{item.title}</h3>
                                            <p className="text-sm text-gray-600">{item.content}</p>
                                            <div className="mt-2 text-xs text-gray-500">
                                                Colors: {item.from_color} → {item.to_color} | Icon: {item.icon || 'FiBell'}
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => editNews(item)}
                                                className="px-3 py-1 text-sm text-blue-600 bg-blue-100 rounded"
                                            >
                                                Rediģēt
                                            </button>
                                            <button
                                                onClick={() => deleteNews(item.id)}
                                                className="px-3 py-1 text-sm text-red-600 bg-red-100 rounded"
                                            >
                                                Dzēst
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">Nav neviena ziņojuma.</p>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}