import React, { useState, useEffect } from 'react';
import './PersonalScheduleDetailsModal.css';
import CreateVacationModal from './CreateVacationModal';
import { imagePrefix } from "../../../../../utils/Constant";
import { getPersonalDaySchedule } from "../../services/PersonalScheduleService";
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton"; // API import

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
                    <CloseImageButton handleClose={handleClose}/>
                </div>
                <div className="personal-schedule-details-modal-body">
                    {dayEvents && dayEvents.length > 0 ? (
                        <div>
                            {dayEvents.map((event) => (
                                <div key={event.eventId || event.vacationId} className="event-card">
                                    <div className="event-card-title">
                                        {event.title || 'No Title'}
                                    </div>
                                    <div className="event-card-content">
                                        <strong>내용:</strong> {event.description || 'No description available'}
                                    </div>
                                    <div className="event-card-content">
                                        <strong>시작일:</strong> {new Date(event.startDate).toLocaleString()}
                                    </div>
                                    <div className="event-card-content">
                                        <strong>마감일:</strong> {new Date(event.endDate).toLocaleString()}
                                    </div>
                                    <div className="event-card-footer">
                                        <strong>일정:</strong>
                                        {event.eventType === 'VACATION'
                                            ? ' 개인 휴가'
                                            : event.eventType === 'DEPARTMENT'
                                                ? ' 부서'
                                                : event.eventType === 'COMPANY'
                                                    ? ' 회사'
                                                    : ' 알 수 없음'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No events on this day</p>
                    )}
                </div>
                <div className="personal-schedule-details-modal-footer" style={{marginTop: '10px'}}>
                    <img
                        title="휴가 추가"
                        src={`${imagePrefix}/shared/create_vacation_schedule.png`}
                        onClick={() => handleVacationModalOpen(selectedDate)}
                        className="personal-schedule-action-icon"
                    />
                    <img
                        title="휴가 수정"
                        src={`${imagePrefix}/shared/edit_vacation_schedule.png`}
                        onClick={handleVacationModalOpen}
                        className="personal-schedule-action-icon"
                    />
                    <img
                        title="휴가 삭제"
                        src={`${imagePrefix}/shared/delete_schedule.png`}
                        onClick={handleVacationModalOpen}
                        className="personal-schedule-action-icon"
                    />
                </div>
            </div>

            {/* CreateVacationModal 표시 */}
            {isVacationModalOpen && (
                <CreateVacationModal
                    handleClose={handleVacationModalClose}
                    initialStartDate={selectedDate} // 시작일로 선택된 날짜 전달
                />
            )}
        </div>
    );
};

export default PersonalScheduleDetailsModal;
