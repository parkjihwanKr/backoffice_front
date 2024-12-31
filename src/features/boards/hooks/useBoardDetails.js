import { useEffect, useState } from "react";
import {fetchBoardDetails, fetchDepartmentBoardDetails} from "../services/BoardsService";

const useBoardDetails = (boardId, department, isDepartmentBoard) => {
    const [board, setBoard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        if(!isDepartmentBoard){
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
        }else{
            const fetchDepartmentBoard = async () => {
                try {
                    const response = await fetchDepartmentBoardDetails(boardId, department);
                    setBoard(response);
                    setComments(response.commentList || []);
                } catch (error) {
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchDepartmentBoard();
        }
    }, [boardId]);

    return { board, setBoard, comments, setComments, loading, error };
};

export default useBoardDetails;
