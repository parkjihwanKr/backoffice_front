import { useCallback } from "react";
import {imagePrefix} from "../../../../utils/Constant";

const useAttendanceManagementBody = (navigate, attendanceList) => {
    const getDateStyle = useCallback((dateString) => {
        const date = new Date(dateString);
        const day = date.getDay();
        if (day === 0) {
            return { color: "red" }; // 일요일
        } else if (day === 6) {
            return { color: "blue" }; // 토요일
        } else {
            return {};
        }
    }, []);

    const handleDetailsClick = useCallback((attendanceDate) => {
        navigate("/admins/daily-attendance-management", {
            state: {
                date: attendanceDate,
            },
        });
    }, [navigate]);

    const renderTable = useCallback(() => {
        return (
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
                    <th>
                        휴일</th>
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
        );
    }, [attendanceList, getDateStyle, handleDetailsClick]);

    return { getDateStyle, handleDetailsClick, renderTable };
};

export default useAttendanceManagementBody;
