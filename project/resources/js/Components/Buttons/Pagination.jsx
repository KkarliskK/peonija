export default function Pagination({ currentPage, lastPage, onPageChange }) {
    const paginationItems = [];

    if (currentPage > 1) {
        paginationItems.push(
            <button
                key="prev"
                onClick={() => onPageChange(currentPage - 1)}
                className="mx-1 p-2 rounded bg-gray-200 hover:bg-gray-300"
            >
                Iepriekšējā
            </button>
        );
    }

    for (let i = 1; i <= lastPage; i++) {
        paginationItems.push(
            <button
                key={i}
                onClick={() => onPageChange(i)}
                className={`mx-1 p-2 rounded ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
                {i}
            </button>
        );
    }

    if (currentPage < lastPage) {
        paginationItems.push(
            <button
                key="next"
                onClick={() => onPageChange(currentPage + 1)}
                className="mx-1 p-2 rounded bg-gray-200 hover:bg-gray-300"
            >
                Nākamā
            </button>
        );
    }

    return (
        <div className="flex justify-center mt-4">
            {paginationItems}
        </div>
    );
}
