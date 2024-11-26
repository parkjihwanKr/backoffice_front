import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Boards.css';
import SelectDepartmentModal from './SelectDepartmentModal';
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
        <div className="boards-container">
            <h1 className="boards-title">백오피스 게시판</h1>

            <div className="boards-card-row">
                <div className="boards-card">
                    <div className="boards-card-header">
                        <h3>전체 게시판</h3>
                    </div>
                    <div className="boards-card-body">
                        <img
                            src={`${imagePrefix}/shared/companyBoard.png`}
                            alt="전체 게시판 이미지"
                            className="boards-card-img"/>
                        <button className="all-boards-button" onClick={() => navigate('/all-boards')}>이동</button>
                    </div>
                </div>

                <div className="boards-card">
                    <div className="boards-card-header">
                        <h3>부서 게시판</h3>
                    </div>
                    <div className="boards-card-body">
                        <img
                            src={`${imagePrefix}/shared/departmentBoard.png`}
                            alt="부서 게시판 이미지"
                            className="boards-card-img"/>
                        <button className="department-boards-button" onClick={openModal}>이동</button>
                    </div>
                </div>
            </div>

            <SelectDepartmentModal
                showModal={showModal}
                handleClose={closeModal}
                selectedDepartment={selectedDepartment}
                setSelectedDepartment={setSelectedDepartment}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

export default Boards;
