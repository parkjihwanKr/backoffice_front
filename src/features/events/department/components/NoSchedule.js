// src/NoSchedulePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NoSchedulePage = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>일정이 없습니다</h2>
            <p>현재 선택된 일정이 없습니다.</p>
            <button onClick={goBack} style={{ padding: '10px 20px', cursor: 'pointer' }}>
                돌아가기
            </button>
        </div>
    );
};

export default NoSchedulePage;
