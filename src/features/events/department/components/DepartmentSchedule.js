import React from 'react';
import { useParams } from 'react-router-dom';
import { useDepartmentSchedule } from '../hooks/useDepartmentSchedule';
import CreateDepartmentScheduleModal from './modal/CreateDepartmentScheduleModal';
import DepartmentScheduleHeader from './DepartmentScheduleHeader';
import DepartmentScheduleBody from './DepartmentScheduleBody';
import DepartmentScheduleFooter from './DepartmentScheduleFooter';
import EventDetailModal from './modal/EventDetailModal';
import './DepartmentSchedule.css';

const DepartmentSchedule = () => {
    const { department } = useParams();
    const {
        currentYear,
        currentMonth,
        schedules,
        isCreateModalOpen,
        selectedEvent,
        handleUpdateEvent,
        handleCreateEvent,
        handleDeleteEvent,
        handlePrevMonth,
        handleNextMonth,
        openCreateModal,
        closeCreateModal,
        closeEventDetailModal,
    } = useDepartmentSchedule(department);

    return (
        <div className="department-schedule-container">
            <DepartmentScheduleHeader
                currentYear={currentYear}
                currentMonth={currentMonth}
                onCreateModal={openCreateModal}
            />
            <DepartmentScheduleBody
                currentYear={currentYear}
                currentMonth={currentMonth}
                schedules={schedules}
                onUpdateEvent={handleUpdateEvent}
                onDeleteEvent={handleDeleteEvent}
            />
            <DepartmentScheduleFooter
                onPrevMonth={handlePrevMonth}
                onNextMonth={handleNextMonth}
            />

            <CreateDepartmentScheduleModal
                isOpen={isCreateModalOpen}
                onClose={closeCreateModal}
                onSubmit={handleCreateEvent}
            />

            <EventDetailModal
                isOpen={!!selectedEvent}
                onClose={closeEventDetailModal}
                event={selectedEvent}
                onUpdate={handleUpdateEvent}
                onDelete={handleDeleteEvent}
            />
        </div>
    );
};

export default DepartmentSchedule;
