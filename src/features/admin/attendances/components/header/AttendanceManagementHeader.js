import React, { useState } from "react";
import "./AttendanceManagementHeader.css";
import DateUtils from "../../../../../utils/DateUtils";
import { imagePrefix } from "../../../../../utils/Constant";
import FilterImageButton from "../../../../../components/ui/buttons/FilterImageButton";
import FilterDropDown from "../../../../../components/common/FilterDropDown";
import DeleteAttendanceModal from "./modal/DeleteAttendanceModal";
import CreateAttendanceModal from "./modal/CreateAttendanceModal";
import UpcomingAttendanceRecordModal from "./modal/UpcomingAttendanceRecordModal";
import {fetchUpcomingAttendance} from "../../services/AttendanceManagementService";

const AttendanceManagementHeader = ({ filters, onFilterChange, onDeleteSuccess, onAttendanceCreated }) => {
    const [showFilter, setShowFilter] = useState(false);
    const [showAdminDropdown, setShowAdminDropdown] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [localFilters, setLocalFilters] = useState(filters);
    const [upcomingAttendance, setUpcomingAttendance] = useState([]);

    // 근태 기록 생성
    const handleAttendanceCreated = (newAttendance) => {
        onAttendanceCreated(newAttendance);
        setModalType(null);
    };

    // 근태 기록 삭제
    const handleDeleteSuccess = (deletedIds) => {
        if (!Array.isArray(deletedIds)) {
            console.error("삭제 할 아이디 리스트가 없습니다. : ", deletedIds);
            return;
        }
        onDeleteSuccess(deletedIds);
    };

    const handleUpcomingAttendance = async () => {
        try {
            const response = await fetchUpcomingAttendance();
            setUpcomingAttendance(response);
            setModalType("upcoming-record"); // 데이터를 로드한 후 모달을 표시
        } catch (error) {
            alert(`${error.response?.data?.data} : ${error.response?.data?.message}`);
        }
    };

    const handlePreviousMonth = () => {
        const newDate = new Date(filters.year, filters.month - 1 - 1);
        onFilterChange({
            ...filters,
            year: newDate.getFullYear(),
            month: newDate.getMonth() + 1,
        });
    };

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
                            {/*클릭 시에 데이터를 조회하는 게 맞음.*/}
                            <li onClick={handleUpcomingAttendance}>예정된 근태 기록 조회</li>
                        </ul>
                    </div>
                )}
                {modalType === "create" && (
                    <CreateAttendanceModal
                        onClose={handleCloseModal}
                        onSubmit={handleAttendanceCreated}
                    />
                )}
                {modalType === "delete" && (
                    <DeleteAttendanceModal
                        onClose={handleCloseModal}
                        onDeleteSuccess={handleDeleteSuccess}
                    />
                )}
                {modalType === "upcoming-record" && (
                    <UpcomingAttendanceRecordModal
                        onClose={handleCloseModal}
                        upcomingAttendances={upcomingAttendance}
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
                    setShowFilters={setShowFilter}
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
