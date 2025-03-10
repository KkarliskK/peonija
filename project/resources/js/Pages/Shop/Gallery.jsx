import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Gallery({ auth }) {
    const [imagesBySubcategory, setImagesBySubcategory] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [modalImage, setModalImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

        const handleResize = () => {
            if (window.innerWidth < 640) {
                setItemsPerPage(6);
            } else if (window.innerWidth < 1024) {
                setItemsPerPage(8);
            } else {
                setItemsPerPage(12);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleCategorySelect = (subcategory) => {
        setSelectedSubcategory(subcategory);
        setCurrentPage(1);
        setIsMenuOpen(false);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        // window.scrollTo({
        //     top: 0,
        //     behavior: 'smooth'
        // });
    };

    const filteredImages = selectedSubcategory
        ? imagesBySubcategory[selectedSubcategory] || []
        : Object.values(imagesBySubcategory).flat();

    const totalPages = Math.ceil(filteredImages.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedImages = filteredImages.slice(startIndex, startIndex + itemsPerPage);

    const openModal = (imageUrl) => {
        setModalImage(imageUrl);
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setModalImage(null), 300);
        document.body.style.overflow = 'auto';
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isModalOpen) return;
            
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowRight' && filteredImages.length > 0) {
                const currentIndex = filteredImages.indexOf(modalImage);
                if (currentIndex < filteredImages.length - 1) {
                    setModalImage(filteredImages[currentIndex + 1]);
                }
            } else if (e.key === 'ArrowLeft' && filteredImages.length > 0) {
                const currentIndex = filteredImages.indexOf(modalImage);
                if (currentIndex > 0) {
                    setModalImage(filteredImages[currentIndex - 1]);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isModalOpen, modalImage, filteredImages]);

    return (
        <>
            <Head title="Galerija" />
            <AuthenticatedLayout auth={auth}>
                <div className="py-12">
                    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-xl sm:rounded-lg dark:bg-gray-800">
                            <div className="p-6">
                                <h1 className="mb-8 text-3xl font-bold text-gray-800 dark:text-gray-200">Galerija</h1>

                                {loading ? (
                                    <div className="flex items-center justify-center h-64">
                                        <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
                                    </div>
                                ) : (
                                    <>
                                        {/* Mobile Category Dropdown */}
                                        <div className="block mb-6 md:hidden">
                                            <div className="relative">
                                                <button 
                                                    onClick={toggleMenu}
                                                    className="flex items-center justify-between w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                >
                                                    <span>{selectedSubcategory || 'Visi attēli'}</span>
                                                    <svg className={`w-5 h-5 transition-transform ${isMenuOpen ? 'transform rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                                
                                                {isMenuOpen && (
                                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                                                        <button
                                                            onClick={() => handleCategorySelect('')}
                                                            className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${!selectedSubcategory ? 'bg-blue-100 text-blue-700' : ''}`}
                                                        >
                                                            Visi attēli
                                                        </button>
                                                        {Object.keys(imagesBySubcategory).map((subcategory) => (
                                                            <button
                                                                key={subcategory}
                                                                onClick={() => handleCategorySelect(subcategory)}
                                                                className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${selectedSubcategory === subcategory ? 'bg-blue-100 text-blue-700' : ''}`}
                                                            >
                                                                {subcategory}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Desktop Categories */}
                                        <div className="hidden mb-8 md:block">
                                            <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Izvēlies kategoriju:</h2>
                                            <div className="flex flex-wrap gap-2">
                                                <button
                                                    onClick={() => handleCategorySelect('')}
                                                    className={`px-4 py-2 rounded-full transition-colors ${!selectedSubcategory 
                                                        ? 'bg-blue-600 text-white shadow-md dark:bg-gray-400' 
                                                        : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:text-white text-gray-800'}`}
                                                >
                                                    Visi attēli
                                                </button>
                                                {Object.keys(imagesBySubcategory).map((subcategory) => (
                                                    <button
                                                        key={subcategory}
                                                        onClick={() => handleCategorySelect(subcategory)}
                                                        className={`px-4 py-2 rounded-full transition-colors ${selectedSubcategory === subcategory 
                                                            ? 'bg-blue-600 text-white shadow-md dark:bg-gray-400' 
                                                            : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:text-white text-gray-800'}`}
                                                    >
                                                        {subcategory}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Gallery - Masonry Style for larger screens */}
                                        <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                            {paginatedImages.length > 0 ? (
                                                paginatedImages.map((imageUrl, index) => (
                                                    <div 
                                                        key={index} 
                                                        className="overflow-hidden transition-shadow duration-300 rounded-lg shadow-md hover:shadow-xl"
                                                        style={{
                                                            height: `${200 + Math.floor(Math.random() * 100)}px`
                                                        }}
                                                    >
                                                        <img 
                                                            src={imageUrl} 
                                                            alt={`Image ${index + 1} ${selectedSubcategory ? `from ${selectedSubcategory}` : ''}`} 
                                                            className="object-cover w-full h-full transition-transform duration-500 cursor-pointer hover:scale-105"
                                                            onClick={() => openModal(imageUrl)} 
                                                        />
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="py-12 text-center col-span-full">
                                                    <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <h3 className="mt-2 text-lg font-medium text-gray-900">Nav attēlu</h3>
                                                    <p className="mt-1 text-gray-500">Šajā kategorijā nav atrasts neviens attēls.</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Pagination */}
                                        {totalPages > 1 && (
                                            <div className="flex justify-center mt-8">
                                                <nav className="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                                    <button
                                                        onClick={() => handlePageChange(1)}
                                                        disabled={currentPage === 1}
                                                        className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        <span className="sr-only">First</span>
                                                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            <path fillRule="evenodd" d="M8.707 5.293a1 1 0 010 1.414L5.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => handlePageChange(currentPage - 1)}
                                                        disabled={currentPage === 1}
                                                        className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        <span className="sr-only">Previous</span>
                                                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                    
                                                    {/* Page Numbers */}
                                                    {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                                                        let pageNum;
                                                        
                                                        if (totalPages <= 5) {
                                                            pageNum = i + 1;
                                                        } else if (currentPage <= 3) {
                                                            pageNum = i + 1;
                                                        } else if (currentPage >= totalPages - 2) {
                                                            pageNum = totalPages - 4 + i;
                                                        } else {
                                                            pageNum = currentPage - 2 + i;
                                                        }
                                                        
                                                        return (
                                                            <button
                                                                key={i}
                                                                onClick={() => handlePageChange(pageNum)}
                                                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                                    currentPage === pageNum
                                                                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                                }`}
                                                            >
                                                                {pageNum}
                                                            </button>
                                                        );
                                                    })}
                                                    
                                                    <button
                                                        onClick={() => handlePageChange(currentPage + 1)}
                                                        disabled={currentPage === totalPages}
                                                        className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        <span className="sr-only">Next</span>
                                                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => handlePageChange(totalPages)}
                                                        disabled={currentPage === totalPages}
                                                        className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        <span className="sr-only">Last</span>
                                                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                            <path fillRule="evenodd" d="M11.293 14.707a1 1 0 010-1.414L14.586 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                </nav>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Image Lightbox Modal */}
                {isModalOpen && (
                    <div 
                        className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-90"
                        onClick={closeModal}
                    >
                        <div 
                            className="relative mx-4 max-w-screen-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                onClick={closeModal} 
                                className="absolute right-0 text-white -top-12 hover:text-gray-300 focus:outline-none"
                                aria-label="Close modal"
                            >
                                <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            
                            {modalImage && (
                                <img 
                                    src={modalImage} 
                                    alt="Enlarged view" 
                                    className="max-w-full max-h-[85vh] object-contain rounded shadow-xl" 
                                />
                            )}
                            
                            {/* Navigation Arrows */}
                            <div className="absolute inset-y-0 left-0 flex items-center">
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const currentIndex = filteredImages.indexOf(modalImage);
                                        if (currentIndex > 0) {
                                            setModalImage(filteredImages[currentIndex - 1]);
                                        }
                                    }}
                                    className="p-2 mx-2 text-white bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 focus:outline-none"
                                    disabled={filteredImages.indexOf(modalImage) === 0}
                                    aria-label="Previous image"
                                >
                                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center">
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const currentIndex = filteredImages.indexOf(modalImage);
                                        if (currentIndex < filteredImages.length - 1) {
                                            setModalImage(filteredImages[currentIndex + 1]);
                                        }
                                    }}
                                    className="p-2 mx-2 text-white bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 focus:outline-none"
                                    disabled={filteredImages.indexOf(modalImage) === filteredImages.length - 1}
                                    aria-label="Next image"
                                >
                                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                            
                            {/* Image Counter */}
                            <div className="absolute left-0 right-0 text-sm text-center text-white bottom-4">
                                {filteredImages.indexOf(modalImage) + 1} / {filteredImages.length}
                            </div>
                        </div>
                    </div>
                )}
            </AuthenticatedLayout>
        </>
    );
}