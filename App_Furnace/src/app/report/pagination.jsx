import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {

    // Determine which page numbers to display
    const getPageNumbersToShow = () => {
        const pageNumbersToShow = [];

        // Define the range for the page numbers to display
        let start = Math.max(currentPage - 2, 1);
        let end = Math.min(currentPage + 2, totalPages);

        // Adjust the start and end for the boundaries
        if (currentPage <= 3) {
            end = Math.min(5, totalPages); // Show first 5 pages if current page is 3 or less
        } else if (currentPage >= totalPages - 2) {
            start = Math.max(totalPages - 4, 1); // Show last 5 pages if current page is within the last 2
        }

        // Create the page numbers array
        for (let i = start; i <= end; i++) {
            pageNumbersToShow.push(i);
        }

        // Add ellipses for truncation if necessary
        if (start > 1) {
            pageNumbersToShow.unshift('...');
            pageNumbersToShow.unshift(1);
        }

        if (end < totalPages) {
            pageNumbersToShow.push('...');
            pageNumbersToShow.push(totalPages);
        }

        return pageNumbersToShow;
    };

    const pageNumbersToShow = getPageNumbersToShow();

    return (
        <div className="flex justify-between items-center gap-2 w-full p-2 bg-gray-100">
            <div className="flex items-center justify-center w-full gap-4">
                <button
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    className={` w-20 p-2 rounded ${currentPage === 1 ? "bg-sky-500 text-white rounded hover:bg-sky-600 transition duration-300cursor-not-allowed" : "bg-sky-500 text-white rounded hover:bg-sky-600 transition duration-300"}`}
                >
                    Previous
                </button>

                {pageNumbersToShow.map((number, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            if (number !== '...') {
                                onPageChange(number);
                            }
                        }}
                        className={`p-2 w-2 flex items-center justify-center  rounded ${number === currentPage ? " text-sky-400" : number === '...' ? "" : " hover:text-sky-400 "}`}
                    >
                        {number}
                    </button>
                ))}

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                    className={`p-2 w-20 rounded ${currentPage === totalPages ? "bg-sky-500 text-white rounded hover:bg-sky-600 transition duration-300  cursor-not-allowed" : "bg-sky-500 text-white rounded hover:bg-sky-600 transition duration-300"}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;
