import React, { useState } from "react";
import "./MemberManagementHeader.css";
import "../../../shared/components/filter.css";
import FilterImageButton from "../../../../../components/ui/buttons/FilterImageButton";
import FilterDropDown from "../../../../../components/common/FilterDropDown";

const MemberManagementHeader = ({ onFilterChange }) => {
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        position: null,
        department: null,
    });

    const toggleFilterDropdown = () => {
        setShowFilters((prev) => !prev);
    };

    const handleFilterApply = () => {
        onFilterChange(filters); // 부모 컴포넌트에 필터 상태 전달
        setShowFilters(false); // 드롭다운 닫기
    };

    const handleFilterReset = () => {
        const resetFilters = { position: null, department: null };
        setFilters(resetFilters);
        onFilterChange(resetFilters); // 초기 상태로 리셋
    };

    const filterOptions = [
        {
            name: "position",
            label: "직위",
            type: "select",
            options: [
                { value: "CEO", label: "사장" },
                { value: "MANAGER", label: "부장" },
                { value: "DEPUTY_MANAGER", label: "차장" },
                { value: "ASSISTANT_MANAGER", label: "과장" },
                { value: "SENIOR_STAFF", label: "대리" },
                { value: "JUNIOR_STAFF", label: "주임" },
                { value: "STAFF", label: "사원" },
                { value: "INTERN", label: "인턴" },
            ],
        },
        {
            name: "department",
            label: "부서",
            type: "select",
            options: [
                { value: "HR", label: "인사부" },
                { value: "IT", label: "아이티부" },
                { value: "SALES", label: "세일즈부" },
                { value: "MARKETING", label: "마케팅부" },
                { value: "AUDIT", label: "회계부" },
                { value: "FINANCE", label: "재정부" },
            ],
        },
    ];

    return (
        <div className="member-management-header">
            <h2>직원 관리 시스템</h2>
            <FilterImageButton onClick={toggleFilterDropdown} />
            <FilterDropDown
                showFilters={showFilters}
                filters={filters}
                setFilters={setFilters}
                filterOptions={filterOptions}
                onSubmit={handleFilterApply}
                onReset={handleFilterReset}
                toggleDropdown={toggleFilterDropdown}
            />
        </div>
    );
};

export default MemberManagementHeader;
