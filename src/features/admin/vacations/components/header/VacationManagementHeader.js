import React, {useEffect, useState} from "react";
import "./VacationManagementHeader.css";
import { imagePrefix } from "../../../../../utils/Constant";
import UpdateVacationPeriodModal from "./UpdateVacationPeriodModal";
import FilterDropDown from "../../../../../components/common/FilterDropDown";

const VacationManagementHeader = ({ currentYear, currentMonth, onApplyFilters }) => {
    const [showMenu, setShowMenu] = useState(false); // 드롭다운 메뉴 표시 여부
    const [showFilters, setShowFilters] = useState(false); // 필터 적용 창 상태
    const [showUpdateVacationPeriodModal, setUpdateVacationPeriodModal] = useState(false); // 휴가 기간 설정 모달 상태
    const [filters, setFilters] = useState({
        year: currentYear,
        month: currentMonth + 1,
        isAccepted: null,
        isUrgent: null,
        department: null,
    });

    useEffect(() => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            year: currentYear,
            month: currentMonth + 1,
        }));
    }, [currentYear, currentMonth]);

    const filterOptions = [
        {
            type: "checkbox",
            name: "isAccepted",
            label: "승인 여부",
        },
        {
            type: "checkbox",
            name: "isUrgent",
            label: "긴급 여부",
        },
        {
            type: "select",
            name: "year",
            label: "연도",
            options: Array.from({ length: 3 }, (_, i) => ({
                value: currentYear - 1 + i,
                label: `${currentYear - 1 + i}년`,
            })),
        },
        {
            type: "select",
            name: "month",
            label: "월",
            options: Array.from({ length: 12 }, (_, i) => ({
                value: i + 1,
                label: `${i + 1}월`,
            })),
        },
        {
            type: "select",
            name: "department",
            label: "부서",
            options: [
                { value: "HR", label: "HR" },
                { value: "FINANCE", label: "FINANCE" },
                { value: "AUDIT", label: "AUDIT" },
                { value: "SALES", label: "SALES" },
                { value: "IT", label: "IT" },
                { value: "MARKETING", label: "MARKETING" },
            ],
        },
    ];

    const handleApplyFilters = () => {
        onApplyFilters(filters); // 부모 컴포넌트에 필터 값 전달
        setShowFilters(false); // 필터 창 닫기
    };

    const handleResetFilters = () => {
        setFilters({
            year: currentYear,
            month: currentMonth + 1,
            isAccepted: null,
            isUrgent: null,
            department: null,
        });
        onApplyFilters({
            year: currentYear,
            month: currentMonth + 1,
            isAccepted: null,
            isUrgent: null,
            department: null,
        }); // 필터 초기화 후 데이터 로드
    };

    const handleOpenMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleOpenUpdateVacationPeriodModal = () => {
        setUpdateVacationPeriodModal(true);
        setShowMenu(false);
    };

    return (
        <div className="vacation-management-header">
            <h2>
                {filters.year}년 {filters.month}월 휴가 관리 시스템
                {filters.department && filters.department !== "all" && ` - ${filters.department} 부서`}
            </h2>

            <img
                src={`${imagePrefix}/shared/settings.png`}
                onClick={handleOpenMenu}
                alt="settings-icon"
                className="settings-icon"
            />

            {showMenu && (
                <div className="vacation-management-dropdown-menu">
                    <button onClick={handleOpenUpdateVacationPeriodModal}>휴가 기간 설정</button>
                    <button onClick={() => setShowFilters(!showFilters)}>필터 적용</button>
                </div>
            )}

            {showFilters && (
                <FilterDropDown
                    showFilters={showFilters}
                    filters={filters}
                    setFilters={setFilters}
                    filterOptions={filterOptions}
                    setShowFilters={setShowFilters}
                    onSubmit={handleApplyFilters}
                    onReset={handleResetFilters}
                />
            )}

            {showUpdateVacationPeriodModal && (
                <UpdateVacationPeriodModal
                    onClose={() => setUpdateVacationPeriodModal(false)}
                    currentYear={currentYear}
                    currentMonth={currentMonth}
                />
            )}
        </div>
    );
};

export default VacationManagementHeader;
