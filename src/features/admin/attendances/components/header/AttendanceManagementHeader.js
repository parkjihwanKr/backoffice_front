import React, { useState } from "react";
import DateUtils from "../../../../../utils/DateUtils";
import "./AttendanceManagementHeader.css";
import FilterImageButton from "../../../../../components/ui/buttons/FilterImageButton";
import FilterDropDown from "../../../../../components/common/FilterDropDown";

const AttendanceManagementHeader = ({ onMonthChange, onFilterChange, filters, selectedDate }) => {
    const [showFilter, setShowFilter] = useState(false);

    const handlePreviousMonth = () => {
        const newDate = new Date(selectedDate);
        newDate.setMonth(newDate.getMonth() - 1);
        onMonthChange(newDate); // 콜백 호출
    };

    const handleNextMonth = () => {
        const newDate = new Date(selectedDate);
        console.log("test new Date : "+newDate);
        newDate.setMonth(newDate.getMonth() + 1);
        onMonthChange(newDate); // 콜백 호출
    };

    const handleFilterSubmit = () => {
        if (!filters.year || !filters.month) {
            alert("년도와 월을 입력해주세요.");
            return;
        }
        onFilterChange(filters); // 필터 상태 부모로 전달
        setShowFilter(false); // 드롭다운 닫기
    };

    const resetFilters = () => {
        const defaultFilters = {
            department: "",
            year: DateUtils.getToday().getFullYear(),
            month: DateUtils.getToday().getMonth() + 1,
        };
        onFilterChange(defaultFilters); // 기본 필터값 전달
        setShowFilter(false); // 드롭다운 닫기
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

    return (
        <div className="attendance-management-header">
            <div className="attendance-management-header-title-container">
                <button className="month-nav-button" onClick={handlePreviousMonth}>
                    &lt;&lt;
                </button>
                <h2 className="header-title">
                    {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월 근태 관리
                </h2>
                <button className="month-nav-button" onClick={handleNextMonth}>
                    &gt;&gt;
                </button>
                <FilterImageButton onClick={() => setShowFilter(!showFilter)} />
            </div>
            <FilterDropDown
                showFilters={showFilter}
                filters={filters}
                setFilters={(newFilters) => onFilterChange({ ...filters, ...newFilters })}
                filterOptions={filterOptions}
                onSubmit={handleFilterSubmit}
                onReset={resetFilters}
                toggleDropdown={() => setShowFilter(!showFilter)}
            />
        </div>
    );
};

export default AttendanceManagementHeader;
