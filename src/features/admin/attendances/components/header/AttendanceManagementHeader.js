import React, { useState } from "react";
import DateUtils from "../../../../../utils/DateUtils";
import "./AttendanceManagementHeader.css";
import FilterImageButton from "../../../../../components/ui/buttons/FilterImageButton";
import FilterDropDown from "../../../../../components/common/FilterDropDown";

const AttendanceManagementHeader = ({ filters, onFilterChange }) => {
    const [showFilter, setShowFilter] = useState(false);

    // 이전달 이동
    const handlePreviousMonth = () => {
        const newDate = new Date(filters.year, filters.month - 1 - 1); // month는 0부터 시작
        onFilterChange({
            ...filters,
            year: newDate.getFullYear(),
            month: newDate.getMonth() + 1, // getMonth()는 0부터 시작하므로 +1
        });
    };

    // 다음달 이동
    const handleNextMonth = () => {
        const newDate = new Date(filters.year, filters.month - 1 + 1); // month는 0부터 시작
        onFilterChange({
            ...filters,
            year: newDate.getFullYear(),
            month: newDate.getMonth() + 1,
        });
    };

    const resetFilters = () => {
        const defaultFilters = {
            department: null,
            year: DateUtils.getToday().getFullYear(),
            month: DateUtils.getToday().getMonth() + 1,
        };
        onFilterChange(defaultFilters);
        setShowFilter(false);
    };

    const filterOptions = [
        {
            name: "department",
            label: "부서",
            type: "select",
            options: [
                { value: "HR", label: "인사부" },
                { value: "MARKETING", label: "마케팅부" },
                { value: "IT", label: "아이티부" },
                { value: "FINANCE", label: "재정부" },
                { value: "SALES", label: "세일즈부" },
                { value: "AUDIT", label: "회계부" },
            ],
        },
        {
            name: "year",
            label: "년도",
            type: "input",
            inputType: "number",
            placeholder: "YYYY",
        },
        {
            name: "month",
            label: "월",
            type: "input",
            inputType: "number",
            placeholder: "MM",
        },
    ];

    const getTitle = () => {
        const year = filters.year || DateUtils.getToday().getFullYear();
        const month = filters.month || DateUtils.getToday().getMonth() + 1;
        return `${year}년 ${month}월 근태 관리`;
    };

    return (
        <div className="attendance-management-header">
            <div className="attendance-management-header-title-container">
                <button className="month-nav-button" onClick={handlePreviousMonth}>
                    &lt;&lt;
                </button>
                <h2 className="header-title">{getTitle()}</h2>
                <button className="month-nav-button" onClick={handleNextMonth}>
                    &gt;&gt;
                </button>
                <FilterImageButton onClick={() => setShowFilter(!showFilter)} />
            </div>
            {showFilter && (
                <FilterDropDown
                    showFilters={showFilter}
                    filters={filters}
                    setFilters={(newFilters) => onFilterChange({ ...filters, ...newFilters })}
                    filterOptions={filterOptions}
                    onReset={() => {
                        resetFilters();
                        setShowFilter(false);
                    }}
                    toggleDropdown={() => setShowFilter(!showFilter)}
                />
            )}
        </div>
    );
};

export default AttendanceManagementHeader;
