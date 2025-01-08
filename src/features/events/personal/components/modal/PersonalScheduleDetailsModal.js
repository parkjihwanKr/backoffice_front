import React from 'react';
import './PersonalScheduleDetailsModal.css';
import '../../../../../components/ui/modal/Modal.css';
import CreateVacationModal from './CreateVacationModal';
import {imagePrefix} from "../../../../../utils/Constant";
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
import usePersonalScheduleDetailsModal from "../../hooks/usePersonalScheduleDetailsModal";

const PersonalScheduleDetailsModal = ({ show, handleClose, selectedDate, memberId }) => {
    const {isVacationModalOpen,
        dayEvents,
        hoveredEventId,
        setHoveredEventId,
        modalOverlayRef,
        modalContentRef,
        handleVacationModalOpen,
        handleVacationModalClose,}
        = usePersonalScheduleDetailsModal(show, selectedDate, memberId);

    if (!show) return null;

    return (
        <div className="custom-modal-overlay" ref={modalOverlayRef}>
            <div className="custom-modal-content" ref={modalContentRef}>
                <div className="custom-modal-header">
                    <h3>{selectedDate ? selectedDate.toLocaleDateString() : 'N/A'}</h3>
                    <CloseImageButton handleClose={handleClose} />
                </div>
                <div className="custom-modal-body">
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
                                        {currentEvent.title|| '제목 없음'}
                                        ({currentEvent.eventType === 'VACATION'
                                        ? '개인 일정'
                                        : currentEvent.eventType === 'DEPARTMENT'
                                            ? '부서'
                                            : currentEvent.eventType === 'COMPANY'
                                                ? '회사'
                                                : '알 수 없음'})
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

                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>해당 날짜의 일정이 없습니다.</p>
                    )}
                </div>
                <div className="custom-modal-footer">
                    <img
                        title="휴가 추가"
                        src={`${imagePrefix}/shared/create_vacation_schedule.png`}
                        onClick={handleVacationModalOpen}
                        className="personal-schedule-action-icon"
                        style = {{ width : "36px", height : "36px"}}
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
