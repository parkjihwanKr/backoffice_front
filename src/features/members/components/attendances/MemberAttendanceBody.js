import React from "react";
import MemberAttendanceDetails from "./MemberAttendanceDetails";
import { reverseAttendanceMapping } from "../../../../utils/Constant";
import { daysOfWeek } from "../../../../utils/DateUtils";
import useMemberAttendanceBody from "./hooks/useMemberAttendanceBody";

const MemberAttendanceBody = ({
                                  currentYear,
                                  currentMonth,
                                  attendances = [],
                              }) => {
    const {
        selectedAttendance,
        modalData,
        isModalOpen,
        selectedDate,
        openModal,
        closeModal,
        getDayClass,
        attendanceMap,
    } = useMemberAttendanceBody(currentYear, currentMonth, attendances);

    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    const firstDayOfWeek = new Date(currentYear, currentMonth - 1, 1).getDay();

    const renderDayHeaders = () => {
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
            if (i < firstDayOfWeek) return null;
            return currentDay++;
        });
        weeks.push(firstWeek);

        while (currentDay <= daysInMonth) {
            const week = Array.from({ length: 7 }, () => {
                if (currentDay > daysInMonth) return null;
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
                                                <li
                                                    className="no-bullets-open-details"
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
