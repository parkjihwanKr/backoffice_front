import React from 'react';
import './PersonalSchedule.css';
import { useAuth } from "../../../auth/context/AuthContext";
import PersonalScheduleDetailsModal from './modal/PersonalScheduleDetailsModal';
import PersonalScheduleFooter from "./PersonalScheduleFooter";
import usePersonalSchedule from "../hooks/usePersonalSchedule";

const PersonalSchedule = () => {
    const { id, name } = useAuth();
    const {
        currentDate,
        setCurrentDate,
        events,
        dayEvents,
        selectedDate,
        showModal,
        currentMonth,
        currentYear,
        selectDate,
        getDayColor,
        handleClose
    } = usePersonalSchedule(id);

    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

    const renderCalendarDays = () => {
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const today = new Date();
        const days = [];

        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="empty-day"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayColor = getDayColor(day);
            const isToday =
                today.getDate() === day &&
                today.getMonth() === currentMonth &&
                today.getFullYear() === currentYear;

            days.push(
                <div
                    key={day}
                    className={`calendar-day ${day === currentDate.getDate() ? 'selected' : ''} ${dayColor} ${isToday ? 'today' : ''}`}
                    onClick={() => selectDate(day)}
                >
                    {day}
                </div>
            );
        }

        return days;
    };

    return (
        <div className="personal-schedule-container">
            <h1>{name}님의 개인 일정표</h1>
            <div className="calendar">
                <div className="calendar-header">
                    <button onClick={() => setCurrentDate(new Date(currentYear, currentMonth - 1))}>&lt;&lt;</button>
                    <span className="calendar-header-year-month">
                        {`${currentYear}년 ${currentMonth + 1}월`}
                    </span>
                    <button onClick={() => setCurrentDate(new Date(currentYear, currentMonth + 1))}>&gt;&gt;</button>
                </div>
                <div className="calendar-days">
                    {daysOfWeek.map((day, index) => (
                        <div key={index} className={`day-header ${day === '일' ? 'sunday' : day === '토' ? 'saturday' : ''}`}>{day}</div>
                    ))}
                    {renderCalendarDays()}
                </div>
            </div>
            <PersonalScheduleFooter />
            <PersonalScheduleDetailsModal
                show={showModal}
                handleClose={handleClose}
                selectedDate={selectedDate}
                memberId={id}
            />
        </div>
    );
};

export default PersonalSchedule;
