
import { useEffect, useState } from 'react';
import { getPersonalDaySchedule, getPersonalMonthSchedule } from '../services/PersonalScheduleService';
import { alertError } from '../../../../utils/ErrorUtils';

const usePersonalSchedule = (memberId) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]); // Monthly schedule
    const [dayEvents, setDayEvents] = useState([]); // Schedule for a specific day
    const [selectedDate, setSelectedDate] = useState(null); // Selected date
    const [showModal, setShowModal] = useState(false); // Modal state

    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    useEffect(() => {
        fetchPersonalSchedule();
    }, [currentMonth, currentYear]);

    const fetchPersonalSchedule = async () => {
        try {
            const schedule = await getPersonalMonthSchedule(memberId, currentYear, currentMonth);
            setEvents(schedule);
        } catch (error) {
            alertError(error);
        }
    };

    const selectDate = async (day) => {
        const selected = new Date(currentYear, currentMonth, day);
        setSelectedDate(selected);
        try {
            const daySchedule = await getPersonalDaySchedule(memberId, currentYear, currentMonth, day);
            setDayEvents(daySchedule);
            setShowModal(true);
        } catch (error) {
            alertError(error);
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
            additionalClass = "sunday"; // Sunday
        } else if (dayOfWeek === 6) {
            additionalClass = "saturday"; // Saturday
        }

        const hasEvent = dayEvents.length > 0 ? 'pastel-event' : '';

        return `${hasEvent} ${additionalClass}`;
    };

    const handleClose = () => {
        setShowModal(false);
    };

    return {
        currentDate,
        setCurrentDate,
        events,
        dayEvents,
        selectedDate,
        showModal,
        currentMonth,
        currentYear,
        fetchPersonalSchedule,
        selectDate,
        getDayColor,
        handleClose
    };
};

export default usePersonalSchedule;