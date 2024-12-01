import React from "react";
import { useNavigate } from "react-router-dom";
import { imagePrefix } from "../../../../../utils/Constant";
import {useLoading} from "../../../../utils/LoadingUtils";

const AttendanceManagementBody = ({ attendanceList, loading }) => {
    const navigate = useNavigate();

    const getDateStyle = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDay();
        if (day === 0) {
            return { color: "red" }; // 일요일
        } else if (day === 6) {
            return { color: "blue" }; // 토요일
        } else {
            return {};
        }
    };

    const handleDetailsClick = (attendanceDate) => {
        navigate("/admins/daily-attendance-management", {
            state: {
                date: attendanceDate }
        });
    };

    const loadingJSX = useLoading(loading);
    if (loadingJSX) return loadingJSX;

    if (!attendanceList || attendanceList.length === 0){
        return <div>해당 데이터가 존재하지 않습니다.</div>;
    }

    return (
        <div className="attendance-management-body">
            <table className="custom-table">
                <thead>
                <tr>
                    <th>날짜</th>
                    <th>정시 출근</th>
                    <th>조퇴</th>
                    <th>휴가</th>
                    <th>외근</th>
                    <th>지각</th>
                    <th>결근</th>
                    <th>휴일</th>
                    <th>상세보기</th>
                </tr>
                </thead>
                <tbody>
                {attendanceList.map((attendance) => (
                    <tr key={attendance.createdAt}>
                        <td style={getDateStyle(attendance.createdAt)}>
                            {new Date(attendance.createdAt).toLocaleDateString()}
                        </td>
                        <td>{attendance.onTimeCount}</td>
                        <td>{attendance.halfDayCount}</td>
                        <td>{attendance.onVacationCount}</td>
                        <td>{attendance.outOfOfficeCount}</td>
                        <td>{attendance.lateCount}</td>
                        <td>{attendance.absentCount}</td>
                        <td>{attendance.holidayCount}</td>
                        <td>
                            <img
                                src={`${imagePrefix}/shared/find_schedule.png`}
                                alt="Details"
                                onClick={() => handleDetailsClick(attendance.createdAt)}
                                className="schedule-details-img"
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AttendanceManagementBody;
