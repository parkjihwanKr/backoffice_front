import { useState } from 'react';

const usePagination = (initialPage = 0, initialTotalPages = 1) => {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [totalPages, setTotalPages] = useState(initialTotalPages);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const updateTotalPages = (newTotalPages) => {
        setTotalPages(newTotalPages);
    };

    return {
        currentPage,
        totalPages,
        handlePageChange,
        updateTotalPages,
    };
};

export default usePagination;
