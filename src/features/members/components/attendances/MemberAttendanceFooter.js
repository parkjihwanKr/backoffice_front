import React, { useState } from "react";
import { imagePrefix } from "../../../../utils/Constant";
import UpdateCheckOutTimeModal from "./UpdateCheckOutTimeModal";
import UpdateCheckInTimeModal from "./UpdateCheckInTimeModal";

const MemberAttendanceFooter = ({ attendanceId, updateAttendanceInState }) => {
    const [isCheckInModalOpen, setCheckInModalOpen] = useState(false);
    const [isCheckOutModalOpen, setCheckOutModalOpen] = useState(false);

    const openCheckInModal = () => setCheckInModalOpen(true);
    const closeCheckInModal = () => setCheckInModalOpen(false);

    const openCheckOutModal = () => setCheckOutModalOpen(true);
    const closeCheckOutModal = () => setCheckOutModalOpen(false);

    return (
        <div className="member-attendance-footer">
            <div className="member-attendance-footer-img-container">
                <img
                    src={`${imagePrefix}/shared/check-in-time.png`}
                    className="check-in-time-img"
                    title="당일 출근 신청"
                    onClick={openCheckInModal} // 클릭 시 출근 모달 열기
                />
                <img
                    src={`${imagePrefix}/shared/check-out-time.png`}
                    className="check-out-time-img"
                    title="당일 퇴근 신청"
                    onClick={openCheckOutModal} // 클릭 시 퇴근 모달 열기
                />
            </div>

            {/* 출근 시간 모달 */}
            {isCheckInModalOpen && (
                <UpdateCheckInTimeModal
                    attendanceId={attendanceId}
                    onClose={closeCheckInModal}
                    updateAttendanceInState={updateAttendanceInState} // 상태 업데이트 함수 전달
                />
            )}

            {/* 퇴근 시간 모달 */}
            {isCheckOutModalOpen && (
                <UpdateCheckOutTimeModal
                    attendanceId={attendanceId}
                    onClose={closeCheckOutModal}
                    updateAttendanceInState={updateAttendanceInState} // 상태 업데이트 함수 전달
                />
            )}
        </div>
    );
};

export default MemberAttendanceFooter;
