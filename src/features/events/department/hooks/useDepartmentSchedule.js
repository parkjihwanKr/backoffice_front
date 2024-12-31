// useDepartmentSchedule.js
import { useState, useEffect } from "react";
import { createEvent, deleteEvent, fetchSchedules, updateEvent } from "../services/DepartmentScheduleService";
import { alertError } from "../../../../utils/ErrorUtils";

export const useDepartmentSchedule = (department) => {
    const today = new Date();
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [schedules, setSchedules] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const loadSchedules = async () => {
        try {
            const response = await fetchSchedules(department, currentYear, currentMonth);
            setSchedules(response);
        } catch (error) {
            alertError(error);
        }
    };

    const handleUpdateEvent = async (formData, eventId) => {
        try {
            const updatedEvent = await updateEvent(department, eventId, formData);
            setSelectedEvent(updatedEvent);
            await loadSchedules();
        } catch (error) {
            alertError(error);
        }
    };

    const handleCreateEvent = async (formData) => {
        try {
            await createEvent(department, formData);
            await loadSchedules();
            closeCreateModal();
        } catch (error) {
            alertError(error);
        }
    };

    const handleDeleteEvent = async (eventId) => {
        try {
            await deleteEvent(department, eventId);
            await loadSchedules();
            closeEventDetailModal();
        } catch (error) {
            alertError(error);
        }
    };

    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentYear(currentYear - 1);
            setCurrentMonth(11);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentYear(currentYear + 1);
            setCurrentMonth(0);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const openCreateModal = () => setIsCreateModalOpen(true);
    const closeCreateModal = () => setIsCreateModalOpen(false);
    const closeEventDetailModal = () => setSelectedEvent(null);

    useEffect(() => {
        loadSchedules();
    }, [currentYear, currentMonth, department]);

    return {
        currentYear,
        currentMonth,
        schedules,
        isCreateModalOpen,
        selectedEvent,
        setSelectedEvent,
        loadSchedules,
        handleUpdateEvent,
        handleCreateEvent,
        handleDeleteEvent,
        handlePrevMonth,
        handleNextMonth,
        openCreateModal,
        closeCreateModal,
        closeEventDetailModal,
    };
};
