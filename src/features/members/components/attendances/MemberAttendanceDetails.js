import React from "react";
import "../../../../components/ui/modal/Modal.css";
import CloseImageButton from "../../../../components/ui/image/CloseImageButton";
import {reverseAttendanceMapping} from "../../../../utils/Constant";
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
                {attendanceData ? (
                    <div className="custom-modal-body">
                        <table className="custom-modal-table">
                            <tbody className="custom-modal-table-tbody">
                            <tr>
                                <td className="custom-modal-table-column-1">
                                    <strong>근태 상태 : </strong>
                                </td>
                                <td className="custom-modal-table-column-2"
                                    style={{ textAlign : "right", paddingRight : "20%"}}>
                                    {reverseAttendanceMapping[attendanceData.attendanceStatus] ||
                                        attendanceData.attendanceStatus}
                                </td>
                            </tr>
                            <tr>
                                <td className="custom-modal-table-column-1">
                                    <strong>생성 일자 : </strong>
                                </td>
                                <td className="custom-modal-table-column-2-date">
                                    {attendanceData.createdAt}
                                </td>
                            </tr>
                            <tr>
                                <td className="custom-modal-table-column-1">
                                    <strong>출근 시간 : </strong>
                                </td>
                                <td className="custom-modal-table-column-2-date">
                                    {attendanceData.checkInTime || "-"}
                                </td>
                            </tr>
                            <tr>
                                <td className="custom-modal-table-column-1">
                                    <strong>퇴근 시간 : </strong>
                                </td>
                                <td className="custom-modal-table-column-2-date">
                                    {attendanceData.checkOutTime || "-"}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div className="custom-modal-divider"/>
                        <div className="custom-modal-body-description-title">
                            <strong> 설명 : </strong>
                        </div>
                        <div className="custom-modal-body-description">
                            {attendanceData.description || "-"}
                        </div>
                    </div>
                ) : (
                    <p>근태 기록을 불러오는 중 오류가 발생했습니다.</p>
                )}
            </div>
        </div>
    );
};

export default MemberAttendanceDetails;
