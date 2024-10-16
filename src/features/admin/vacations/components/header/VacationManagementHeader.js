import React, { useState, useEffect } from 'react';
import './VacationManagementHeader.css';
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
import { imagePrefix } from "../../../../../utils/Constant";

const VacationManagementHeader = ({ currentYear, currentMonth, onApplyFilters }) => {
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        year: currentYear,
        month: currentMonth + 1, // month는 0-based이므로 1-based로 설정
        isAccepted: null, // 초기에 null 값 설정
        isUrgent: null, // 초기에 null 값 설정
        department: null, // 초기에 null 값 설정
    });

    // 부모로부터 받은 currentYear, currentMonth가 변경될 때 필터의 상태를 업데이트
    useEffect(() => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            year: currentYear,
            month: currentMonth + 1, // month는 0-based이므로 1-based로 설정
        }));
    }, [currentYear, currentMonth]);

    const departments = ['HR', 'FINANCE', 'AUDIT', 'SALES', 'IT', 'MARKETING'];
    const years = Array.from({ length: 3 }, (_, i) => currentYear - 1 + i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    // 필터 창을 열 때 초기화
    const handleOpenFilters = () => {
        setShowFilters(true); // 필터 창 열기
    };

    // 필터 적용 버튼을 눌렀을 때만 서버로 필터 값 전달
    const handleApplyFilters = () => {
        const appliedFilters = {
            ...filters,
            isAccepted: filters.isAccepted === null ? false : filters.isAccepted, // null일 경우 false로 설정
            isUrgent: filters.isUrgent === null ? false : filters.isUrgent, // null일 경우 false로 설정
            department: filters.department === 'all' ? null : filters.department, // 'all'일 경우 null로 설정
        };

        setShowFilters(false); // 필터 창 닫기
        onApplyFilters(appliedFilters); // 부모 컴포넌트에 필터 값 전달하여 서버로 요청
    };

    // 필터 값이 변경될 때 필터 상태를 업데이트만 하고, 바로 서버로 전송하지 않음
    const handleFilterChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    return (
        <div className="vacation-management-header">
            <h3>
                {filters.year}년 {filters.month}월 휴가 관리 시스템
                {/* 부서가 선택되었을 경우 부서명도 추가 출력 */}
                {filters.department && filters.department !== 'all' && ` - ${filters.department} 부서`}
            </h3>

            {/* 필터 버튼에 아이콘 추가 */}
            <img
                src={`${imagePrefix}/shared/filter.png`}
                onClick={handleOpenFilters}
                alt="filter-icon"
            />

            {showFilters && (
                <div className="filters-modal">
                    <div className="filters-modal-header">
                        <h4>필터 적용</h4>
                        <CloseImageButton handleClose={() => setShowFilters(false)} />
                    </div>
                    <hr />
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
                                id="isAccepted"
                                name="isAccepted"
                                checked={filters.isAccepted || false}
                                onChange={handleFilterChange}
                            />
                            <label htmlFor="isAccepted">승인 여부</label>
                        </div>

                        <div className="filter-item">
                            <input
                                type="checkbox"
                                id="isUrgent"
                                name="isUrgent"
                                checked={filters.isUrgent || false}
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
                            value={filters.department || 'all'}
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
