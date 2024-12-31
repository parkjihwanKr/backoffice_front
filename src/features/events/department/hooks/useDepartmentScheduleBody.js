// useDepartmentScheduleBody.js
import { useState, useMemo } from 'react';

export const useDepartmentScheduleBody = (schedules, currentYear, currentMonth) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    // 특정 월의 마지막 날짜 계산
    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const daysInMonth = useMemo(() => getDaysInMonth(currentYear, currentMonth), [currentYear, currentMonth]);

    // 일정 데이터를 createdAt 기준으로 정렬 후 그리드 생성
    const calendarGrid = useMemo(() => {
        const sortedSchedules = schedules.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        const grid = Array(sortedSchedules.length).fill([]).map(() => Array(daysInMonth).fill(null));

        sortedSchedules.forEach((schedule, index) => {
            const startDay = new Date(schedule.startDate).getDate() - 1;
            const endDay = new Date(schedule.endDate).getDate() - 1;

            for (let day = startDay; day <= endDay; day++) {
                grid[index][day] = schedule;
            }
        });

        return grid;
    }, [schedules, daysInMonth]);

    // 모달 상태 관리
    const openModal = (event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
    };

    return {
        daysInMonth,
        calendarGrid,
        isModalOpen,
        selectedEvent,
        openModal,
        closeModal,
    };
};