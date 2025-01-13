import { useState, useEffect } from "react";
import { fetchMemberAttendanceList } from "../services/AttendanceManagementService";
import { getMemberTotalCount } from "../../members/services/MemberManagementService";
import DateUtils from "../../../../utils/DateUtils";
import {alertError} from "../../../../utils/ErrorUtils";
import {useNavigate} from "react-router-dom";

const useAttendanceManagement = () => {
    const today = DateUtils.getToday();
    const navigate = useNavigate();
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
                const response = await fetchMemberAttendanceList(
                    filters.department,
                    filters.year,
                    filters.month,
                    currentPage
                );
                setAttendanceList(response.content);
                setTotalPages(response.totalPages);
            } catch (error) {
                alertError(error);
                navigate(0);
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
            console.error("삭제 후, 근태 기록 리스트를 가져오는 데 실패했습니다:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAttendanceCreated = (newAttendance) => {
        setAttendanceList((prevList) => {
            const isCreatedToday = DateUtils.isToday(new Date(newAttendance.createdAt));

            if (isCreatedToday) {
                const isDuplicate = prevList.some(
                    (attendance) => attendance.createdAt === newAttendance.createdAt
                );

                if (!isDuplicate) {
                    const updatedList = [newAttendance, ...prevList];

                    return updatedList;
                }
            }
            return prevList;
        });
    };

    const isFebruaryWith28Days = () => {
        const date = attendanceList[0].createdAt;

        const year = parseInt(date.substring(0, 4), 10); // 연도 추출
        const month = parseInt(date.substring(5, 7), 10); // 월 추출

        // 2월 여부와 해당 월의 마지막 날짜가 28인지 확인
        const isFebruaryWith28Days = (month === 2) && (new Date(year, 2, 0).getDate() === 28);

        return isFebruaryWith28Days;
    };


    return {
        filters,
        attendanceList,
        totalPages,
        currentPage,
        loading,
        setCurrentPage,
        isFebruaryWith28Days,
        handleSetFilters,
        handleDeleteSuccess,
        handleAttendanceCreated,
    };
};

export default useAttendanceManagement;
