import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; 

export default function Gallery({ auth }) {
    const [imagesBySubcategory, setImagesBySubcategory] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; 
    const [modalImage, setModalImage] = useState(null); 
    const [isModalOpen, setIsModalOpen] = useState(false); 

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch('/products/images');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const images = await response.json();
                setImagesBySubcategory(images); 
            } catch (error) {
                console.error('Error fetching images:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchImages();
    }, []);

    const handleCategorySelect = (subcategory) => {
        setSelectedSubcategory(subcategory);
        setCurrentPage(1); // Reset to the first page when a new category is selected
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // Filter images based on selected subcategory
    const filteredImages = selectedSubcategory
        ? imagesBySubcategory[selectedSubcategory] || []
        : Object.values(imagesBySubcategory).flat();

    // Calculate pagination
    const totalPages = Math.ceil(filteredImages.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedImages = filteredImages.slice(startIndex, startIndex + itemsPerPage);

    const openModal = (imageUrl) => {
        setModalImage(imageUrl);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalImage(null);
    };

    return (
        <>
            <Head title="Galerija" />
            <AuthenticatedLayout auth={auth}>
                <div className="gallery p-4">
                    {loading ? (
                        <p className="text-lg text-gray-700">Lūdzu, uzgaidiet...</p>
                    ) : (
                        <>
                            {/* Category Selection */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold mb-4">Izvēlies kategoriju:</h2>
                                <div className="flex flex-wrap">
                                    {Object.keys(imagesBySubcategory).map((subcategory) => (
                                        <button
                                            key={subcategory}
                                            onClick={() => handleCategorySelect(subcategory)}
                                            className={`m-2 p-2 border rounded-md ${selectedSubcategory === subcategory ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                        >
                                            {subcategory}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => handleCategorySelect('')} // Reset to show all images
                                        className={`m-2 p-2 border rounded-md ${!selectedSubcategory ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                    >
                                        Visi attēli
                                    </button>
                                </div>
                            </div>

                            {/* Image Gallery */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                                {paginatedImages.map((imageUrl, index) => (
                                    <div key={index} className="overflow-hidden rounded-lg shadow-lg">
                                        <img 
                                            src={imageUrl} 
                                            alt={`Image from ${selectedSubcategory}`} 
                                            className="w-full h-auto transition-transform duration-200 hover:scale-105 cursor-pointer"
                                            onClick={() => openModal(imageUrl)} 
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Pagination Controls */}
                            <div className="flex justify-between">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="bg-gray-300 text-gray-700 p-2 rounded disabled:opacity-50"
                                >
                                    Iepriekšējā
                                </button>
                                <span>{`Page ${currentPage} of ${totalPages}`}</span>
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="bg-gray-300 text-gray-700 p-2 rounded disabled:opacity-50"
                                >
                                    Nākamā
                                </button>
                            </div>

                            {/* Modal for larger image */}
                            {isModalOpen && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
                                    <div className="relative bg-white rounded-lg">
                                        <button onClick={closeModal} className="absolute top-2 right-2 text-white text-xl font-semibold">
                                            Aizvērt 
                                        </button>
                                        <img src={modalImage} alt="Large view" className="max-w-full max-h-[90dvh]" />
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </AuthenticatedLayout>
        </>
    );
}
