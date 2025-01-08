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
                // const totalMemberCount = await getMemberTotalCount();
                const response = await fetchMemberAttendanceList(
                    filters.department,
                    filters.year,
                    filters.month,
                    currentPage
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
            console.error("삭제 후, 근태 기록 리스트를 가져오는 데, 실패했습니다. : ", error);
        } finally {
            setLoading(false); // 로딩 종료
        }
    };

    const handleAttendanceCreated = (newAttendance) => {
        setAttendanceList((prevList) => {
            // 새로운 기록의 createdAt이 오늘인지 확인
            const isCreatedToday = DateUtils.isToday(new Date(newAttendance.createdAt));

            if (isCreatedToday) {
                const isDuplicate = prevList.some(
                    (attendance) => attendance.createdAt === newAttendance.createdAt
                );

                // 중복이 아니면 추가
                if (!isDuplicate) {
                    const updatedList = [newAttendance, ...prevList];
                    console.log("근태 기록 수정 :", updatedList); // 디버깅용 로그
                    return updatedList;
                }
            }
            return prevList;
        });
    };


    return (
        <div className="attendance-management-container">
            <AttendanceManagementHeader
                filters={filters}
                onFilterChange={handleSetFilters}
                onDeleteSuccess={handleDeleteSuccess}
                onAttendanceCreated={handleAttendanceCreated}
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
