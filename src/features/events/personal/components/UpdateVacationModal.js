import React, { useState, useEffect } from 'react';
import './UpdateVacationModal.css';
import { updateVacationSchedule } from '../services/PersonalScheduleService'; // 수정 API
import CloseImageButton from "../../../../components/ui/image/CloseImageButton";
import {imagePrefix} from "../../../../utils/Constant";
import SubmitImageButton from "../../../../components/ui/image/SubmitImageButton";
import VacationWarningModal from "./details/VacationWarningModal";

const UpdateVacationModal = ({ handleClose, selectedVacation }) => {
    // selectedVacation이 없을 경우 오류 방지를 위해 기본 값을 설정
    const [vacationTitle, setVacationTitle] = useState(selectedVacation.title || '');
    const [vacationType, setVacationType] = useState('');
    const [vacationStartDate, setVacationStartDate] = useState('');
    const [vacationEndDate, setVacationEndDate] = useState('');
    const [urgent, setUrgent] = useState(false);
    const [urgentReason, setUrgentReason] = useState('');
    const [showWarningModal, setShowWarningModal] = useState(false); // WarningModal 상태

    // selectedVacation 값이 변경될 때마다 상태를 설정
    useEffect(() => {
        if (selectedVacation) {
            setVacationTitle(selectedVacation.title || '');
            setVacationType('');
            setVacationStartDate('');
            setVacationEndDate('');
            setUrgentReason(selectedVacation.urgentReason || '');
        }
    }, [selectedVacation]);

    // 휴가 수정 요청을 처리하는 함수
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formatDateWithoutTimezone = (date) => {
            const formattedDate = new Date(date).toISOString();
            return formattedDate.slice(0, 19); // 타임존 제거 (YYYY-MM-DDTHH:mm:ss)
        };

        // 날짜 포맷을 서버에서 요구하는 형식으로 변환
        const formattedStartDate = formatDateWithoutTimezone(vacationStartDate);
        const formattedEndDate = formatDateWithoutTimezone(vacationEndDate);

        const updatedVacationData = {
            title: vacationTitle,
            vacationType: vacationType,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            urgent : urgent,
            urgentReason: urgentReason
        };

        try {
            const response = await updateVacationSchedule(selectedVacation.vacationId, updatedVacationData);
            console.log("Vacation updated successfully:", response);
            handleClose(); // 수정 후 모달 닫기
        } catch (error) {
            console.error("Error updating vacation:", error);
        }
    };

    // selectedVacation이 없으면 모달 렌더링을 막고 로딩 표시
    if (!selectedVacation) {
        return <div>Loading...</div>;
    }

    return (
        <div className="update-vacation-modal-overlay">
            <div className="update-vacation-modal-content">
                <div className="update-vacation-modal-header">
                    <h3>휴가 수정</h3>
                    <CloseImageButton handleClose={handleClose} className="modal-close-icon" />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="update-vacation-modal-body">
                        <label>휴가 제목</label>
                        <input
                            type="text"
                            value={vacationTitle}
                            onChange={(e) => setVacationTitle(e.target.value)}
                            required
                        />

                        <div className="row-label">
                            <div className="row-label-urgent">
                                <img src={`${imagePrefix}/shared/urgent.png`} alt="urgent icon"/>
                                <label className="row-label-text">긴급</label>
                                <input
                                    type="checkbox"
                                    checked={urgent}
                                    onChange={(e) => setUrgent(e.target.checked)}
                                />
                            </div>
                            <label>
                                <select
                                    value={vacationType}
                                    onChange={(e) => setVacationType(e.target.value)}
                                    required
                                >
                                    <option value="">휴가 종류를 선택해주세요!</option>
                                    <option value="연가">연가</option>
                                    <option value="병가">병가</option>
                                    <option value="긴급한 휴가">긴급한 휴가</option>
                                </select>
                            </label>
                        </div>
                        <div className="row-label">
                            <label>
                                시작일:
                                <input
                                    type="date"
                                    value={vacationStartDate}
                                    onChange={(e) => setVacationStartDate(e.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                종료일:
                                <input
                                    type="date"
                                    value={vacationEndDate}
                                    onChange={(e) => setVacationEndDate(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <label className="update-vacation-reason">
                            <span>사유('긴급' 체크 시, 사용):</span>
                            <textarea
                                value={urgentReason}
                                onChange={(e) => setUrgentReason(e.target.value)}
                                placeholder="Enter reason for vacation"
                            />
                        </label>
                    </div>
                    <div className="update-vacation-modal-footer">
                        <img
                            title="휴가 사용시 주의사항"
                            src={`${imagePrefix}/shared/caution_document.png`}
                            className="footer-icon"
                            onClick={() => setShowWarningModal(true)}
                            alt="Warning icon"
                        />
                        <SubmitImageButton onSubmit={handleSubmit}/>
                    </div>
                </form>
                <VacationWarningModal
                    show={showWarningModal}
                    handleClose={() => setShowWarningModal(false)}
                />
            </div>
        </div>
    );
};

export default UpdateVacationModal;
