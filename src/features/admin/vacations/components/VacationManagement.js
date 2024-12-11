import React, { useState } from 'react';
import { useFetchVacations } from '../hooks/useFetchVacations';
import { useHandleUpdateVacationIsAccepted } from '../hooks/useHandleUpdateVacationIsAccepted';
import { useHandleDeleteVacation } from '../hooks/useHandleDeleteVacation';
import VacationManagementHeader from './header/VacationManagementHeader';
import VacationManagementBody from './body/VacationManagementBody';
import VacationManagementFooter from './footer/VacationManagementFooter';
import './VacationManagement.css';
import DateUtils from "../../../../utils/DateUtils";

const VacationManagement = () => {
    const today = DateUtils.getToday();
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [filters, setFilters] = useState({
        year: null,
        month: null,
        isAccepted: null,
        isUrgent: null,
        department: null
    });

    // Custom hooks 사용
    const { vacations, loading, loadVacations } = useFetchVacations(currentYear, currentMonth, filters);
    const { handleUpdateVacationIsAccepted } = useHandleUpdateVacationIsAccepted(loadVacations);
    const { handleDeleteVacation } = useHandleDeleteVacation(loadVacations);

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
