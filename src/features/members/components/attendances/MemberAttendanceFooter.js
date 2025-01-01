import React from "react";
import { imagePrefix } from "../../../../utils/Constant";
import UpdateCheckOutTimeModal from "./modal/UpdateCheckOutTimeModal";
import UpdateCheckInTimeModal from "./modal/UpdateCheckInTimeModal";
import useMemberAttendanceFooter from "./hooks/useMemberAttendanceFooter";

const MemberAttendanceFooter = ({ attendanceId, updateAttendanceInState }) => {
    const {
        isCheckInModalOpen,
        isCheckOutModalOpen,
        openCheckInModal,
        closeCheckInModal,
        openCheckOutModal,
        closeCheckOutModal,
    } = useMemberAttendanceFooter();

    return (
        <div className="member-attendance-footer">
            <div className="member-attendance-footer-img-container">
                <img
                    src={`${imagePrefix}/shared/check-in-time.png`}
                    className="check-in-time-img"
                    title="당일 출근 신청"
                    onClick={openCheckInModal}
                />
                <img
                    src={`${imagePrefix}/shared/check-out-time.png`}
                    className="check-out-time-img"
                    title="당일 퇴근 신청"
                    onClick={openCheckOutModal}
                />
            </div>

            {/* 출근 시간 모달 */}
            {isCheckInModalOpen && (
                <UpdateCheckInTimeModal
                    attendanceId={attendanceId}
                    onClose={closeCheckInModal}
                    updateAttendanceInState={updateAttendanceInState}
                />
            )}

            {/* 퇴근 시간 모달 */}
            {isCheckOutModalOpen && (
                <UpdateCheckOutTimeModal
                    attendanceId={attendanceId}
                    onClose={closeCheckOutModal}
                    updateAttendanceInState={updateAttendanceInState}
                />
            )}
        </div>
    );
};

export default MemberAttendanceFooter;
