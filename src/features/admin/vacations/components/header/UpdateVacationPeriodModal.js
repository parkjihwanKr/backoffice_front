import React, { useState } from 'react';
import './UpdateVacationPeriodModal.css';
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
import { updateVacationPeriod } from '../../services/VacationManagementService';

const UpdateVacationPeriodModal = ({ onClose, currentYear, currentMonth }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // 현재 월에 해당하는지 확인하는 함수
    const isDateWithinCurrentMonth = (startDate, endDate) => {
        const currentMonth = new Date().getMonth(); // 0-기반 (1월은 0)
        const startMonth = new Date(startDate).getMonth();
        const endMonth = new Date(endDate).getMonth();
        return startMonth === currentMonth && endMonth === currentMonth;
    };

    const handleUpdatePeriod = async () => {
        setLoading(true);
        setError('');
        setSuccess('');

        // 1차 유효성 검사: 같은 월에 해당하는지 확인
        if (!isDateWithinCurrentMonth(startDate, endDate)) {
            setError('휴가 신청 기간은 동일한 월 내에 있어야 합니다.');
            setLoading(false);
            return;
        }

        try {
            const response = await updateVacationPeriod(startDate, endDate);
            setSuccess(response.message); // 성공 메시지를 설정
        } catch (error) {
            setError('휴가 신청 기간을 업데이트하는 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="update-vacation-period-modal-overlay">
            <div className="update-vacation-period-modal">
                <div className="update-vacation-period-modal-header">
                    <h4>{currentYear}년 {currentMonth+1}월 휴가 신청 기간 설정</h4>
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
