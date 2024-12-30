// hooks/useVacationPeriod.js
import {useState} from 'react';
import {updateVacationPeriod} from '../services/VacationManagementService';

export const useVacationPeriod = (currentYear, currentMonth) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // 현재 월에 해당하는지 확인하는 함수
    const isDateWithinCurrentMonth = (startDate, endDate) => {
        const currentMonth = new Date().getMonth();
        const startMonth = new Date(startDate).getMonth();
        const endMonth = new Date(endDate).getMonth();
        return startMonth === currentMonth && endMonth === currentMonth;
    };

    const handleUpdatePeriod = async () => {
        setError('');
        setSuccess('');

        // 1차 유효성 검사: 같은 월에 해당하는지 확인
        if (!isDateWithinCurrentMonth(startDate, endDate)) {
            setError('휴가 신청 기간은 동일한 월 내에 있어야 합니다.');
            return;
        }

        try {
            const response = await updateVacationPeriod(startDate, endDate);
            setSuccess(response.message); // 성공 메시지를 설정
        } catch (error) {
            setError('휴가 신청 기간을 업데이트하는 중 오류가 발생했습니다.');
        }
    };

    return {
        startDate,
        endDate,
        error,
        success,
        setStartDate,
        setEndDate,
        handleUpdatePeriod,
    };
};
