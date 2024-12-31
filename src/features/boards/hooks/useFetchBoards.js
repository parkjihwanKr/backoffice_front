import { useState, useEffect } from 'react';
import { fetchAllBoards, fetchDepartmentBoards } from "../services/BoardsService";

const useFetchBoards = (department) => {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(0);

    const fetchBoards = async () => {
        setLoading(true);
        try {
            const data = Boolean(department)
                ? await fetchDepartmentBoards(department)
                : await fetchAllBoards();

            setBoards(data.content);
            setItemsPerPage(data.size); // pageable size = 8
            setTotalPages(data.totalPages);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBoards();
    }, [department]);

    const indexOfLastBoard = (currentPage + 1) * itemsPerPage;
    const indexOfFirstBoard = indexOfLastBoard - itemsPerPage;
    const currentBoards = boards.slice(indexOfFirstBoard, indexOfLastBoard);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return {
        boards,
        currentBoards,
        totalPages,
        currentPage,
        loading,
        error,
        handlePageChange,
    };
};

export default useFetchBoards;