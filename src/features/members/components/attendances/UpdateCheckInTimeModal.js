import React from "react";
import { updateCheckInTime } from "../../services/MembersService";
import CloseImageButton from "../../../../components/ui/image/CloseImageButton";
import SubmitButton from "../../../../components/ui/buttons/SubmitButton";
import DateUtils from "../../../../utils/DateUtils";

const UpdateCheckInTimeModal = ({ attendanceId, onClose, updateAttendanceInState }) => {

    const handleSubmit = async () => {
        const currentCheckInTime = DateUtils.formatDateTimeToISOString(new Date());
        try {
            const response = await updateCheckInTime(attendanceId, currentCheckInTime);
            updateAttendanceInState(response.attendnaceStatus); // 상태 업데이트
            alert("출근 시간이 업데이트되었습니다.");
            onClose();
        } catch (error) {
            alert(
                error.response?.data?.data
                    ? `${error.response.data.data} : ${error.response.data.message}`
                    : error.message
            );
        }
    };

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <h3>출근 시간 업데이트</h3>
                    <CloseImageButton handleClose={onClose} />
                </div>
                <div className="custom-modal-body">
                    <div className="caution-description">
                        현재 시간에 맞추어 출근 신청이 됩니다.
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
