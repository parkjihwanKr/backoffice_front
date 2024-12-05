import React, {useState} from "react";
import DateUtils from "../../../../../utils/DateUtils";
import "./AttendanceManagementHeader.css";
import FilterImageButton from "../../../../../components/ui/buttons/FilterImageButton";
import FilterDropDown from "../../../../../components/common/FilterDropDown";
import {imagePrefix} from "../../../../../utils/Constant";
import DeleteAttendanceModal from "./DeleteAttendanceModal";
import CreateAttendanceModal from "./CreateAttendanceModal";

const AttendanceManagementHeader = ({ filters, onFilterChange, onDeleteSuccess, onAttendanceCreated }) => {
    const [showFilter, setShowFilter] = useState(false);
    const [showAdminDropdown, setShowAdminDropdown] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [localFilters, setLocalFilters] = useState(filters);

    const handleDeleteSuccess = (deletedIds) => {
        if (!Array.isArray(deletedIds)) {
            console.error("onDeleteSuccess expected an array but received:", deletedIds);
            return;
        }
        onDeleteSuccess(deletedIds); // 부모 컴포넌트로 삭제된 ID 전달
    };

    const handleAttendanceCreated = (newAttendance) => {
        onAttendanceCreated(newAttendance); // 새로운 근태 기록 데이터를 부모로 전달
        setModalType(null); // 모달 닫기
    };

    const handlePreviousMonth = () => {
        const newDate = new Date(filters.year, filters.month - 1 - 1);
        onFilterChange({
            ...filters,
            year: newDate.getFullYear(),
            month: newDate.getMonth() + 1,
        });
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

    const handleNextMonth = () => {
        const newDate = new Date(filters.year, filters.month - 1 + 1);
        onFilterChange({
            ...filters,
            year: newDate.getFullYear(),
            month: newDate.getMonth() + 1,
        });
    };

    const handleAdminDropdownMenu = () => {
        setShowAdminDropdown((prev) => !prev);
    };

    const resetFilters = () => {
        const defaultFilters = {
            department: null,
            year: DateUtils.getToday().getFullYear(),
            month: DateUtils.getToday().getMonth() + 1,
        };
        setLocalFilters(defaultFilters);
        onFilterChange(defaultFilters);
        setShowFilter(false);
    };

    const handleValidatedFilterSubmit = () => {
        onFilterChange(localFilters);
        setShowFilter(false);
    };

    const getTitle = () => {
        const year = filters.year || DateUtils.getToday().getFullYear();
        const month = filters.month || DateUtils.getToday().getMonth() + 1;
        return `${year}년 ${month}월 근태 관리`;
    };

    const handleCloseModal = () => {
        setModalType(null);
    };

    return (
        <div className="attendance-management-header">
            <div className="attendance-management-header-title-container">
                <img
                    src={`${imagePrefix}/shared/settings.png`}
                    alt="settings-icon"
                    className="settings-icon"
                    onClick={handleAdminDropdownMenu}
                />
                {showAdminDropdown && (
                    <div className="admin-dropdown-menu">
                        <ul>
                            <li onClick={() => setModalType("create")}>근태 기록 수동 생성</li>
                            <li onClick={() => setModalType("delete")}>근태 기록 수동 삭제</li>
                        </ul>
                    </div>
                )}
                {modalType === "create" && (
                    <CreateAttendanceModal
                        onClose={handleCloseModal}
                        onSubmit={handleAttendanceCreated} // 생성 완료 시 호출
                    />
                )}
                {modalType === "delete" && (
                    <DeleteAttendanceModal
                        onClose={handleCloseModal}
                        onDeleteSuccess={handleDeleteSuccess}
                    />
                )}
                <button className="month-nav-button" onClick={handlePreviousMonth}>
                    &lt;&lt;
                </button>
                <h2 className="header-title">{getTitle()}</h2>
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
                    onSubmit={handleValidatedFilterSubmit}
                    onReset={resetFilters}
                    toggleDropdown={() => setShowFilter(!showFilter)}
                />
            )}
        </div>
    );
};

export default AttendanceManagementHeader;