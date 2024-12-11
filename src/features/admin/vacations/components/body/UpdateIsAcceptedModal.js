import React from 'react';
import '../../../../../components/ui/modal/Modal.css';
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
import ConfirmButton from "../../../../../components/ui/buttons/ConfirmButton";

const UpdateIsAcceptedModal = ({ isOpen, vacation, onUpdate, onClose }) => {
    if (!isOpen || !vacation) return null;

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <h3>{vacation.onVacationMemberName}님의 휴가 승인</h3>
                    <CloseImageButton handleClose={onClose}/>
                </div>
                <div className="custom-modal-body">
                    <p>이 휴가를 {vacation.isAccepted ? '미승인' : '승인'} 상태로 변경하시겠습니까?</p>
                </div>
                <div className="custom-modal-footer">
                    <ConfirmButton
                        onClick={onUpdate}
                        text={vacation.isAccepted ? '미승인' : '승인'} />
                </div>
            </div>
        </div>
    );
};

export default UpdateIsAcceptedModal;
