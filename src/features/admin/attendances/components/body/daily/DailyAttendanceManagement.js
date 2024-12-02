import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./DailyAttendanceManagement.css";
import { fetchDailyMemberAttendance } from "../../../services/AttendanceManagementService";
import PaginationFooter from "../../../../../../components/common/PaginationFooter";
import { getAttendanceStatus, imagePrefix } from "../../../../../../utils/Constant";
import FilterImageButton from "../../../../../../components/ui/buttons/FilterImageButton";
import FilterDropDown from "../../../../../../components/common/FilterDropDown";
import useDailyAttendanceFilterListForHeader from "../../../hooks/useDailyAttendanceFilterListForHeader";

const DailyAttendanceManagement = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { date } = location.state || {};

    const currentYear = new Date().getFullYear();

    const [memberAttendances, setMemberAttendances] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [showAdminDropdown, setShowAdminDropdown] = useState(false);

    const [filters, setFilters] = useState({
        department: null,
        memberName: null,
        year: date ? new Date(date).getFullYear() : currentYear,
        month: date ? new Date(date).getMonth() + 1 : null,
        day: date ? new Date(date).getDate() : null,
    });

    const [backupState, setBackupState] = useState({
        memberAttendances: [],
        currentPage: 0,
        totalPages: 1,
    });

    const {
        memberList,
        showFilters,
        localFilters,
        setLocalFilters,
        handleFilterSubmit,
        resetFilters,
        toggleFilterDropdown,
    } = useDailyAttendanceFilterListForHeader(setFilters, () => fetchAttendanceData(0));

    const fetchAttendanceData = async (page) => {
        // 백업 상태 저장
        setBackupState({
            memberAttendances,
            currentPage,
            totalPages,
            filters,
        });

        try {
            const response = await fetchDailyMemberAttendance({
                ...filters,
                page,
                size: 20,
            });
            setMemberAttendances(response.content);
            setTotalPages(response.totalPages);
        } catch (error) {
            setFilters(backupState.filters);
            setMemberAttendances(backupState.memberAttendances);
            setCurrentPage(backupState.currentPage);
            setTotalPages(backupState.totalPages);
        }
    };

    useEffect(() => {
        fetchAttendanceData(currentPage);
    }, [currentPage, filters]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleMemberDetailsClick = (memberId) => {
        navigate(`/members/${memberId}`);
    };

    const getDaysInMonth = (year, month) => {
        return new Date(year, month, 0).getDate();
    };

    const handleFilterValidation = () => {
        const { year, month, day } = localFilters;

        if (!year || !month || !day) {
            alert("년도, 월, 일은 필수 입력값입니다.");
            return false;
        }

        return true;
    };

    const handleValidatedFilterSubmit = () => {
        if (handleFilterValidation()) {
            setFilters(localFilters);
            setCurrentPage(0);
        }
    };

    const handleAdminDropdownMenu = () => {
        setShowAdminDropdown((prev) => !prev);
    }

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
            name: "memberName",
            label: "멤버 이름",
            type: "select",
            options: memberList.map((member) => ({
                value: member.memberName,
                label: member.memberName,
            })),
        },
        {
            name: "year",
            label: "년도",
            type: "select",
            options: [
                { value: currentYear - 1, label: `${currentYear - 1}` },
                { value: currentYear, label: `${currentYear}` },
                { value: currentYear + 1, label: `${currentYear + 1}` },
            ],
        },
        {
            name: "month",
            label: "월",
            type: "select",
            options: Array.from({ length: 12 }, (_, i) => ({
                value: i + 1,
                label: `${i + 1}`,
            })),
        },
        {
            name: "day",
            label: "일",
            type: "select",
            options: filters.month
                ? Array.from(
                    { length: getDaysInMonth(filters.year, filters.month) },
                    (_, i) => ({
                        value: i + 1,
                        label: `${i + 1}`,
                    })
                )
                : [],
        },
    ];

    const getTitle = () => {
        const { year, month, day, department, memberName } = filters;
        let title = `${year || "YYYY"}년 ${month || "MM"}월`;

        if (day) title += ` ${day}일`;
        if (department) {
            const departmentLabel = filterOptions
                .find((filter) => filter.name === "department")
                ?.options.find((opt) => opt.value === department)?.label;
            title += ` (${departmentLabel || department})`;
        }
        if (memberName) title += ` - ${memberName}`;
        title += " 근태 기록";

        return title;
    };

    return (
        <div className="attendance-management-container">
            <div className="attendance-management-header">
                <img
                    src={`${imagePrefix}/shared/settings.png`}
                    alt="settings-icon"
                    className="settings-icon"
                    onClick={handleAdminDropdownMenu}
                />
                {showAdminDropdown && (
                    <div className="admin-dropdown-menu">
                        <ul>
                            <li>출근 시간 변경</li>
                            <li>퇴근 시간 변경</li>
                            <li>근태 기록 수동 생성</li>
                            <li>근태 기록 수동 삭제</li>
                        </ul>
                    </div>
                )}
                <div className="header-title-container">
                    <h2>{getTitle()}</h2>
                </div>
                <FilterImageButton onClick={toggleFilterDropdown} />
                <FilterDropDown
                    showFilters={showFilters}
                    filters={localFilters}
                    setFilters={setLocalFilters}
                    filterOptions={filterOptions}
                    onSubmit={handleValidatedFilterSubmit}
                    onReset={resetFilters}
                    toggleDropdown={toggleFilterDropdown}
                    showResetButton={false}
                />
            </div>
            <div className="attendance-management-body">
                {memberAttendances.length > 0 ? (
                    <table className="custom-table">
                        <thead>
                        <tr>
                            <th>근태 ID</th>
                            <th>멤버 이름</th>
                            <th>출근 시간</th>
                            <th>퇴근 시간</th>
                            <th>근태 상태</th>
                            <th>설명</th>
                            <th>멤버 조회</th>
                        </tr>
                        </thead>
                        <tbody>
                        {memberAttendances.map((attendance) => (
                            <tr key={attendance.attendanceId}>
                                <td>{attendance.attendanceId}</td>
                                <td>{attendance.memberName}</td>
                                <td>{attendance.checkInTime || "-"}</td>
                                <td>{attendance.checkOutTime || "-"}</td>
                                <td>{getAttendanceStatus(attendance.attendanceStatus)}</td>
                                <td>{attendance.description || "-"}</td>
                                <td>
                                    <img
                                        className="member-management-member-details"
                                        src={`${imagePrefix}/shared/find_member.png`}
                                        alt="상세보기"
                                        onClick={() => handleMemberDetailsClick(attendance.memberId)}
                                    />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>데이터가 없습니다.</p>
                )}
            </div>
            <PaginationFooter
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default DailyAttendanceManagement;
