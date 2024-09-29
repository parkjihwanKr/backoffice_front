import React from 'react';
import './DeleteDepartmentScheduleModal.css'; // Delete 모달 스타일

const DeleteDepartmentScheduleModal = ({ isOpen, onClose, onDelete }) => {
    if (!isOpen) return null;

    const handleDelete = () => {
        onDelete(); // 삭제 로직 실행
    };

    return (
        <div className="delete-modal-overlay">
            <div className="delete-modal">
                <h5>정말로 이 일정을 삭제하시겠습니까?</h5>
                <div className="modal-actions">
                    <button className="btn btn-danger" onClick={handleDelete}>삭제</button>
                    <button className="btn btn-secondary" onClick={onClose}>취소</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteDepartmentScheduleModal;
