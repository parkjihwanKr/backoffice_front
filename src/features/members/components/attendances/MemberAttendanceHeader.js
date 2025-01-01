import React from "react";
import { useAuth } from "../../../auth/context/AuthContext";
import FilterImageButton from "../../../../components/ui/buttons/FilterImageButton";
import FilterDropDown from "../../../../components/common/FilterDropDown";
import useMemberAttendanceHeader from "./hooks/useMemberAttendanceHeader";
import "./MemberAttendance.css";

const MemberAttendanceHeader = ({ filters, onFilterChange, currentYear }) => {
    const { name } = useAuth();

    const {
        showFilter,
        setShowFilter,
        localFilters,
        setLocalFilters,
        filterOptions,
        handlePreviousMonth,
        handleNextMonth,
        resetFilters,
        handleValidatedFilterSubmit,
    } = useMemberAttendanceHeader(filters, onFilterChange, currentYear);

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
