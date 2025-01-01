import React from "react";
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
import SubmitButton from "../../../../../components/ui/buttons/SubmitButton";
import useModalScroll from "../../../../../hooks/useModalScroll";
import useUpdateCheckOutTimeModal from "../hooks/useUpdateCheckOutTimeModal";

const UpdateCheckOutTimeModal = ({ show, attendanceId, onClose, updateAttendanceInState }) => {
    useModalScroll(show);

    const { description, setDescription, handleSubmit } = useUpdateCheckOutTimeModal(
        attendanceId,
        updateAttendanceInState,
        onClose
    );

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <h3>퇴근 시간 업데이트</h3>
                    <CloseImageButton handleClose={onClose} />
                </div>
                <div className="custom-modal-body">
                    <div className="list-column">
                        <div className="list-attendance-description-title">
                            추가 설명(선택 사항) :
                        </div>
                        <textarea
                            placeholder="설명을 입력하세요."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="description-textarea"
                        />
                    </div>
                    <div className="caution-description">
                        ☆ 현재 시간에 맞추어 퇴근 신청이 됩니다.
                    </div>
                </div>
                <div className="custom-modal-footer">
                    <SubmitButton onSubmit={handleSubmit} text={"퇴근 신청"} />
                </div>
            </div>
        </div>
    );
};

export default UpdateCheckOutTimeModal;
