import React from 'react';
import { useParams } from 'react-router-dom';

const DepartmentBoards = () => {
    const { department } = useParams();

    return (
        <div>
            <h2>{department} 부서 게시판</h2>
            {/* 부서 게시판 내용 */}
        </div>
    );
};

export default DepartmentBoards;
