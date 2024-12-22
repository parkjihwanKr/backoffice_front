import React, {useState, useEffect, useRef} from 'react';
import './PersonalScheduleDetailsModal.css';
import '../../../../../components/ui/modal/Modal.css';
import CreateVacationModal from './CreateVacationModal';
import { imagePrefix } from "../../../../../utils/Constant";
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
import { getPersonalDaySchedule } from "../../services/PersonalScheduleService";
import { adjustModalAlignment, addModalAlignmentListener } from '../../../../../utils/ModalUtils';

const PersonalScheduleDetailsModal = ({ show, handleClose, selectedDate, memberId }) => {
    const [isVacationModalOpen, setVacationModalOpen] = useState(false);
    const [editingVacation, setEditingVacation] = useState(null); // 수정 중인 휴가 상태 추가
    const [dayEvents, setDayEvents] = useState([]); // 특정 날짜의 이벤트 상태 추가
    const [hoveredEventId, setHoveredEventId] = useState(null); // 마우스 호버 상태 추가

    const modalOverlayRef = useRef(null);
    const modalContentRef = useRef(null);

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
            const modalOverlay = modalOverlayRef.current;
            const modalContent = modalContentRef.current;

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
                                        {currentEvent.title || '제목 없음'}
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
