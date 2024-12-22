import React, { useState, useEffect } from 'react';
import './CreateVacationModal.css';
import '../../../../../components/ui/modal/Modal.css';
import { createVacationSchedule } from '../../services/PersonalScheduleService';
import SubmitImageButton from '../../../../../components/ui/image/SubmitImageButton';
import VacationWarningModal from './VacationWarningModal';
import { imagePrefix } from "../../../../../utils/Constant";
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";

const CreateVacationModal = ({ handleClose, initialStartDate }) => {
    const [vacationTitle, setVacationTitle] = useState('');
    const [vacationType, setVacationType] = useState('');
    const [vacationStartDate, setVacationStartDate] = useState('');
    const [vacationEndDate, setVacationEndDate] = useState('');
    const [vacationReason, setVacationReason] = useState('');
    const [urgent, setUrgent] = useState(false); // urgent 필드 추가
    const [showWarningModal, setShowWarningModal] = useState(false); // WarningModal 상태

    // 전달된 initialStartDate를 이용해 시작일 설정
    useEffect(() => {
        if (initialStartDate) {
            // UTC 시간을 로컬 시간으로 변환해서 YYYY-MM-DD 형식으로 처리
            const localDate = new Date(initialStartDate.getTime() - initialStartDate.getTimezoneOffset() * 60000);
            const formattedStartDate = localDate.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 변환
            setVacationStartDate(formattedStartDate); // 휴가 시작일로 설정
        }
    }, [initialStartDate]);

    const formatDateWithoutTimezone = (date) => {
        const formattedDate = new Date(date).toISOString();
        return formattedDate.slice(0, 19); // 타임존 제거 (YYYY-MM-DDTHH:mm:ss)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!vacationTitle || !vacationType || !vacationStartDate || !vacationEndDate) {
            alert("Title, VacationType, startDate, endDate are required fields!");
            return;
        }

        // 날짜 포맷을 서버에서 요구하는 형식으로 변환
        const formattedStartDate = formatDateWithoutTimezone(vacationStartDate);
        const formattedEndDate = formatDateWithoutTimezone(vacationEndDate);

        const vacationData = {
            title: vacationTitle,
            vacationType: vacationType,
            startDate: formattedStartDate, // 변환된 시작일
            endDate: formattedEndDate,     // 변환된 종료일
            urgentReason: vacationReason,
            urgent: urgent,
        };

        try {
            const response = await createVacationSchedule(vacationData);
            console.log("Vacation created successfully:", response);
            handleClose();
        } catch (error) {
            console.error("Error creating vacation:", error.data);
        }
    };

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <h3>휴가 신청</h3>
                    <CloseImageButton handleClose={handleClose}/>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="custom-modal-body">
                        <div className="custom-modal-body-content">
                            <label className="custom-modal-body-content-label">
                                휴가 제목:
                            </label>
                            <input
                                type="text"
                                value={vacationTitle}
                                onChange={(e) => setVacationTitle(e.target.value)}
                                required
                            />
                            <div>
                                <img src={`${imagePrefix}/shared/urgent.png`} alt="urgent icon"/>
                                <label className="custom-modal-body-content-label">긴급</label>
                                <input
                                    type="checkbox"
                                    checked={urgent}
                                    onChange={(e) => setUrgent(e.target.checked)}
                                />
                                <label className="custom-modal-body-content-label">
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
                            <label className="custom-modal-body-content-label">
                                시작일:
                            </label>
                            <input
                                type="date"
                                value={vacationStartDate}
                                onChange={(e) => setVacationStartDate(e.target.value)}
                                required
                            />
                            <label className="custom-modal-body-content-label">
                                종료일:
                            </label>
                            <input
                                type="date"
                                value={vacationEndDate}
                                onChange={(e) => setVacationEndDate(e.target.value)}
                                required
                            />
                            <label className="custom-modal-body-content-label">
                                사유('긴급' 체크 시, 사용):
                            </label>
                            <textarea
                                value={vacationReason}
                                onChange={(e) => setVacationReason(e.target.value)}
                                placeholder="Enter reason for vacation"
                                className="custom-modal-body-textarea"
                            />
                        </div>
                    </div>
                    <div className="create-vacation-modal-footer">
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

export default CreateVacationModal;
