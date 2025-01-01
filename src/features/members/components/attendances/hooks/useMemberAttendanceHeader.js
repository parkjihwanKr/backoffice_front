import { useState } from "react";
import DateUtils from "../../../../../utils/DateUtils";

const useMemberAttendanceHeader = (filters, onFilterChange, currentYear) => {
    const [showFilter, setShowFilter] = useState(false);
    const [localFilters, setLocalFilters] = useState(filters);

    const filterOptions = [
        {
            name: "year",
            label: "년도",
            type: "select",
            options: [
                { value: currentYear - 1, label: `${currentYear - 1}` },
                { value: currentYear, label: `${currentYear}` },
                { value: currentYear + 1, label: `${currentYear + 1}` },
            ],
        },
        {
            name: "month",
            label: "월",
            type: "select",
            options: Array.from({ length: 12 }, (_, i) => ({
                value: i + 1,
                label: `${i + 1}`,
            })),
        },
    ];

    const handlePreviousMonth = () => {
        const newMonth = filters.month === 1 ? 12 : filters.month - 1;
        const newYear = filters.month === 1 ? filters.year - 1 : filters.year;

        onFilterChange({
            ...filters,
            year: newYear,
            month: newMonth,
        });
    };

    const handleNextMonth = () => {
        const newMonth = filters.month === 12 ? 1 : filters.month + 1;
        const newYear = filters.month === 12 ? filters.year + 1 : filters.year;

        onFilterChange({
            ...filters,
            year: newYear,
            month: newMonth,
        });
    };

    const resetFilters = () => {
        const defaultFilters = {
            year: DateUtils.getToday().getFullYear(),
            month: DateUtils.getToday().getMonth() + 1,
            attendanceStatus: null,
        };
        setLocalFilters(defaultFilters);
        onFilterChange(defaultFilters);
        setShowFilter(false);
    };

    const handleValidatedFilterSubmit = () => {
        if (localFilters.year == null || localFilters.month == null) {
            alert("년과 달은 필수적으로 입력하셔야합니다.");
            return;
        }
        onFilterChange(localFilters);
        setShowFilter(false);
    };

    return {
        showFilter,
        setShowFilter,
        localFilters,
        setLocalFilters,
        filterOptions,
        handlePreviousMonth,
        handleNextMonth,
        resetFilters,
        handleValidatedFilterSubmit,
    };
};

export default useMemberAttendanceHeader;
