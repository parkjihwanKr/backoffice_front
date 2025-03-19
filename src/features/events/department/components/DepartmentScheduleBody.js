import React from 'react';
import EventDetailModal from './modal/EventDetailModal';
import { useDepartmentScheduleBody } from '../hooks/useDepartmentScheduleBody';

const DepartmentScheduleBody = ({ currentYear, currentMonth, schedules, onUpdateEvent, onDeleteEvent }) => {
    const {
        daysInMonth,
        calendarGrid,
        isModalOpen,
        selectedEvent,
        openModal,
        closeModal,
    } = useDepartmentScheduleBody(schedules, currentYear, currentMonth);

    console.log(schedules);

    const renderDayHeaders = () => {
        return [...Array(daysInMonth)].map((_, day) => {
            const currentDate = new Date(currentYear, currentMonth, day + 1);
            const dayOfWeek = currentDate.getDay();
            const headerClass = dayOfWeek === 6 ? 'saturday-header' : dayOfWeek === 0 ? 'sunday-header' : '';
            return (
                <th key={day} className={headerClass}>
                    {day + 1}
                </th>
            );
        });
    };

    const renderScheduleRows = () => {
        return calendarGrid.map((row, rowIndex) => (
            <tr key={rowIndex + 1}>
                {row.map((schedule, dayIndex) => {
                    if (!schedule) return <td key={dayIndex}></td>;
                    const startDay = new Date(schedule.startDate).getDate() - 1;
                    const endDay = new Date(schedule.endDate).getDate() - 1;
                    const colSpan = endDay - startDay + 1;
                    if (dayIndex === startDay) {
                        return (
                            <td key={dayIndex} colSpan={colSpan} onClick={() => openModal(schedule)}>
                                <div>
                                    <strong>{schedule.title}</strong>
                                </div>
                            </td>
                        );
                    }
                    return null;
                })}
            </tr>
        ));
    };

    return (
        <div className="schedule-body">
            <table className="calendar-table">
                <thead>
                <tr>{renderDayHeaders()}</tr>
                </thead>
                <tbody>{renderScheduleRows()}</tbody>
            </table>

            <EventDetailModal
                isOpen={isModalOpen}
                onClose={closeModal}
                event={selectedEvent}
                onUpdate={onUpdateEvent}
                onDelete={onDeleteEvent}
            />
        </div>
    );
};

export default DepartmentScheduleBody;
