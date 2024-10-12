import React from 'react';
import CloseImageButton from "../../../../components/ui/image/CloseImageButton";
import { deleteVacationSchedule } from "../services/PersonalScheduleService";
import './DeleteVacationModal.css'; // 스타일을 위한 CSS 파일 추가

const DeleteVacationModal = ({ handleClose, selectedVacation }) => {
    const handleDelete = async () => {
        try {
            const response = await deleteVacationSchedule(selectedVacation.vacationId);
            console.log("Vacation deleted successfully:", response);
            // 휴가 삭제 후 모달 닫기
            handleClose();
        } catch (error) {
            console.error("Error deleting vacation:", error);
        }
    };

    return (
        <div className="delete-vacation-modal-overlay">
            <div className="delete-vacation-modal-content">
                <div className="delete-vacation-modal-header">
                    <h3>휴가 삭제</h3>
                    <CloseImageButton handleClose={handleClose} className="modal-close-icon" />
                </div>
                <div className="delete-vacation-modal-body">
                    <p>정말로 휴가 <strong>{selectedVacation.title}</strong>을(를) 삭제하시겠습니까?</p>
                </div>
                <div className="delete-vacation-modal-footer">
                    <button onClick={handleDelete} className="confirm-button">
                        삭제
                    </button>
                    <button onClick={handleClose} className="cancel-button">
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteVacationModal;
