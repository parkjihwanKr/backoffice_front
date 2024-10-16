import React from 'react';
import './UpdateIsAcceptedModal.css';
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";

const UpdateIsAcceptedModal = ({ isOpen, vacation, onUpdate, onClose }) => {
    if (!isOpen || !vacation) return null;

    return (
        <div className="update-vacation-accepted-modal-overlay">
            <div className="update-vacation-accepted-modal">
                <div className="update-vacation-accepted-modal-header">
                    <h3>{vacation.onVacationMemberName}님의 휴가 승인</h3>
                    <CloseImageButton handleClose={onClose}/>
                </div>
                <div className="update-vacation-accepted-modal-body">
                    <p>이 휴가를 {vacation.isAccepted ? '미승인' : '승인'} 상태로 변경하시겠습니까?</p>
                </div>
                <div className="update-vacation-modal-accepted-footer">
                    <button onClick={onUpdate}>
                        {vacation.isAccepted ? '미승인' : '승인'}
                    </button>
                    <button onClick={onClose}>취소</button>
                </div>
            </div>
        </div>
    );
};

export default UpdateIsAcceptedModal;
