import { useEffect, useState } from "react";
import DateUtils from "../../../../../utils/DateUtils";
import { fetchMemberAttendanceListForMember } from "../../../services/MembersService";

const useMemberAttendance = (memberId) => {
    const today = DateUtils.getToday(); // 오늘 날짜
    const [filters, setFilters] = useState({
        year: today.getFullYear(),
        month: today.getMonth() + 1,
    });
    const [attendanceList, setAttendanceList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [todayAttendanceId, setTodayAttendanceId] = useState(null);

    const handleSetFilters = (newFilters) => {
        setFilters(newFilters);
    };

    // 특정 attendanceId의 데이터를 업데이트하는 함수
    const updateAttendanceInState = (attendanceId, updatedFields) => {
        setAttendanceList((prevList) =>
            prevList.map((attendance) =>
                attendance.attendanceId === attendanceId
                    ? { ...attendance, ...updatedFields }
                    : attendance
            )
        );
    };

    // 오늘 날짜의 attendanceId 찾기
    useEffect(() => {
        if (attendanceList.length > 0) {
            const todayString = new Date().toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            })
                .replace(/\s/g, "")
                .replace(/\./g, "-")
                .replace(/-(?=[^-]*$)/, ""); // Remove trailing '-'

            const todayAttendance = attendanceList.find(
                (attendance) =>
                    attendance.memberId === Number(memberId) &&
                    attendance.createdAt.startsWith(todayString)
            );

            setTodayAttendanceId(todayAttendance?.attendanceId || null);
        }
    }, [attendanceList, memberId]);

    // 데이터 가져오기
    useEffect(() => {
        const fetchMemberAttendanceList = async () => {
            setLoading(true);
            try {
                const response = await fetchMemberAttendanceListForMember(
                    memberId,
                    filters.year,
                    filters.month
                );
                setAttendanceList(response);
            } catch (error) {
                alert(`에러 발생: ${error.message || error}`);
            } finally {
                setLoading(false);
            }
        };

        fetchMemberAttendanceList();
    }, [filters, memberId]);

    return {
        filters,
        setFilters: handleSetFilters,
        attendanceList,
        updateAttendanceInState,
        todayAttendanceId,
        loading,
    };
};

export default useMemberAttendance;
