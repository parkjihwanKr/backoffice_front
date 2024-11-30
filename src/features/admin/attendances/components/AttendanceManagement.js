import React, { useState } from "react";
import AttendanceManagementHeader from "./header/AttendanceManagementHeader";
import AttendanceManagementBody from "./body/AttendanceManagementBody";
import PaginationFooter from "../../../../components/common/PaginationFooter";
import DateUtils from "../../../../utils/DateUtils";

const AttendanceManagement = () => {
    const [selectedDate, setSelectedDate] = useState(new Date()); // 선택된 날짜 상태
    const today = DateUtils.getToday();
    const [filters, setFilters]
        = useState({department: null, year: today.getFullYear(), month: today.getMonth()+1 }); // 필터 상태
    const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수 상태
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태

    const handleMonthChange = (newDate) => {
        setSelectedDate(newDate); // 선택된 날짜 업데이트
        setFilters((prevFilters) => ({
            ...prevFilters,
            ...prevFilters,
            year: newDate.getFullYear(), // 숫자로 전달
            month: newDate.getMonth() + 1, // 숫자로 전달
        }));
        setCurrentPage(0); // 달 변경 시 페이지 초기화
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters); // 필터 업데이트
        setCurrentPage(0); // 필터 변경 시 페이지 초기화
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage); // 페이지 변경
    };

    const handleTotalPagesUpdate = (pages) => {
        setTotalPages(pages); // 전체 페이지 수 업데이트
    };

    return (
        <div className="attendance-management-container">
            <AttendanceManagementHeader
                onMonthChange={handleMonthChange}
                onFilterChange={handleFilterChange}
                filters={filters}
                selectedDate={selectedDate}
            />
            <AttendanceManagementBody
                selectedDate={selectedDate}
                filters={filters}
                currentPage={currentPage}
                onTotalPagesUpdate={handleTotalPagesUpdate}
            />
            <PaginationFooter
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default AttendanceManagement;
