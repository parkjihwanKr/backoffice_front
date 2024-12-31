import React, { useState } from "react";
import "../../../../../../components/ui/modal/Modal.css";
import CloseImageButton from "../../../../../../components/ui/image/CloseImageButton";
import { imagePrefix, getAttendanceStatus } from "../../../../../../utils/Constant";
import SubmitButton from "../../../../../../components/ui/buttons/SubmitButton";
import { updateAttendanceStatusForAdmin } from "../../../services/AttendanceManagementService";
import ConfirmButton from "../../../../../../components/ui/buttons/ConfirmButton";

const UpdateMemberAttendanceStatusModal = ({ attendance, onSubmit, onClose }) => {
    const [attendanceStatus, setAttendanceStatus] = useState(attendance.attendanceStatus);
    const [description, setDescription] = useState(attendance.description || "");

    const handleSubmit = async () => {
        try {
            console.log("Submitting data:",
                { memberId: attendance.memberId, attendanceId: attendance.attendanceId,
                    attendanceStatus, description });
            // API 요청
            const updatedAttendance = await updateAttendanceStatusForAdmin(
                attendance.memberId,
                attendance.attendanceId,
                attendanceStatus,
                description
            );

            updatedAttendance.attendanceStatus = attendanceStatus; // 업데이트된 상태 반영
            updatedAttendance.description = description; // 설명 추가 반영

            onSubmit(updatedAttendance); // 부모 컴포넌트로 결과 전달
        } catch (error) {
            alert(error.response.data.data + " : " + error.response.data.message);
        } finally {
            onClose(); // 모달 닫기
        }
    };

    const handleCautionModal = () => {
        alert("준비중...");
    }

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <h3>멤버 근태 상태 변경</h3>
                    <CloseImageButton handleClose={onClose} />
                </div>
                <div className="custom-modal-body">
                    <div className="custom-modal-body-row">
                        <div className="custom-modal-body-column">
                            <img src={`${imagePrefix}/shared/user_info.png`} alt="before-status" />
                            <div className="custom-modal-body-column-user-info">
                                {attendance.memberName} <br />
                                {getAttendanceStatus(attendance.attendanceStatus)}
                            </div>
                        </div>
                        <div className="custom-modal-body-arrow">
                            <img
                                src={`${imagePrefix}/shared/right_arrow.png`}
                                alt="arrow"
                                className="custom-arrow-container"
                            />
                        </div>
                        <div className="custom-modal-body-column">
                            <img src={`${imagePrefix}/shared/user_info.png`} alt="after-status" />
                            <div className="custom-modal-body-column-user-info">
                                {attendance.memberName} <br />
                                {getAttendanceStatus(attendanceStatus)}
                            </div>
                        </div>
                    </div>
                    <div className="custom-modal-divider"></div>
                    <div className="custom-modal-body-content">
                        <label className="custom-modal-body-content-label">근태 상태:</label>
                        <select
                            value={attendanceStatus}
                            onChange={(e) => setAttendanceStatus(e.target.value)}
                            className="custom-modal-body-select"
                        >
                            <option value="ON_TIME">정시 출근</option>
                            <option value="LATE">지각</option>
                            <option value="ABSENT">결근</option>
                            <option value="VACATION">휴가</option>
                            <option value="OUT_OF_OFFICE">외근</option>
                            <option value="HALF_DAY">조퇴</option>
                            <option value="HOLIDAY">휴일</option>
                        </select>
                        <label className="custom-modal-body-content-label">설명:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="custom-modal-body-textarea"
                            placeholder="변경 사항에 대한 설명을 입력하세요."
                        />
                    </div>
                </div>
                <div className="custom-modal-footer">
                    <ConfirmButton
                        onClick={handleCautionModal}
                        text={"주의 사항"}/>
                    <SubmitButton
                        onSubmit={handleSubmit}
                        text={"변경"}
                    />
                </div>
            </div>
        </div>
    );
};

export default UpdateMemberAttendanceStatusModal;
