// hooks/useVacationManagementFilters.js
import { useState, useEffect } from 'react';

export const useVacationManagementFilters = (initialYear, initialMonth) => {
    const [filters, setFilters] = useState({
        year: initialYear,
        month: initialMonth + 1, // 0-based month
        isAccepted: null,
        isUrgent: null,
        department: null,
    });

    useEffect(() => {
        setFilters(prevFilters => ({
            ...prevFilters,
            year: initialYear,
            month: initialMonth + 1,
        }));
    }, [initialYear, initialMonth]);

    const handleFilterChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    return { filters, handleFilterChange, setFilters };
};
