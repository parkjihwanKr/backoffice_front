import React from "react";
import './MemberManagementHeader.css';
import '../../../shared/components/filter.css';
import useFiltersDropdown from "../../../shared/hooks/useFiltersDropdown";
import FilterImageButton from "../../../../../components/ui/buttons/FilterImageButton"; // custom hook 임포트

const MemberManagementHeader = ({ onFilterChange }) => {
    const {
        position,
        setPosition,
        department,
        setDepartment,
        showFilters,
        toggleFilterDropdown,
        applyFilters
    } = useFiltersDropdown();

    return (
        <div className="member-management-header">
            <h2>직원 관리 시스템</h2>
            <FilterImageButton onClick={toggleFilterDropdown}/>

            {/* 필터 선택 UI - 필터 아이콘을 누르면 보여줌 */}
            {showFilters && (
                <div className="filters-dropdown">
                    <h4>필터 적용</h4>
                    <label>
                        직위:
                        <select value={position} onChange={(e) => setPosition(e.target.value)}>
                            <option value="전체">전체</option>
                            <option value="사장">사장</option>
                            <option value="부장">부장</option>
                            <option value="차장">차장</option>
                            <option value="과장">과장</option>
                            <option value="대리">대리</option>
                            <option value="주임">주임</option>
                            <option value="인턴">인턴</option>
                        </select>
                    </label>
                    <label>
                        부서:
                        <select value={department} onChange={(e) => setDepartment(e.target.value)}>
                            <option value="전체">전체</option>
                            <option value="인사부">인사부</option>
                            <option value="아이티부">아이티부</option>
                            <option value="세일즈부">세일즈부</option>
                            <option value="마케팅부">마케팅부</option>
                            <option value="회계부">회계부</option>
                            <option value="재정부">재정부</option>
                        </select>
                    </label>
                    <button onClick={() => applyFilters(onFilterChange)}>필터 적용</button>
                    <button onClick={() => onFilterChange({ position: null, department: null })}>
                        전체 보기
                    </button>
                </div>
            )}
        </div>
    );
};

export default MemberManagementHeader;
