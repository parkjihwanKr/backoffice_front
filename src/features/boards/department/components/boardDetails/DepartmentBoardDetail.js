import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCookie } from "../../../../../utils/CookieUtil";

const DepartmentBoardDetail = () => {
    const { departmentName, boardId } = useParams(); // 경로에서 departmentName과 boardId를 가져옴
    const [boardDetail, setBoardDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const accessToken = getCookie('accessToken');

    useEffect(() => {
        const fetchBoardDetail = async () => {
            try {
                const response = await fetch(`/api/v1/departments/${departmentName}/boards/${boardId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch board detail');
                }

                const data = await response.json();
                setBoardDetail(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchBoardDetail();
    }, [departmentName, boardId, accessToken]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="container">
            <h2>{boardDetail.title}</h2>
            <p>{boardDetail.content}</p>
            {/* 기타 게시글 정보 표시 */}
        </div>
    );
};

export default DepartmentBoardDetail;
