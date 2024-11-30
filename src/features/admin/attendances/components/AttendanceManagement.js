import React, { useEffect, useState } from "react";
import AttendanceManagementHeader from "./header/AttendanceManagementHeader";
import AttendanceManagementBody from "./body/AttendanceManagementBody";
import PaginationFooter from "../../../../components/common/PaginationFooter";
import DateUtils from "../../../../utils/DateUtils";
import { fetchMemberAttendanceList } from "../services/AttendanceManagementService";
import { getMemberTotalCount } from "../../members/services/MemberManagementService"; // API 호출 로직

const AttendanceManagement = () => {
    const today = DateUtils.getToday();
    const [filters, setFilters] = useState({
        department: null,
        year: today.getFullYear(),
        month: today.getMonth() + 1,
    });
    const [attendanceList, setAttendanceList] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(false);

    // 이전 상태를 저장하는 변수 (에러 발생 시 복구용)
    const [backupState, setBackupState] = useState({
        filters,
        currentPage,
    });

    // 필터와 페이지 변경 시 데이터를 가져오는 useEffect
    useEffect(() => {
        const fetchFilteredAttendanceList = async () => {
            setLoading(true);
            try {
                const totalMemberCount = await getMemberTotalCount();
                const response = await fetchMemberAttendanceList(
                    filters.department,
                    filters.year,
                    filters.month,
                    currentPage,
                    totalMemberCount * 7
                );
                // 요청이 성공하면 백업 상태 업데이트
                setBackupState({
                    filters,
                    currentPage,
                });
                setAttendanceList(response.content);
                setTotalPages(response.totalPages);
            } catch (error) {
                alert(`에러 발생: ${error.message || error}`);
                // 에러 발생 시 백업 상태로 복원
                setFilters(backupState.filters);
                setCurrentPage(backupState.currentPage);
            } finally {
                setLoading(false);
            }
        };

        fetchFilteredAttendanceList();
    }, [filters, currentPage]);

    // 필터 변경 시 페이지 초기화
    const handleSetFilters = (newFilters) => {
        setFilters(newFilters);
        setCurrentPage(0); // 필터 변경 시 페이지를 0으로 초기화
    };

    return (
        <div className="attendance-management-container">
            <AttendanceManagementHeader
                filters={filters}
                onFilterChange={handleSetFilters}
            />
            <AttendanceManagementBody
                attendanceList={attendanceList}
                loading={loading}
            />
            <PaginationFooter
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default AttendanceManagement;
