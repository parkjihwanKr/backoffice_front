import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // URL 매개변수 접근을 위한 훅
import { getCookie } from "../../../../utils/CookieUtil";
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS 적용

const BoardDetails = () => {
    const { boardId } = useParams(); // URL에서 boardId 가져오기
    const [board, setBoard] = useState(null); // 게시글 정보를 저장할 상태
    const [loading, setLoading] = useState(true); // 로딩 상태 관리
    const [error, setError] = useState(null); // 에러 상태 관리
    const accessToken = getCookie('accessToken');

    useEffect(() => {
        const fetchBoard = async () => {
            try {
                const response = await fetch(`/api/v1/boards/${boardId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch board');
                }

                const data = await response.json();
                setBoard(data); // 게시글 정보 설정
                setLoading(false); // 로딩 완료
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchBoard();
    }, [boardId, accessToken]);

    if (loading) {
        return <p>Loading...</p>; // 로딩 중일 때
    }

    if (error) {
        return <p>Error: {error}</p>; // 에러 발생 시
    }

    if (!board) {
        return <p>Board not found</p>; // 게시글이 없는 경우
    }

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h2>{board.title}</h2> {/* 게시글 제목 */}
                </div>
                <div className="card-body">
                    <p>{board.content}</p> {/* 게시글 내용 */}
                    <div className="d-flex justify-content-between mt-4">
                        <span>좋아요: {board.likeCount}</span>
                        <span>조회수: {board.viewCount}</span>
                        <span>댓글 수: {board.commentCount}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoardDetails;
