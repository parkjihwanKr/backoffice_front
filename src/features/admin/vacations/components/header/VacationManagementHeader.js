import React, { useState } from 'react';
import './VacationManagementHeader.css';
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
import {imagePrefix} from "../../../../../utils/Constant";

const VacationManagementHeader = ({ currentYear, currentMonth, onApplyFilters }) => {
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        year: currentYear,
        month: currentMonth + 1,
        isApproved: false,
        isUrgent: false,
        department: 'all',
    });

    const departments = ['HR', 'FINANCE', 'AUDIT', 'SALES', 'IT', 'MARKETING'];
    const years = Array.from({ length: 3 }, (_, i) => currentYear - 1 + i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    const handleFilterChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleApplyFilters = () => {
        onApplyFilters(filters); // 부모 컴포넌트에서 필터를 적용하는 함수 호출
        setShowFilters(false); // 필터 창 닫기
    };

    return (
        <div className="vacation-management-header">
            <h3>{filters.year}년 {filters.month}월 휴가 관리 시스템</h3>

            {/* 필터 버튼에 아이콘 추가 */}
            <img
                src = {`${imagePrefix}/shared/filter.png`}
                onClick={() => setShowFilters(!showFilters)}
            />

            {showFilters && (
                <div className="filters-modal">
                    <div className="filters-modal-header">
                        <h4>필터 적용</h4>
                        <CloseImageButton handleClose={() => setShowFilters(false)} />
                    </div>
                    <hr/>
                    {/* 연도 및 월 선택 */}
                    <div className="filter-row">
                        <div className="filter-item">
                            <label htmlFor="year">연도</label>
                            <select
                                id="year"
                                name="year"
                                value={filters.year}
                                onChange={handleFilterChange}
                            >
                                {years.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-item">
                            <label htmlFor="month">월</label>
                            <select
                                id="month"
                                name="month"
                                value={filters.month}
                                onChange={handleFilterChange}
                            >
                                {months.map((month) => (
                                    <option key={month} value={month}>
                                        {month}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* 긴급 여부와 승인 여부를 한 줄에 배치 */}
                    <div className="filter-row">
                        <div className="filter-item">
                            <input
                                type="checkbox"
                                id="isApproved"
                                name="isApproved"
                                checked={filters.isApproved}
                                onChange={handleFilterChange}
                            />
                            <label htmlFor="isApproved">승인 여부</label>
                        </div>

                        <div className="filter-item">
                            <input
                                type="checkbox"
                                id="isUrgent"
                                name="isUrgent"
                                checked={filters.isUrgent}
                                onChange={handleFilterChange}
                            />
                            <label htmlFor="isUrgent">긴급 여부</label>
                        </div>
                    </div>

                    {/* 부서 선택 */}
                    <div className="filter-item">
                        <label htmlFor="department">부서</label>
                        <select
                            id="department"
                            name="department"
                            value={filters.department}
                            onChange={handleFilterChange}
                        >
                            <option value="all">전체 부서</option>
                            {departments.map((dept) => (
                                <option key={dept} value={dept}>
                                    {dept}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button className="apply-filters-button" onClick={handleApplyFilters}>
                        필터 적용
                    </button>
                </div>
            )}
        </div>
    );
};

export default VacationManagementHeader;
