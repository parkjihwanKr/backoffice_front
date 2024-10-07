import React, { useState, useEffect } from 'react';
import './PersonalScheduleDetailsModal.css';
import CreateVacationModal from './CreateVacationModal';
import { imagePrefix } from "../../../../../utils/Constant";
import { getPersonalDaySchedule } from "../../services/PersonalScheduleService"; // API import

const PersonalScheduleDetailsModal = ({ show, handleClose, selectedDate, memberId }) => {
    const [isVacationModalOpen, setVacationModalOpen] = useState(false);
    const [dayEvents, setDayEvents] = useState([]); // 특정 날짜의 이벤트 상태 추가

    const handleVacationModalOpen = () => {
        setVacationModalOpen(true);
    };

    const handleVacationModalClose = () => {
        setVacationModalOpen(false);
    };

    // 선택된 날짜의 이벤트 가져오기
    useEffect(() => {
        const fetchDaySchedule = async () => {
            if (selectedDate && memberId) {
                const year = selectedDate.getFullYear();
                const month = selectedDate.getMonth();
                const day = selectedDate.getDate();

                try {
                    const data = await getPersonalDaySchedule(memberId, year, month, day);
                    setDayEvents(data); // 받아온 이벤트를 상태로 설정
                    console.log("Fetched day events:", data);
                } catch (error) {
                    console.error("Error fetching day schedule:", error);
                }
            }
        };

        fetchDaySchedule();
    }, [selectedDate, memberId]);

    if (!show) return null;

    return (
        <div className="personal-schedule-details-modal-overlay">
            <div className="personal-schedule-details-modal-content">
                <div className="personal-schedule-details-modal-header">
                    <span className="personal-schedule-details-modal-title">
                        Schedule Details for {selectedDate ? selectedDate.toLocaleDateString() : 'N/A'}
                    </span>
                    <img
                        src={`${imagePrefix}/shared/close.png`}
                        onClick={handleClose}
                        className="personal-schedule-details-close-icon"
                    />
                </div>
                <div className="personal-schedule-details-modal-body">
                    {/* 날짜에 대한 이벤트 표시 */}
                    {dayEvents.length > 0 ? (
                        <ul>
                            {dayEvents.map((event) => (
                                <li key={event.eventId}>
                                    <strong>{event.title}</strong>
                                    <p>{event.description}</p>
                                    <p>Start: {new Date(event.startDate).toLocaleString()}</p>
                                    <p>End: {new Date(event.endDate).toLocaleString()}</p>
                                    <p>Type: {event.eventType}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No events on this day</p>
                    )}
                </div>
                <div className="personal-schedule-details-modal-footer">
                    <img
                        src={`${imagePrefix}/shared/create_vacation_schedule.png`}
                        onClick={handleVacationModalOpen}
                        className="personal-schedule-action-icon"
                    />
                    <img
                        src={`${imagePrefix}/shared/edit_vacation_schedule.png`}
                        onClick={handleVacationModalOpen}
                        className="personal-schedule-action-icon"
                    />
                    <img
                        src={`${imagePrefix}/shared/delete_schedule.png`}
                        onClick={handleVacationModalOpen}
                        className="personal-schedule-action-icon"
                    />
                </div>
            </div>

            {/* CreateVacationModal 표시 */}
            {isVacationModalOpen && (
                <CreateVacationModal handleClose={handleVacationModalClose} />
            )}
        </div>
    );
};

export default PersonalScheduleDetailsModal;
