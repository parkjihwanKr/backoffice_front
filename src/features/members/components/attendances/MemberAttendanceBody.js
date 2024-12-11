import React, { useState } from "react";
import MemberAttendanceDetails from "./MemberAttendanceDetails";
import { reverseAttendanceMapping } from "../../../../utils/Constant";
import { fetchMemberAttendance } from "../../services/MembersService";

const MemberAttendanceBody = ({
                                  currentYear,
                                  currentMonth, // currentMonth는 1부터 시작 (1월 = 1)
                                  attendances = [],
                              }) => {
    const [selectedAttendance, setSelectedAttendance] = useState(null); // 선택한 attendanceId
    const [modalData, setModalData] = useState(null); // 모달에 표시할 데이터
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜 정보 (년, 월, 일)

    const openModal = async (attendanceId, year, month, day) => {
        try {
            const attendanceData = await fetchMemberAttendance(attendanceId); // API 호출
            setModalData(attendanceData);
            setSelectedAttendance(attendanceId);
            setSelectedDate({ year, month, day });
            setModalOpen(true);
        } catch (error) {
            alert(error.response.data.data + " : " + error.response.data.message);
        }
    };

    const closeModal = () => {
        setModalOpen(false);
        setModalData(null);
        setSelectedAttendance(null);
        setSelectedDate(null);
    };

    const getDayClass = (day) => {
        const date = new Date(currentYear, currentMonth - 1, day); // currentMonth를 0-based로 변환
        const dayOfWeek = date.getDay(); // 0: 일요일, 6: 토요일
        if (dayOfWeek === 0) return "sunday"; // 일요일
        if (dayOfWeek === 6) return "saturday"; // 토요일
        return ""; // 평일
    };

    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate(); // 해당 월의 마지막 날짜
    const firstDayOfWeek = new Date(currentYear, currentMonth - 1, 1).getDay(); // 해당 월 1일의 요일

    const attendanceMap = attendances.reduce((map, attendance) => {
        const createdDate = attendance.createdAt
            ? new Date(attendance.createdAt).getDate()
            : null;
        if (createdDate) {
            if (!map[createdDate]) map[createdDate] = [];
            map[createdDate].push(attendance);
        }
        return map;
    }, {});

    const renderDayHeaders = () => {
        const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
        return daysOfWeek.map((day, index) => (
            <th key={index} className={index === 0 ? "sunday" : index === 6 ? "saturday" : ""}>
                {day}
            </th>
        ));
    };

    const renderCalendarRows = () => {
        const weeks = [];
        let currentDay = 1;

        const firstWeek = Array.from({ length: 7 }, (_, i) => {
            if (i < firstDayOfWeek) return null; // 빈 칸
            return currentDay++;
        });
        weeks.push(firstWeek);

        while (currentDay <= daysInMonth) {
            const week = Array.from({ length: 7 }, () => {
                if (currentDay > daysInMonth) return null; // 월 말일 이후 빈 칸
                return currentDay++;
            });
            weeks.push(week);
        }

        return weeks.map((week, weekIndex) => (
            <tr key={weekIndex}>
                {week.map((day, dayIndex) => {
                    const dayClass = day ? getDayClass(day) : "";
                    const dayAttendance = attendanceMap[day] || [];

                    return (
                        <td key={dayIndex} className={dayClass}>
                            {day ? (
                                <>
                                    <div>{day}</div>
                                    {dayAttendance.length > 0 ? (
                                        <ul className="no-bullets">
                                            {dayAttendance.map((att, idx) => (
                                                <li className="no-bullets-open-details"
                                                    key={idx}
                                                    onClick={() =>
                                                        openModal(att.attendanceId, currentYear, currentMonth, day)
                                                    }
                                                >
                                                    {reverseAttendanceMapping[att.attendanceStatus] || att.attendanceStatus}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <span>기록 없음</span>
                                    )}
                                </>
                            ) : (
                                <div>&nbsp;</div>
                            )}
                        </td>
                    );
                })}
            </tr>
        ));
    };

    return (
        <div className="member-attendance-body">
            <table className="member-attendance-body-table">
                <thead>
                <tr>{renderDayHeaders()}</tr>
                </thead>
                <tbody>{renderCalendarRows()}</tbody>
            </table>
            {isModalOpen && (
                <MemberAttendanceDetails
                    attendanceData={modalData}
                    selectedDate={selectedDate}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default MemberAttendanceBody;
