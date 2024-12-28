import React, {useEffect, useState} from 'react';
import './CreateVacationModal.css';
import '../../../../../components/ui/modal/Modal.css';
import {createVacationSchedule} from '../../services/PersonalScheduleService';
import VacationWarningModal from './VacationWarningModal';
import {imagePrefix} from "../../../../../utils/Constant";
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
import ConfirmButton from "../../../../../components/ui/buttons/ConfirmButton";

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

    const handleUrgentToggle = () => {
        setUrgent((prevState) => !prevState); // 긴급 상태 토글
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
                    <img
                        src={
                            urgent
                                ? `${imagePrefix}/shared/is_urgent_true.png`
                                : `${imagePrefix}/shared/is_urgent_false.png`
                        }
                        alt="urgent icon"
                        onClick={handleUrgentToggle}
                        title={urgent ? "긴급 상태 활성화" : "긴급 상태 비활성화"}
                        style={{ position : "absolute", left : "5%", top : "2%"}}
                    />
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
                            <label className="custom-modal-body-content-label">
                                휴가 종류 :
                            </label>
                            <select
                                value={vacationType}
                                onChange={(e) => setVacationType(e.target.value)}
                                className="custom-modal-body-select"
                                required
                            >
                                <option value="">휴가 종류를 선택해주세요!</option>
                                <option value="연가">연가</option>
                                <option value="병가">병가</option>
                                <option value="긴급한 휴가">긴급한 휴가</option>
                            </select>

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
                                사유 :
                            </label>
                            <textarea
                                value={vacationReason}
                                onChange={(e) => setVacationReason(e.target.value)}
                                placeholder="왼쪽 상단의 이미지를 클릭하여 '긴급함' 이미지로 변경했다면 사유를 작성해주세요."
                                className="custom-modal-body-textarea"
                            />
                        </div>
                    </div>
                    <div className="create-vacation-modal-footer">
                        <ConfirmButton
                            onClick={() => setShowWarningModal(true)}
                            text={"주의 사항"}/>
                        <ConfirmButton
                            onClick={handleSubmit}
                            text = {"제출"}/>
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
