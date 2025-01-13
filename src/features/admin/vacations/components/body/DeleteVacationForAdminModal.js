import React, { useState } from 'react';
import './DeleteVacationForAdminModal.css';
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
import ConfirmButton from "../../../../../components/ui/buttons/ConfirmButton";

const DeleteVacationForAdminModal = ({ isOpen, vacation, onDelete, onClose }) => {
    const [reason, setReason] = useState(''); // 삭제 사유 상태

    if (!isOpen || !vacation) return null;

    const handleDelete = () => {
        if (reason.trim()) {
            onDelete(reason); // 삭제 사유를 부모 컴포넌트로 전달
        } else {
            alert('삭제 사유를 입력해주세요.');
        }
    };

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <h3>휴가 삭제</h3>
                    <CloseImageButton handleClose={onClose} />
                </div>
                <div className="custom-modal-body">
                    정말로 <strong>'{vacation.onVacationMemberName}'</strong>님의 휴가를 삭제하시겠습니까?
                    <div className="gap-top-bottom"></div>
                    <div className="custom-modal-body-index">
                        <label
                            htmlFor="delete-reason"
                            className="center-align-label">
                            삭제 사유:
                        </label>
                        <textarea
                            id="delete-reason"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="삭제 사유를 입력해주세요."
                        />
                    </div>
                </div>
                <div className="delete-vacation-admin-modal-footer">
                    <ConfirmButton onClick={handleDelete} text={"삭제"} />
                </div>
            </div>
        </div>
    );
};

export default DeleteVacationForAdminModal;
