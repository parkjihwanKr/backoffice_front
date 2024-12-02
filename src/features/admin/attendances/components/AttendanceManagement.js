import React, { useEffect, useState } from "react";
import AttendanceManagementHeader from "./header/AttendanceManagementHeader";
import AttendanceManagementBody from "./body/AttendanceManagementBody";
import PaginationFooter from "../../../../components/common/PaginationFooter";
import DateUtils from "../../../../utils/DateUtils";
import { fetchMemberAttendanceList } from "../services/AttendanceManagementService";
import { getMemberTotalCount } from "../../members/services/MemberManagementService";

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
                setAttendanceList(response.content);
                setTotalPages(response.totalPages);
            } catch (error) {
                alert(`에러 발생: ${error.message || error}`);
            } finally {
                setLoading(false);
            }
        };

        fetchFilteredAttendanceList();
    }, [filters, currentPage]);

    const handleSetFilters = (newFilters) => {
        setFilters(newFilters);
        setCurrentPage(0); // 필터 변경 시 페이지를 0으로 초기화
    };

    const handleDeleteSuccess = async (deletedIds) => {
        console.log("Deleted IDs:", deletedIds);

        setLoading(true); // 로딩 시작
        try {
            const totalMemberCount = await getMemberTotalCount();
            const response = await fetchMemberAttendanceList(
                filters.department,
                filters.year,
                filters.month,
                currentPage,
                totalMemberCount * 7
            );

            setAttendanceList(response.content); // 최신 데이터로 업데이트
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error("Error fetching updated list after deletion:", error);
        } finally {
            setLoading(false); // 로딩 종료
        }
    };

    return (
        <div className="attendance-management-container">
            <AttendanceManagementHeader
                filters={filters}
                onFilterChange={handleSetFilters}
                onDeleteSuccess={handleDeleteSuccess}
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
