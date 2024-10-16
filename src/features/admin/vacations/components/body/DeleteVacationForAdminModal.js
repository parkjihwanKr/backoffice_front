/*DeleteVacationForAdminModal.js*/
import React from 'react';
import './DeleteVacationForAdminModal.css';

const DeleteVacationForAdminModal = ({ vacation, onClose, onDelete }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>휴가 삭제</h3>
                <p>정말로 '{vacation.onVacationMemberName}'님의 휴가를 삭제하시겠습니까?</p>
                <div className="modal-footer">
                    <button onClick={onDelete}>삭제</button>
                    <button onClick={onClose}>취소</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteVacationForAdminModal;
