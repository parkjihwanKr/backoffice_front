import React from "react";
import "../../../../components/ui/modal/Modal.css";
import CloseImageButton from "../../../../components/ui/image/CloseImageButton";
import { reverseAttendanceMapping } from "../../../../utils/Constant";
import useModalScroll from "../../../../hooks/useModalScroll";
import useMemberAttendanceDetails from "./hooks/useMemberAttendanceDetails";

const MemberAttendanceDetails = ({ attendanceData, selectedDate, onClose, isOpen }) => {
    useModalScroll(isOpen);

    const { relevantDate } = useMemberAttendanceDetails(attendanceData, selectedDate);
    const { year, month, day } = relevantDate;

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <h3>
                        {year}년 {month}월 {day}일의 근태 기록
                    </h3>
                    <CloseImageButton handleClose={onClose} />
                </div>
                <div className="custom-modal-body">
                    {attendanceData ? (
                        <ul className="no-bullets">
                            <div className="list-row">
                                <li className="list-row-left">
                                    근태 상태 : <br />{" "}
                                    {reverseAttendanceMapping[attendanceData.attendanceStatus] ||
                                        attendanceData.attendanceStatus}
                                </li>
                                <li className="list-row-right">
                                    생성 일자 : <br /> {attendanceData.createdAt}
                                </li>
                            </div>
                            <div className="list-row">
                                <li className="list-row-left">
                                    출근 시간: <br /> {attendanceData.checkInTime || "-"}
                                </li>
                                <li className="list-row-right">
                                    퇴근 시간: <br /> {attendanceData.checkOutTime || "-"}
                                </li>
                            </div>
                            <div className="list-column">
                                <li className="list-attendance-description-title">
                                    설명:
                                    <div className="list-attendance-description-content">
                                        {attendanceData.description || "-"}
                                    </div>
                                </li>
                            </div>
                        </ul>
                    ) : (
                        <p>근태 기록을 불러오는 중 오류가 발생했습니다.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MemberAttendanceDetails;
