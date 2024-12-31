// UpdateVacationPeriodModal.js
import React, {useEffect} from 'react';
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
import {useVacationPeriod} from '../../hooks/useVacationPeriod';
import ConfirmButton from "../../../../../components/ui/buttons/ConfirmButton";

const UpdateVacationPeriodModal = ({ onClose, currentYear, currentMonth }) => {
    const {
        startDate,
        endDate,
        error,
        success,
        setStartDate,
        setEndDate,
        handleUpdatePeriod,
    } = useVacationPeriod(currentYear, currentMonth);

    useEffect(() => {
        if (error) {
            alert(`오류: ${error}`);
        }
        if (success) {
            alert(`성공: ${success}`);
        }
    }, [error, success]);

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <h3>{currentYear}년 {currentMonth + 1}월 휴가 신청 기간</h3>
                    <CloseImageButton handleClose={onClose} />
                </div>
                <div className="custom-modal-body">
                    <div className="custom-modal-body-content">
                        <label className="custom-modal-body-content-label">
                            시작 날짜:
                        </label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <label className="custom-modal-body-content-label">
                            종료 날짜:
                        </label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>
                <div className="custom-modal-footer">
                    <ConfirmButton onClick={handleUpdatePeriod} text={"저장"}/>
                </div>
            </div>
        </div>
    );
};

export default UpdateVacationPeriodModal;
