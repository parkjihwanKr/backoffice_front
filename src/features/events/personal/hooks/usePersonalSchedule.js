import { useEffect, useState } from "react";
import { getPersonalDaySchedule, getPersonalMonthSchedule } from "../services/PersonalScheduleService";
import { alertError } from "../../../../utils/ErrorUtils";

const usePersonalSchedule = (memberId) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]); // Monthly schedule
    const [dayEvents, setDayEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isUpcomingModalOpen, setIsUpcomingModalOpen] = useState(false);

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
            setIsDetailsModalOpen(true); // Open details modal
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

    const handleToggleMenu = () => {
        setIsUpcomingModalOpen(true); // Open upcoming modal
    };

    const handleDetailsModalClose = () => {
        setIsDetailsModalOpen(false); // Close details modal
    };

    const handleUpcomingModalClose = () => {
        setIsUpcomingModalOpen(false); // Close upcoming modal
    };

    return {
        currentDate,
        setCurrentDate,
        events,
        dayEvents,
        selectedDate,
        isDetailsModalOpen,
        isUpcomingModalOpen,
        currentMonth,
        currentYear,
        fetchPersonalSchedule,
        selectDate,
        getDayColor,
        renderCalendarDays,
        handleToggleMenu,
        handleDetailsModalClose,
        handleUpcomingModalClose,
    };
};

export default usePersonalSchedule;
