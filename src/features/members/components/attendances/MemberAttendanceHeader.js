import { useAuth } from "../../../auth/context/AuthContext";
import { useState } from "react";
import FilterImageButton from "../../../../components/ui/buttons/FilterImageButton";
import FilterDropDown from "../../../../components/common/FilterDropDown";
import DateUtils from "../../../../utils/DateUtils";
import './MemberAttendance.css';

const MemberAttendanceHeader = ({ filters, onFilterChange, currentYear, currentMonth }) => {
    const { name } = useAuth();
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
        if(filters.year == null || filters.month == null){
            alert("년과 달은 필수적으로 입력하셔야합니다.");
        }
        onFilterChange(localFilters);
        setShowFilter(false);
    };

    return (
        <div className="member-attendance-header">
            <div className="member-attendance-header-title-container">
                <button className="month-nav-button" onClick={handlePreviousMonth}>
                    &lt;&lt;
                </button>
                <h2 className="member-attendance-header-title">
                    '{name}'님의 {filters.year}년 {filters.month}월의 근태 기록
                </h2>
                <button className="month-nav-button" onClick={handleNextMonth}>
                    &gt;&gt;
                </button>
                <FilterImageButton onClick={() => setShowFilter(!showFilter)} />
            </div>
            {showFilter && (
                <FilterDropDown
                    showFilters={showFilter}
                    filters={localFilters}
                    setFilters={setLocalFilters}
                    filterOptions={filterOptions}
                    setShowFilters={setShowFilter}
                    onSubmit={handleValidatedFilterSubmit}
                    onReset={resetFilters}
                />
            )}
        </div>
    );
};

export default MemberAttendanceHeader;
