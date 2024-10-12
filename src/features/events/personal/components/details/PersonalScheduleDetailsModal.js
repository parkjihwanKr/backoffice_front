import React, { useState, useEffect } from 'react';
import './PersonalScheduleDetailsModal.css';
import CreateVacationModal from './CreateVacationModal';
import { imagePrefix } from "../../../../../utils/Constant";
import { getPersonalDaySchedule } from "../../services/PersonalScheduleService";
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
import { adjustModalAlignment, addModalAlignmentListener } from '../../../../../utils/ModalUtils';

const PersonalScheduleDetailsModal = ({ show, handleClose, selectedDate, memberId }) => {
    const [isVacationModalOpen, setVacationModalOpen] = useState(false);
    const [editingVacation, setEditingVacation] = useState(null); // 수정 중인 휴가 상태 추가
    const [dayEvents, setDayEvents] = useState([]); // 특정 날짜의 이벤트 상태 추가
    const [hoveredEventId, setHoveredEventId] = useState(null); // 마우스 호버 상태 추가

    useEffect(() => {
        const fetchDaySchedule = async () => {
            if (selectedDate && memberId) {
                const year = selectedDate.getFullYear();
                const month = selectedDate.getMonth();
                const day = selectedDate.getDate();

                try {
                    const data = await getPersonalDaySchedule(memberId, year, month, day);
                    setDayEvents(data); // 받아온 이벤트를 상태로 설정
                } catch (error) {
                    console.error("Error fetching day schedule:", error);
                }
            }
        };

        fetchDaySchedule();
    }, [selectedDate, memberId]);

    // 모달 정렬 로직 추가
    useEffect(() => {
        if (show) {
            const modalOverlay = document.querySelector('.personal-schedule-details-modal-overlay');
            const modalContent = document.querySelector('.personal-schedule-details-modal-content');

            // 모달 정렬 조정
            adjustModalAlignment(modalOverlay, modalContent);

            // resize 이벤트 리스너 추가 및 클린업
            const cleanup = addModalAlignmentListener(modalOverlay, modalContent);

            return cleanup; // 언마운트 시 리스너 제거
        }
    }, [show]);

    const handleVacationModalOpen = () => {
        setVacationModalOpen(true);
    };

    const handleVacationModalClose = () => {
        setVacationModalOpen(false);
        setEditingVacation(null); // 수정 취소 시 초기화
    };

    const handleEditVacation = (vacation) => {
        setEditingVacation(vacation);
        setVacationModalOpen(true);
    };

    if (!show) return null;

    return (
        <div className="personal-schedule-details-modal-overlay">
            <div className="personal-schedule-details-modal-content">
                <div className="personal-schedule-details-modal-header">
                    <span className="personal-schedule-details-modal-title">
                        Schedule Details for {selectedDate ? selectedDate.toLocaleDateString() : 'N/A'}
                    </span>
                    <CloseImageButton handleClose={handleClose} />
                </div>
                <div className="personal-schedule-details-modal-body">
                    {dayEvents && dayEvents.length > 0 ? (
                        <div>
                            {dayEvents.map((currentEvent) => (
                                <div
                                    key={currentEvent.eventId || currentEvent.vacationId}
                                    className={`event-card ${hoveredEventId === currentEvent.vacationId ? 'hovered' : ''}`}
                                    onMouseEnter={() => setHoveredEventId(currentEvent.vacationId)}
                                    onMouseLeave={() => setHoveredEventId(null)}
                                    style={{ position: 'relative' }}
                                >
                                    <div className="event-card-title">
                                        {currentEvent.title || 'No Title'}
                                    </div>
                                    <div className="event-card-content">
                                        <strong>내용:</strong> {currentEvent.description || 'No description available'}
                                    </div>
                                    <div className="event-card-content">
                                        <strong>시작일:</strong> {new Date(currentEvent.startDate).toLocaleString()}
                                    </div>
                                    <div className="event-card-content">
                                        <strong>마감일:</strong> {new Date(currentEvent.endDate).toLocaleString()}
                                    </div>
                                    <div className="event-card-footer">
                                        <strong>일정:</strong>
                                        {currentEvent.eventType === 'VACATION'
                                            ? ' 개인 일정'
                                            : currentEvent.eventType === 'DEPARTMENT'
                                                ? ' 부서'
                                                : currentEvent.eventType === 'COMPANY'
                                                    ? ' 회사'
                                                    : ' 알 수 없음'}
                                    </div>

                                    {currentEvent.eventType === 'VACATION' && (
                                        <div className="vacation-actions">
                                            <img
                                                title="휴가 수정"
                                                src={`${imagePrefix}/shared/edit_vacation_schedule.png`}
                                                className="vacation-action-icon"
                                                onClick={() => handleEditVacation(currentEvent)}
                                            />
                                            <img
                                                title="휴가 삭제"
                                                src={`${imagePrefix}/shared/delete_schedule.png`}
                                                className="vacation-action-icon"
                                                onClick={() => console.log("Delete action here")}
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No events on this day</p>
                    )}
                </div>
                <div className="personal-schedule-details-modal-footer" style={{ marginTop: '10px' }}>
                    <img
                        title="휴가 추가"
                        src={`${imagePrefix}/shared/create_vacation_schedule.png`}
                        onClick={handleVacationModalOpen}
                        className="personal-schedule-action-icon"
                    />
                </div>
            </div>

            {isVacationModalOpen && (
                <CreateVacationModal
                    handleClose={handleVacationModalClose}
                    initialStartDate={selectedDate}
                />
            )}
        </div>
    );
};

export default PersonalScheduleDetailsModal;
