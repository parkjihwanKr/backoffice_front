import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../shared/DomainContainer.css';
import SelectDepartmentModal from '../../../shared/SelectDepartmentModal';
import useModal from '../hooks/useModal';
import { getMappedDepartment } from '../services/BoardsService';
import { imagePrefix } from "../../../../utils/Constant";

const Boards = () => {
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const { showModal, openModal, closeModal } = useModal();
    const navigate = useNavigate();

    const handleSubmit = () => {
        console.log("handelSubmit method call");
        const mappedDepartment = getMappedDepartment(selectedDepartment);
        if (selectedDepartment) {
            navigate(`/department-boards/${mappedDepartment}`);
            closeModal();
        } else {
            alert('부서를 선택하세요.');
        }
    };

    return (
        <div className="domain-container">
            <h1 className="domain-title">백오피스 게시판</h1>
            <div className="domain-card-row">
                <div className="domain-card">
                    <div className="domain-card-header">
                        <h3>전체 게시판</h3>
                    </div>
                    <div className="domain-card-body">
                        <img
                            src={`${imagePrefix}/shared/companyBoard.png`}
                            alt="전체 게시판 이미지"
                            className="domain-card-img"/>
                        <button className="all-domain-button"
                                onClick={() => navigate('/all-boards')}>
                            이동
                        </button>
                    </div>
                </div>

                <div className="domain-card">
                    <div className="domain-card-header">
                        <h3>부서 게시판</h3>
                    </div>
                    <div className="domain-card-body">
                        <img
                            src={`${imagePrefix}/shared/departmentBoard.png`}
                            alt="부서 게시판 이미지"
                            className="domain-card-img"/>
                        <button className="department-domain-button" onClick={openModal}>이동</button>
                    </div>
                </div>
            </div>

            <SelectDepartmentModal
                showModal={showModal}
                onClose={closeModal}
                selectedDepartment={selectedDepartment}
                setSelectedDepartment={setSelectedDepartment}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

export default Boards;
