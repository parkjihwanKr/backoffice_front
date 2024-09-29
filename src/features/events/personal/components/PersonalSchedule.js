import React, { useState, useEffect } from 'react';
import './PersonalSchedule.css'; // 스타일 파일 import
import { useAuth } from "../../../auth/components/AuthContext";
import { getPersonalSchedule } from '../services/PersonalScheduleService'; // API 함수 import
import PersonalScheduleDetailsModal from './details/PersonalScheduleDetailsModal'; // 모달 컴포넌트 import

const PersonalSchedule = () => {
    const { id, name, department, position } = useAuth();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false); // 모달 상태
    const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜 상태

    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const onPrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const onNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const selectDate = async (day) => {
        const selected = new Date(currentYear, currentMonth, day);
        setSelectedDate(selected);
        setCurrentDate(selected);

        // 해당 날짜에 대한 개인 일정을 가져옴
        try {
            const schedule = await getPersonalSchedule(selected, id, currentYear, currentMonth);
            setEvents(schedule);
            setShowModal(true); // 모달 열기
        } catch (error) {
            console.error('Error fetching personal schedule:', error);
        }
    };

    const handleClose = () => {
        setShowModal(false); // 모달 닫기
    };

    const renderCalendarDays = () => {
        const daysInMonth = getDaysInMonth(currentMonth, currentYear);
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const days = [];

        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="empty-day"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            days.push(
                <div
                    key={day}
                    className={`calendar-day ${day === currentDate.getDate() ? 'selected' : ''}`}
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
            <h1>Personal Schedule for {name}</h1>

            <div className="calendar">
                <div className="calendar-header">
                    <button onClick={onPrevMonth}>&lt;&lt;</button>
                    <span>{`${currentYear}년 ${currentMonth + 1}월`}</span>
                    <button onClick={onNextMonth}>&gt;&gt;</button>
                </div>
                <div className="calendar-days">
                    {daysOfWeek.map((day, index) => (
                        <div key={index} className={`day-header ${day === 'Sun' ? 'sunday' : day === 'Sat' ? 'saturday' : ''}`}>{day}</div>
                    ))}
                    {renderCalendarDays()}
                </div>
            </div>

            {/* 모달 컴포넌트 호출 */}
            <PersonalScheduleDetailsModal
                show={showModal}
                handleClose={handleClose}
                selectedDate={selectedDate}
                events={events}
            />
        </div>
    );
};

export default PersonalSchedule;
