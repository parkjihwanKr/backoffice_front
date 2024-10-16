import React, { useState } from 'react';
import './DeleteVacationForAdminModal.css';
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";

const DeleteVacationForAdminModal = ({ isOpen, vacation, onDelete, onClose }) => {
    const [deleteReason, setDeleteReason] = useState(''); // 삭제 사유 상태

    if (!isOpen || !vacation) return null;

    const handleDelete = () => {
        if (deleteReason.trim()) {
            onDelete(deleteReason); // 삭제 사유를 함께 전달
        } else {
            alert('삭제 사유를 입력해주세요.'); // 사유가 없을 경우 알림
        }
    };

    return (
        <div className="delete-vacation-admin-modal-overlay">
            <div className="delete-vacation-admin-modal">
                <div className="delete-vacation-admin-modal-header">
                    <h3>휴가 삭제</h3>
                    <CloseImageButton handleClose={onClose} />
                </div>
                <p>정말로 <strong>'{vacation.onVacationMemberName}'</strong>님의 휴가를 삭제하시겠습니까?</p>

                {/* 삭제 사유 입력란 */}
                <div className="delete-reason-input">
                    <label htmlFor="delete-reason">삭제 사유:</label>
                    <textarea
                        id="delete-reason"
                        value={deleteReason}
                        onChange={(e) => setDeleteReason(e.target.value)}
                        placeholder="삭제 사유를 입력해주세요."
                    />
                </div>

                <div className="delete-vacation-admin-modal-footer">
                    <button onClick={handleDelete}>삭제</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteVacationForAdminModal;
