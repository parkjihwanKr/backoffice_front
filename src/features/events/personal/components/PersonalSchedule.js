import React, { useState, useEffect } from 'react';
import './PersonalSchedule.css';
import { useAuth } from "../../../auth/context/AuthContext";
import { getPersonalMonthSchedule, getPersonalDaySchedule } from '../services/PersonalScheduleService';
import PersonalScheduleDetailsModal from './details/PersonalScheduleDetailsModal';
import PersonalScheduleFooter from "./PersonalScheduleFooter";

const PersonalSchedule = () => {
    const { id, name } = useAuth();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]); // 월별 일정을 저장
    const [dayEvents, setDayEvents] = useState([]); // 특정 날짜의 일정을 저장
    const [selectedDate, setSelectedDate] = useState(null); // 선택한 날짜
    const [showModal, setShowModal] = useState(false); // 모달 상태

    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; // 요일

    useEffect(() => {
        fetchPersonalSchedule();
    }, [currentMonth, currentYear]);

    const fetchPersonalSchedule = async () => {
        try {
            const schedule = await getPersonalMonthSchedule(id, currentYear, currentMonth);
            setEvents(schedule); // 월별 일정을 상태로 저장
        } catch (error) {
            console.error('Error fetching personal schedule:', error);
        }
    };

    const selectDate = async (day) => {
        const selected = new Date(currentYear, currentMonth, day);
        setSelectedDate(selected);
        try {
            const daySchedule = await getPersonalDaySchedule(id, currentYear, currentMonth, day);
            setDayEvents(daySchedule);
            setShowModal(true);
        } catch (error) {
            console.error('Error fetching personal day schedule:', error);
        }
    };

    const getDayColor = (day) => {
        const dayEvents = events.filter(event => {
            const eventStartDate = new Date(event.startDate);
            const eventEndDate = new Date(event.endDate);
            return eventStartDate.getDate() <= day && eventEndDate.getDate() >= day;
        });

        const dayOfWeek = new Date(currentYear, currentMonth, day).getDay();

        let additionalClass = "";
        if (dayOfWeek === 0) {
            additionalClass = "sunday"; // 일요일
        } else if (dayOfWeek === 6) {
            additionalClass = "saturday"; // 토요일
        }

        const hasEvent = dayEvents.length > 0 ? 'pastel-event' : '';

        return `${hasEvent} ${additionalClass}`; // 클래스 이름 반환
    };

    const handleClose = () => {
        setShowModal(false);
    };

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
                    <span>{`${currentYear}년 ${currentMonth + 1}월`}</span>
                    <button onClick={() => setCurrentDate(new Date(currentYear, currentMonth + 1))}>&gt;&gt;</button>
                </div>
                <div className="calendar-days">
                    {daysOfWeek.map((day, index) => (
                        <div key={index} className={`day-header ${day === 'Sun' ? 'sunday' : day === 'Sat' ? 'saturday' : ''}`}>{day}</div>
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
