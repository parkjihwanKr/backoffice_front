import { useState, useEffect } from 'react';
import { fetchFilteredVacations } from '../services/VacationManagementService';

export const useFetchVacations = (currentYear, currentMonth, filters) => {
    const [vacations, setVacations] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadVacations = async () => {
        setLoading(true);
        try {
            // filters 객체를 개별 필드로 분리하여 전달
            const { isAccepted, isUrgent, department } = filters;
            const response = await fetchFilteredVacations(currentYear, currentMonth + 1, isAccepted, isUrgent, department);
            setVacations(response);
        } catch (error) {
            console.error('휴가 데이터를 가져오는 중 오류가 발생했습니다.', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadVacations();
    }, [filters, currentYear, currentMonth]);

    return { vacations, loading, loadVacations };
};
