import React, {useEffect, useState} from 'react';
import '../../../../../components/ui/modal/Modal.css';
import {updateVacationSchedule} from '../../services/PersonalScheduleService';
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
import {imagePrefix} from "../../../../../utils/Constant";
import VacationWarningModal from "./VacationWarningModal";
import ConfirmButton from "../../../../../components/ui/buttons/ConfirmButton";

const UpdateVacationModal = ({ handleClose, selectedVacation }) => {
    const [vacationTitle, setVacationTitle] = useState(selectedVacation.title || '');
    const [vacationType, setVacationType] = useState('');
    const [vacationStartDate, setVacationStartDate] = useState('');
    const [vacationEndDate, setVacationEndDate] = useState('');
    const [urgent, setUrgent] = useState(selectedVacation.urgent);
    const [urgentReason, setUrgentReason] = useState('');
    const [showWarningModal, setShowWarningModal] = useState(false);

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

    const handleUrgentToggle = () => {
        setUrgent((prevState) => !prevState); // 긴급 상태 토글
    };

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
                        style={{position: "absolute", left: "5%", top: "2%", width: "36px", height: "36px"}}
                    />
                    <h3>휴가 수정</h3>
                    <CloseImageButton handleClose={handleClose}/>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="custom-modal-body">
                        <label className="custom-modal-body-content-label">휴가 제목</label>
                        <input
                            type="text"
                            value={vacationTitle}
                            onChange={(e) => setVacationTitle(e.target.value)}
                            required
                        />
                        <label className="custom-modal-body-content-label">
                            휴가 종류
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
                            value={urgentReason}
                            onChange={(e) => setUrgentReason(e.target.value)}
                            placeholder="연가를 제외한 종류를 선택했다면 왼쪽 상단의 이미지를 클릭하여 '긴급함' 이미지로 변경하고  사유를 작성해주세요."
                            className="custom-modal-body-textarea"
                        />
                    </div>
                    <div className="custom-modal-footer">
                        <ConfirmButton
                            onClick={() => setShowWarningModal(true)}
                            text={"주의 사항"}/>
                        <ConfirmButton onClick={handleSubmit} text={"제출"}/>
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
