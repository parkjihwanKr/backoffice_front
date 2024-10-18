import { imagePrefix } from "../../../../../utils/Constant";
import React, { useState } from "react";
import './MemberManagementHeader.css'; // CSS 파일 추가

const MemberManagementHeader = ({ onFilterChange }) => {
    const [position, setPosition] = useState('MANAGER');
    const [department, setDepartment] = useState('HR');
    const [showFilters, setShowFilters] = useState(false); // 필터 창 표시 여부 관리

    // 필터 변경 시 부모 컴포넌트로 필터 전달
    const handleFilterChange = () => {
        onFilterChange({ position, department });
        setShowFilters(false); // 필터 적용 후 필터창 닫기
    };

    // 필터 아이콘 클릭 시 필터 창 열기/닫기
    const toggleFilterDropdown = () => {
        setShowFilters(!showFilters);
    };

    return (
        <div className="member-management-header">
            <h3>직원 관리 시스템</h3>
            <img
                src={`${imagePrefix}/shared/filter.png`}
                alt="직원 검색 필터"
                onClick={toggleFilterDropdown} // 필터 창 열기/닫기 토글
                className="filter-icon"
            />

            {/* 필터 선택 UI - 필터 아이콘을 누르면 보여줌 */}
            {showFilters && (
                <div className="filters-dropdown">
                    <h4>필터 적용</h4>
                    <label>
                        직위:
                        <select value={position} onChange={(e) => setPosition(e.target.value)}>
                            <option value="CEO">사장</option>
                            <option value="MANAGER">부장</option>
                            <option value="ASSIST_MANAGER">차장</option>
                            <option value="SENIOR_STAFF">대리</option>
                            <option value="JUNIOR_STAFF">주임</option>
                            <option value="INTERN">인턴</option>
                            {/* 다른 직위 옵션 추가 */}
                        </select>
                    </label>
                    <label>
                        부서:
                        <select value={department} onChange={(e) => setDepartment(e.target.value)}>
                            <option value="HR">HR</option>
                            <option value="IT">IT</option>
                            <option value="SALES">Sales</option>
                            <option value="MARKETING">Marketing</option>
                            <option value="AUDIT">Audit</option>
                            <option value="FINANCE">Finance</option>
                            {/* 다른 부서 옵션 추가 */}
                        </select>
                    </label>
                    <button onClick={handleFilterChange}>필터 적용</button>
                    <button onClick={handleFilterChange}>전체 보기</button>
                </div>
            )}
        </div>
    );
};

export default MemberManagementHeader;
