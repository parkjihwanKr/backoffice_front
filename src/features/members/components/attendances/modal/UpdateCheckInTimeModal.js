import React from "react";
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
import SubmitButton from "../../../../../components/ui/buttons/SubmitButton";
import useModalScroll from "../../../../../hooks/useModalScroll";
import useUpdateCheckInTimeModal from "../hooks/useUpdateCheckInTimeModal";

const UpdateCheckInTimeModal = ({ show, attendanceId, onClose, updateAttendanceInState }) => {
    useModalScroll(show);

    const { handleSubmit } = useUpdateCheckInTimeModal(attendanceId, updateAttendanceInState, onClose);

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <h3>출근 시간 업데이트</h3>
                    <CloseImageButton handleClose={onClose} />
                </div>
                <div className="custom-modal-body">
                    <div className="caution-description">
                        ☆ 현재 시간에 맞추어 출근 신청이 됩니다.
                    </div>
                </div>
                <div className="custom-modal-footer">
                    <SubmitButton onSubmit={handleSubmit} text={"출근 신청"} />
                </div>
            </div>
        </div>
    );
};

export default UpdateCheckInTimeModal;
