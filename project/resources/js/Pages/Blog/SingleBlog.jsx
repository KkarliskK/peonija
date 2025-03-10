import React from 'react';
import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function BlogShow({ blog, relatedPosts, auth }) {
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title={blog.title} />
            
            <div className="py-12">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {/* Breadcrumb */}
                            <nav className="flex mb-5 text-sm">
                                <Link href="/" className="text-gray-500 hover:text-green-600">Sākums</Link>
                                <span className="mx-2 text-gray-500">/</span>
                                <Link href="/blog" className="text-gray-500 hover:text-green-600">Blogs</Link>
                                <span className="mx-2 text-gray-500">/</span>
                                <span className="text-green-600">{blog.title}</span>
                            </nav>
                            
                            {/* Blog Header */}
                            <div className="mb-8">
                                <h1 className="mb-4 text-3xl font-bold text-green-700 md:text-4xl">{blog.title}</h1>
                                <div className="flex items-center text-sm text-gray-500">
                                    <span>Publicēts {new Date(blog.created_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}</span>
                                    {blog.author && (
                                        <>
                                            <span className="mx-2">•</span>
                                            <span> {blog.author}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                            
                            {/* Featured Image */}
                            {blog.image_url && (
                                <div className="mb-8 overflow-hidden rounded-lg">
                                    <img 
                                        src={blog.image_url} 
                                        alt={blog.title} 
                                        className="w-full h-auto"
                                    />
                                </div>
                            )}
                            
                            {/* Blog Content */}
                            <div className="mb-10 prose max-w-none lg:prose-lg" dangerouslySetInnerHTML={{ __html: blog.content }} />
                            
                            {/* Tags */}
                            {blog.tags && blog.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {blog.tags.map((tag, index) => (
                                        <span 
                                            key={index} 
                                            className="px-3 py-1 text-sm text-green-700 bg-green-100 rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                            
                            {/* Related Posts */}
                            {relatedPosts && relatedPosts.length > 0 && (
                                <div className="mt-12">
                                    <h3 className="mb-6 text-2xl font-bold text-green-700">Jums vēl varētu patikt</h3>
                                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                        {relatedPosts.map((post) => (
                                            <div key={post.id} className="overflow-hidden transition duration-300 bg-white rounded-lg shadow-md hover:shadow-lg">
                                                {post.image_url && (
                                                    <div className="h-40 overflow-hidden">
                                                        <img 
                                                            src={post.image_url} 
                                                            alt={post.title} 
                                                            className="object-cover w-full h-full"
                                                        />
                                                    </div>
                                                )}
                                                <div className="p-4">
                                                    <h4 className="mb-2 text-lg font-bold text-green-600 line-clamp-2">{post.title}</h4>
                                                    <Link 
                                                        href={`/blog/${post.slug}`} 
                                                        className="inline-block px-3 py-1 text-sm text-white transition duration-300 bg-green-500 rounded hover:bg-green-600"
                                                    >
                                                        Lasīt vairāk
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}