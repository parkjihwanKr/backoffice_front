import React, { useEffect, useState } from 'react';
import { fetchFilteredVacations, updateVacationIsAccepted, deleteVacation } from '../services/VacationManagementService';
import VacationManagementHeader from './header/VacationManagementHeader';
import VacationManagementBody from './body/VacationManagementBody';
import VacationManagementFooter from './footer/VacationManagementFooter';
import './VacationManagement.css';

const VacationManagement = () => {
    const [vacations, setVacations] = useState([]);
    const [filters, setFilters] = useState({
        year: null,
        month: null,
        isAccepted: null,
        isUrgent: null,
        department: null
    });
    const [loading, setLoading] = useState(false);

    const today = new Date();
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());

    const loadVacations = async () => {
        setLoading(true);
        try {
            const response = await fetchFilteredVacations(currentYear, currentMonth + 1, filters);
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

    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentYear(currentYear - 1);
            setCurrentMonth(11);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentYear(currentYear + 1);
            setCurrentMonth(0);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters);
    };

    // 휴가 승인/미승인 상태 변경 후 다시 데이터를 로드
    const handleUpdateVacationIsAccepted = async (vacationId) => {
        try {
            await updateVacationIsAccepted(vacationId);
            loadVacations(); // 상태 변경 후 데이터 다시 로드
        } catch (error) {
            console.error('휴가 승인/미승인 처리 중 오류 발생:', error);
        }
    };

    // 휴가 삭제 후 다시 데이터를 로드
    const handleDeleteVacation = async (vacationId) => {
        try {
            await deleteVacation(vacationId);
            loadVacations(); // 삭제 후 데이터 다시 로드
        } catch (error) {
            console.error('휴가 삭제 중 오류 발생:', error);
        }
    };

    return (
        <div className="vacation-management">
            <VacationManagementHeader
                currentYear={currentYear}
                currentMonth={currentMonth}
                onApplyFilters={handleApplyFilters}
            />
            <VacationManagementBody
                currentYear={currentYear}
                currentMonth={currentMonth}
                vacations={vacations}
                loading={loading}
                onUpdateVacationIsAccepted={handleUpdateVacationIsAccepted}
                onDeleteVacation={handleDeleteVacation}
            />
            <VacationManagementFooter
                onPrevMonth={handlePrevMonth}
                onNextMonth={handleNextMonth}
            />
        </div>
    );
};

export default VacationManagement;
