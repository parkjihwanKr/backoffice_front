// UpdateVacationPeriodModal.js
import React from 'react';
import './UpdateVacationPeriodModal.css';
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
import { useVacationPeriod } from '../../hooks/useVacationPeriod'; // Import the custom hook

const UpdateVacationPeriodModal = ({ onClose, currentYear, currentMonth }) => {
    const {
        startDate,
        endDate,
        loading,
        error,
        success,
        setStartDate,
        setEndDate,
        handleUpdatePeriod,
    } = useVacationPeriod(currentYear, currentMonth); // Use the custom hook

    return (
        <div className="update-vacation-period-modal-overlay">
            <div className="update-vacation-period-modal">
                <div className="update-vacation-period-modal-header">
                    <h4>{currentYear}년 {currentMonth + 1}월 휴가 신청 기간 설정</h4>
                    <CloseImageButton handleClose={onClose} />
                </div>
                <div className="update-vacation-period-modal-body">
                    <label>
                        시작 날짜:
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </label>
                    <label>
                        종료 날짜:
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </label>
                </div>
                <div className="update-vacation-period-modal-body-message">
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                </div>
                <div className="update-vacation-period-modal-footer">
                    <button onClick={handleUpdatePeriod} disabled={loading}>
                        {loading ? '저장 중...' : '저장'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateVacationPeriodModal;
