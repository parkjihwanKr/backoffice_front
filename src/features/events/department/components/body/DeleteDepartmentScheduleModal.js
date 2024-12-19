import React from 'react';
import '../../../../../components/ui/modal/Modal.css';
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
import SubmitButton from "../../../../../components/ui/buttons/SubmitButton"; // Delete 모달 스타일

const DeleteDepartmentScheduleModal = ({ title, isOpen, onClose, onDelete }) => {
    if (!isOpen) return null;

    const handleDelete = () => {
        onDelete(); // 삭제 로직 실행
    };

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <h3>일정 삭제</h3>
                    <CloseImageButton handleClose={onClose}/>
                </div>
                <div className="custom-modal-body">
                    정말로 '{title}'를 삭제하겠습니까?
                </div>
                <div className="custom-modal-footer">
                    <SubmitButton onSubmit={handleDelete} text={"삭제"}/>
                </div>
            </div>
        </div>
    );
};

export default DeleteDepartmentScheduleModal;
