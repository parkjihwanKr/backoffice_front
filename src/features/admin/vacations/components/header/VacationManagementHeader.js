import React, { useState } from 'react';
import './VacationManagementHeader.css'; // CSS 스타일 정의
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
import { imagePrefix } from "../../../../../utils/Constant";
import UpdateVacationPeriodModal from './UpdateVacationPeriodModal'; // UpdateVacationPeriodModal 임포트
import ResetFilterModal from './ResetFiltersModal'; // ResetFilterModal 임포트
import { useVacationManagementFilters } from '../../hooks/useVacationManagementFilters'; // 훅 임포트

const VacationManagementHeader = ({ currentYear, currentMonth, onApplyFilters }) => {
    const [showMenu, setShowMenu] = useState(false); // 드롭다운 메뉴 표시 여부
    const [showFilters, setShowFilters] = useState(false); // 필터 적용 창 상태
    const [showUpdateVacationPeriodModal, setUpdateVacationPeriodModal] = useState(false); // 휴가 기간 설정 모달 상태
    const [showResetModal, setShowResetModal] = useState(false); // 전체 보기(필터 초기화) 모달 상태

    // 커스텀 훅 사용
    const { filters, handleFilterChange, setFilters } = useVacationManagementFilters(currentYear, currentMonth);

    const departments = ['HR', 'FINANCE', 'AUDIT', 'SALES', 'IT', 'MARKETING'];
    const years = Array.from({ length: 3 }, (_, i) => currentYear - 1 + i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    // settings 메뉴 열기/닫기
    const handleOpenMenu = () => {
        setShowMenu(!showMenu);
    };

    // 필터 창 열기
    const handleOpenFilters = () => {
        setShowFilters(true); // 필터 창 열기
        setShowMenu(false); // 드롭다운 메뉴 닫기
    };

    // 휴가 요청 기간 설정 모달 열기
    const handleOpenUpdateVacationPeriodModal = () => {
        setUpdateVacationPeriodModal(true); // 휴가 요청 기간 설정 모달 열기
        setShowMenu(false); // 드롭다운 메뉴 닫기
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

    // 전체 보기 모달 열기
    const handleOpenResetModal = () => {
        setShowResetModal(true); // 전체 보기 모달 열기
    };

    // 필터 초기화 처리
    const handleResetFilters = () => {
        setFilters({
            year: currentYear,
            month: currentMonth + 1,
            isAccepted: null,
            isUrgent: null,
            department: null,
        });
        setShowResetModal(false); // 모달 닫기
        onApplyFilters({ year: currentYear, month: currentMonth + 1, isAccepted: null, isUrgent: null, department: null }); // 필터 초기화 후 데이터 로드
    };

    return (
        <div className="vacation-management-header">
            <h2>
                {filters.year}년 {filters.month}월 휴가 관리 시스템
                {filters.department && filters.department !== 'all' && ` - ${filters.department} 부서`}
            </h2>

            {/* settings 아이콘 클릭 시 메뉴 표시 */}
            <img
                src={`${imagePrefix}/shared/settings.png`}
                onClick={handleOpenMenu}
                alt="settings-icon"
                className="settings-icon"
            />

            {/* 드롭다운 메뉴 */}
            {showMenu && (
                <div className="vacation-management-dropdown-menu">
                    <button onClick={handleOpenUpdateVacationPeriodModal}>휴가 기간 설정</button>
                    <button onClick={handleOpenFilters}>필터 적용</button>
                </div>
            )}

            {/* 필터 적용 창 */}
            {showFilters && (
                <div className="filters-modal">
                    <div className="filters-modal-header">
                        <h4>필터 적용</h4>
                        <CloseImageButton handleClose={() => setShowFilters(false)} />
                    </div>
                    <hr />
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

                    <div className="button-row">
                        <button className="apply-filters-button" onClick={handleApplyFilters}>
                            필터 적용
                        </button>
                        {/* 전체 보기 버튼 추가 */}
                        <button className="view-all-button" onClick={handleOpenResetModal}>
                            전체 보기
                        </button>
                    </div>
                </div>
            )}

            {/* 휴가 기간 설정 모달 */}
            {showUpdateVacationPeriodModal && (
                <UpdateVacationPeriodModal
                    onClose={() => setUpdateVacationPeriodModal(false)} // 모달을 닫는 함수
                    currentYear={currentYear}
                    currentMonth={currentMonth} // 현재 월을 UpdateVacationPeriodModal로 전달
                />
            )}

            {/* 필터 초기화 모달 */}
            {showResetModal && (
                <ResetFilterModal
                    onClose={() => setShowResetModal(false)} // 모달을 닫는 함수
                    onConfirm={handleResetFilters} // 필터 초기화 처리
                />
            )}
        </div>
    );
};

export default VacationManagementHeader;
