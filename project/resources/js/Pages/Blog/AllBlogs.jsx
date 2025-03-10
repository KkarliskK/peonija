import React from 'react';
import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function BlogIndex({ blogs, auth }) {
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Flower Shop Blog" />
            
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h1 className="mb-8 text-3xl font-bold text-center text-green-700">Our Flower Blog</h1>
                            
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {blogs.map((blog) => (
                                    <div key={blog.id} className="overflow-hidden transition duration-300 bg-white rounded-lg shadow-md hover:shadow-lg">
                                        {blog.image_url && (
                                            <div className="h-48 overflow-hidden">
                                                <img 
                                                    src={blog.image_url} 
                                                    alt={blog.title} 
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                        )}
                                        <div className="p-5">
                                            <h2 className="mb-2 text-xl font-bold text-green-600 line-clamp-2">{blog.title}</h2>
                                            <p className="mb-3 text-sm text-gray-500">
                                                {new Date(blog.created_at).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                            <p className="mb-4 text-gray-600 line-clamp-3">{blog.excerpt || blog.content.substring(0, 150) + '...'}</p>
                                            <Link 
                                                href={`/blog/${blog.slug}`} 
                                                className="inline-block px-4 py-2 text-white transition duration-300 bg-green-500 rounded hover:bg-green-600"
                                            >
                                                Read More
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            {blogs.length === 0 && (
                                <div className="py-10 text-center">
                                    <p className="text-gray-500">No blog posts yet. Check back soon!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}