import React, {useEffect, useState} from 'react';
import {deleteVacation, fetchFilteredVacations, updateVacationIsAccepted} from '../services/VacationManagementService';
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

    const today = new Date();
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());

    // 초기 휴가 필터 데이터 로드
    const loadInitialVacations = async () => {
        try {
            const response = await fetchFilteredVacations(
                currentYear, currentMonth + 1, null, null, null
            );
            setVacations(response);
        } catch (error) {
            console.error('초기 휴가 데이터를 가져오는 중 오류가 발생했습니다.', error);
        }
    };

    // 필터된 휴가 데이터 로드
    const loadFilteredVacations = async (filters) => {
        try {
            const { year, month, isAccepted, isUrgent, department } = filters;
            const response = await fetchFilteredVacations(
                year || currentYear,
                month || currentMonth + 1,
                isAccepted,
                isUrgent,
                department
            );
            setVacations(response);
        } catch (error) {
            console.error('필터된 휴가 데이터를 가져오는 중 오류가 발생했습니다.', error);
        }
    };

    useEffect(() => {
        loadInitialVacations();
    }, [currentYear, currentMonth]);

    useEffect(() => {
        if (filters.year || filters.month || filters.isAccepted !== null || filters.isUrgent !== null || filters.department !== null) {
            loadFilteredVacations(filters);
        }
    }, [filters]);

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

    // 필터 적용 함수
    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters);
    };

    const handleUpdateVacationIsAccepted = async (vacationId) => {
        try {
            await updateVacationIsAccepted(vacationId);
            loadFilteredVacations(filters);
        } catch (error) {
            console.error('휴가 승인/미승인 처리 중 오류 발생:', error);
        }
    };

    const handleDeleteVacation = async (vacationId) => {
        try {
            await deleteVacation(vacationId);
            loadFilteredVacations(filters);
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
