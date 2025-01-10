import React from "react";
import "../../../../../../components/ui/modal/Modal.css";
import CloseImageButton from "../../../../../../components/ui/image/CloseImageButton";
import { imagePrefix, getAttendanceStatus } from "../../../../../../utils/Constant";
import SubmitButton from "../../../../../../components/ui/buttons/SubmitButton";
import ConfirmButton from "../../../../../../components/ui/buttons/ConfirmButton";
import useUpdateMemberAttendanceStatus from "../../../hooks/useUpdateMemberAttendanceStatus";

const UpdateMemberAttendanceStatusModal = ({ attendance, onSubmit, onClose }) => {
    const {
        attendanceStatus,
        description,
        handleAttendanceStatusChange,
        handleDescriptionChange,
        handleSubmit,
        handleCautionModal,
    } = useUpdateMemberAttendanceStatus(attendance, onSubmit, onClose);

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
                            onChange={(e) => handleAttendanceStatusChange(e.target.value)}
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
                            onChange={(e) => handleDescriptionChange(e.target.value)}
                            className="custom-modal-body-textarea"
                            placeholder="변경 사항에 대한 설명을 입력하세요."
                        />
                    </div>
                </div>
                <div className="custom-modal-footer">
                    <ConfirmButton
                        onClick={handleCautionModal}
                        text={"주의 사항"}
                    />
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
