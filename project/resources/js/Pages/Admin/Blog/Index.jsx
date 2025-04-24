import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function BlogAdminIndex({ blogs, auth }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Vai tiešām vēlaties dzēst šo bloga ierakstu?')) {
            destroy(route('admin.blogs.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Pārvaldīt Bloga Ierakstus" />
            
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-900">
                        <div className="p-6 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-0">
                            <div className="flex items-center justify-between mb-6">
                                <h1 className="text-3xl font-bold text-accent">Pārvaldīt Bloga Ierakstus</h1>
                                <Link
                                    href={route('admin.blogs.create')}
                                    className="px-4 py-2 text-white transition duration-300 bg-green-600 rounded hover:bg-green-700"
                                >
                                    Izveidot Jaunu Ierakstu
                                </Link>
                            </div>
                            
                            <div className="mt-4 overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                                            Attēls
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                                            Virsraksts
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                                            Slug
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                                            Datums
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                                            Darbības
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                                    {blogs.map((blog) => (
                                        <tr key={blog.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {blog.image_url ? (
                                                    <img 
                                                        src={blog.image_url} 
                                                        alt={blog.title}
                                                        className="object-cover w-16 h-16 rounded"
                                                    />
                                                ) : (
                                                    <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded dark:bg-gray-800">
                                                        <span className="text-gray-400">Nav attēla</span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-medium text-gray-900 dark:text-gray-200">
                                                    {blog.title}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="max-w-xs text-sm text-gray-500 truncate dark:text-gray-400">
                                                    {blog.slug}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    {new Date(blog.created_at).toLocaleDateString('lv-LV', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap">
                                                <div className="flex space-x-2">
                                                    <Link
                                                        href={route('blog.show', blog.slug)}
                                                        className="px-3 py-1 text-blue-600 transition duration-300 border border-blue-600 rounded hover:bg-blue-600 hover:text-white"
                                                        target="_blank"
                                                    >
                                                        Skatīt
                                                    </Link>
                                                    <Link
                                                        href={route('admin.blogs.edit', blog.id)}
                                                        className="px-3 py-1 text-yellow-600 transition duration-300 border border-yellow-600 rounded hover:bg-yellow-600 hover:text-white"
                                                    >
                                                        Rediģēt
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(blog.id)}
                                                        className="px-3 py-1 text-red-600 transition duration-300 border border-red-600 rounded hover:bg-red-600 hover:text-white"
                                                    >
                                                        Dzēst
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    
                                    {blogs.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                                                Nav atrasti bloga ieraksti. Izveidojiet savu pirmo bloga ierakstu!
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}