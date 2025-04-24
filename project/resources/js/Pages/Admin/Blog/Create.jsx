import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/Input/InputError';
import InputLabel from '@/Components/Input/InputLabel';
import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import TextInput from '@/Components/Input/TextInput';

export default function BlogCreate({ auth }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        image: null,
    });

    const [imagePreview, setImagePreview] = useState(null);

    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    };

    const handleTitleChange = (e) => {
        const title = e.target.value;
        setData({
            ...data,
            title,
            slug: generateSlug(title)
        });
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.blogs.store'), {
            onSuccess: () => {
                reset();
                setImagePreview(null);
            },
        });
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Izveidot Bloga Ierakstu" />
            
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-900">
                        <div className="p-6 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-0">
                            <h1 className="mb-8 text-3xl font-bold text-center text-accent">Izveidot Jaunu Bloga Ierakstu</h1>
                            
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="title" value="Virsraksts" />
                                    <TextInput
                                        id="title"
                                        type="text"
                                        name="title"
                                        value={data.title}
                                        className="block w-full mt-1"
                                        onChange={handleTitleChange}
                                        required
                                    />
                                    <InputError message={errors.title} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="slug" value="Slug (URL)" />
                                    <TextInput
                                        id="slug"
                                        type="text"
                                        name="slug"
                                        value={data.slug}
                                        className="block w-full mt-1"
                                        onChange={(e) => setData('slug', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.slug} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="excerpt" value="Kopsavilkums (neobligāts)" />
                                    <textarea
                                        id="excerpt"
                                        name="excerpt"
                                        value={data.excerpt}
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                        onChange={(e) => setData('excerpt', e.target.value)}
                                        rows="3"
                                    />
                                    <InputError message={errors.excerpt} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="content" value="Saturs" />
                                    <textarea
                                        id="content"
                                        name="content"
                                        value={data.content}
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                        onChange={(e) => setData('content', e.target.value)}
                                        rows="10"
                                        required
                                    />
                                    <InputError message={errors.content} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="image_url" value="Attēla URL" />
                                    <TextInput
                                        id="image_url"
                                        type="url"
                                        name="image_url"
                                        value={data.image_url}
                                        className="block w-full mt-1"
                                        onChange={(e) => setData('image_url', e.target.value)}
                                        placeholder="https://example.com/image.jpg"
                                    />
                                    <InputError message={errors.image_url} className="mt-2" />
                                </div>

                                {imagePreview && (
                                    <div className="mt-4">
                                        <h3 className="mb-2 text-lg font-medium">Attēla priekšskatījums:</h3>
                                        <div className="w-full overflow-hidden rounded-lg h-60">
                                            <img 
                                                src={imagePreview} 
                                                alt="Priekšskatījums" 
                                                className="object-cover w-full h-full" 
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center justify-end mt-4">
                                    <PrimaryButton className="ml-4" disabled={processing}>
                                        Izveidot ierakstu
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}