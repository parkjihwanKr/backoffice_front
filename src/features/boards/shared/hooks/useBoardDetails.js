import { useEffect, useState } from "react";
import { fetchBoardDetails } from "../services/BoardsService";

const useBoardDetails = (boardId) => {
    const [board, setBoard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchBoard = async () => {
            try {
                const response = await fetchBoardDetails(boardId);
                setBoard(response);
                setComments(response.commentList || []);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBoard();
    }, [boardId]);

    return { board, setBoard, comments, setComments, loading, error };
};

export default useBoardDetails;
