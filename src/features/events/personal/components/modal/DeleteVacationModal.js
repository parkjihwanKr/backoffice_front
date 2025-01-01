import React from 'react';
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
import { deleteVacationSchedule } from "../../services/PersonalScheduleService";
import DeleteButton from "../../../../../components/ui/buttons/DeleteButton"; // 스타일을 위한 CSS 파일 추가

const DeleteVacationModal = ({ handleClose, selectedVacation }) => {
    const handleDelete = async () => {
        try {
            await deleteVacationSchedule(selectedVacation.vacationId);
            handleClose();
        } catch (error) {
            console.error("휴가 삭제 실패 에러 : ", error);
        }
    };

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <h3>휴가 삭제</h3>
                    <CloseImageButton handleClose={handleClose}/>
                </div>
                <div className="custom-modal-body">
                    <p>정말로 휴가 '<strong>{selectedVacation.title}</strong>'을(를) 삭제하시겠습니까?</p>
                </div>
                <div className="custom-modal-footer">
                    <DeleteButton onSubmit={handleDelete} />
                </div>
            </div>
        </div>
    );
};

export default DeleteVacationModal;
