import { useState, useEffect } from 'react';
import { getCookie } from "../../../../utils/CookieUtil";
import {fetchAllBoards} from "../services/AllBoardsService";

const useFetchBoards = (itemsPerPage = 8) => {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const accessToken = getCookie('accessToken');

    const fetchBoards = async () => {
        try {
            const data = await fetchAllBoards();
            setBoards(data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBoards();
    }, [accessToken]);

    const indexOfLastBoard = (currentPage + 1) * itemsPerPage;
    const indexOfFirstBoard = indexOfLastBoard - itemsPerPage;
    const currentBoards = boards.slice(indexOfFirstBoard, indexOfLastBoard);

    const totalPages = Math.ceil(boards.length / itemsPerPage);

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
