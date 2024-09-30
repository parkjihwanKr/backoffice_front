import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Boards.css';
import SelectDepartmentModal from './SelectDepartmentModal'; // 모달 컴포넌트 가져오기

const Boards = () => {
    const [showModal, setShowModal] = useState(false);
    const [departments] = useState(['HR', 'FINANCE', 'IT', 'MARKETING', 'SALES', 'AUDIT']);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const navigate = useNavigate();

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSubmit = () => {
        console.log("handelSubmit method call");
        if (selectedDepartment) {
            navigate(`/department-boards/${selectedDepartment}`); // 부서로 이동
            handleCloseModal(); // 모달 닫기
        } else {
            alert('부서를 선택하세요.');
        }
    };

    return (
        <div className="boards-container">
            <h1 className="text-center mb-4">백오피스 게시판</h1>

            <div className="card-row">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">전체 게시판</h5>
                        <p className="card-text">모든 직원 게시판</p>
                        <img
                            src="https://pjhawss3bucket.s3.ap-northeast-2.amazonaws.com/companyBoard.png"
                            alt="전체 게시판 이미지"
                            className="img-fluid"
                        />
                        <hr />
                        <button className="button" onClick={() => navigate('/all-boards')}>Go to All Boards</button>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">부서 게시판</h5>
                        <p className="card-text">부서별 게시판</p>
                        <img
                            src="https://pjhawss3bucket.s3.ap-northeast-2.amazonaws.com/departmentBoard.png"
                            alt="부서 게시판 이미지"
                            className="img-fluid"
                        />
                        <hr />
                        <button className="button" onClick={handleShowModal}>Go to Department Boards</button>
                    </div>
                </div>
            </div>

            {/* 분리한 SelectDepartmentModal 사용 */}
            <SelectDepartmentModal
                showModal={showModal}
                handleClose={handleCloseModal}
                selectedDepartment={selectedDepartment}
                setSelectedDepartment={setSelectedDepartment}
                departments={departments}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

export default Boards;
