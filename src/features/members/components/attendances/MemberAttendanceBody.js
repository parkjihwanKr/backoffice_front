import React from "react";
import { reverseAttendanceMapping } from "../../../../utils/Constant";

const MemberAttendanceBody = ({
                                  currentYear,
                                  currentMonth, // currentMonth는 1부터 시작 (1월 = 1)
                                  attendances = [],
                              }) => {
    // 요일에 따라 스타일 지정 (토요일: 파란색, 일요일: 빨간색)
    const getDayClass = (day) => {
        const date = new Date(currentYear, currentMonth - 1, day); // currentMonth를 0-based로 변환
        const dayOfWeek = date.getDay(); // 0: 일요일, 6: 토요일

        if (dayOfWeek === 0) return "sunday"; // 일요일
        if (dayOfWeek === 6) return "saturday"; // 토요일
        return ""; // 평일
    };

    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate(); // 해당 월의 마지막 날짜
    const firstDayOfWeek = new Date(currentYear, currentMonth - 1, 1).getDay(); // 해당 월 1일의 요일 (0: 일요일, 6: 토요일)

    // 날짜별 응답 데이터를 매핑
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

    // 날짜 헤더 생성 함수 (요일)
    const renderDayHeaders = () => {
        const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
        return daysOfWeek.map((day, index) => (
            <th key={index} className={index === 0 ? "sunday" : index === 6 ? "saturday" : ""}>
                {day}
            </th>
        ));
    };

    // 주 단위로 달력을 렌더링하는 함수
    const renderCalendarRows = () => {
        const weeks = [];
        let currentDay = 1;

        // 첫 번째 주 처리 (빈 칸 + 날짜)
        const firstWeek = Array.from({ length: 7 }, (_, i) => {
            if (i < firstDayOfWeek) return null; // 빈 칸
            return currentDay++; // 1일부터 시작
        });
        weeks.push(firstWeek);

        // 나머지 주 처리
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
                    const dayClass = day ? getDayClass(day) : ""; // 요일에 따른 클래스
                    const dayAttendance = attendanceMap[day] || []; // 해당 날짜의 출근 상태

                    return (
                        <td key={dayIndex} className={dayClass}>
                            {day ? (
                                <>
                                    <div>{day}</div>
                                    {dayAttendance.length > 0 ? (
                                        <ul className="no-bullets">
                                            {dayAttendance.map((att, idx) => (
                                                <li key={idx}>
                                                    {reverseAttendanceMapping[att.attendanceStatus] || att.attendanceStatus}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <span>기록 없음</span>
                                    )}
                                </>
                            ) : (
                                <div>&nbsp;</div> // 빈 칸
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
        </div>
    );
};

export default MemberAttendanceBody;
