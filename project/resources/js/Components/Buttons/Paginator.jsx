import React from 'react';

const Paginator = ({ 
    currentPage, 
    totalPages, 
    onPageChange,
    className = '' 
}) => {
    const getPaginationNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            
            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);
            
            if (startPage > 2) {
                pages.push('...');
            }
            
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
            
            if (endPage < totalPages - 1) {
                pages.push('...');
            }
            
            if (totalPages > 1) {
                pages.push(totalPages);
            }
        }
        
        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className={`flex items-center justify-center mt-8 mb-4 ${className}`}>
            <nav className="flex items-center gap-1">
                <button
                    onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex items-center justify-center w-10 h-10 transition-colors duration-300 border border-pink-300 rounded-full dark:text-gray-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-pink-100"
                    aria-label="Previous page"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>
                
                {getPaginationNumbers().map((page, index) => (
                    page === '...' ? (
                        <span key={`ellipsis-${index}`} className="px-2">...</span>
                    ) : (
                        <button
                            key={`page-${page}`}
                            onClick={() => onPageChange(page)}
                            className={`w-10 h-10 rounded-full transition-colors duration-300 ${
                                currentPage === page 
                                    ? 'bg-pink-500 text-white font-medium' 
                                    : 'hover:bg-pink-100 border border-pink-300 dark:text-gray-200'
                            }`}
                            aria-label={`Page ${page}${currentPage === page ? ' (current)' : ''}`}
                            aria-current={currentPage === page ? 'page' : undefined}
                        >
                            {page}
                        </button>
                    )
                ))}
                
                <button
                    onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="flex items-center justify-center w-10 h-10 transition-colors duration-300 border border-pink-300 rounded-full dark:text-gray-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-pink-100"
                    aria-label="Next page"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
            </nav>
        </div>
    );
};

export default Paginator;