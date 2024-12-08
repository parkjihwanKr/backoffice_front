import MemberAttendanceHeader from "./MemberAttendanceHeader";
import MemberAttendanceBody from "./MemberAttendanceBody";
import MemberAttendanceFooter from "./MemberAttendanceFooter";
import { useEffect, useState } from "react";
import DateUtils from "../../../../utils/DateUtils";
import { fetchMemberAttendanceListForMember } from "../../services/MembersService";
import { useAuth } from "../../../auth/context/AuthContext";

const MemberAttendance = () => {
    const { id } = useAuth(); // 로그인한 사용자의 memberId
    const today = DateUtils.getToday(); // 오늘 날짜
    const [filters, setFilters] = useState({
        year: today.getFullYear(),
        month: today.getMonth() + 1,
    });

    const [attendanceList, setAttendanceList] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSetFilters = (newFilters) => {
        setFilters(newFilters);
    };

    // 특정 attendanceId의 데이터를 업데이트하는 함수
    const updateAttendanceInState = (updatedAttendance) => {
        setAttendanceList((prevList) =>
            prevList.map((att) =>
                att.attendanceId === updatedAttendance.attendanceId
                    ? { ...att, ...updatedAttendance }
                    : att
            )
        );
    };

    // 오늘 날짜의 attendanceId 찾기
    const findTodayAttendanceId = () => {
        const todayString = today.toISOString().split("T")[0]; // "yyyy-MM-dd" 형식
        const todayAttendance = attendanceList.find(
            (attendance) =>
                attendance.memberId === id &&
                attendance.createdAt.startsWith(todayString) // 오늘 날짜와 비교
        );
        return todayAttendance?.attendanceId || null; // 오늘의 attendanceId 또는 null
    };

    useEffect(() => {
        const fetchMemberAttendanceList = async () => {
            setLoading(true);
            try {
                const response = await fetchMemberAttendanceListForMember(
                    id,
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
    }, [filters]);

    const todayAttendanceId = findTodayAttendanceId(); // 오늘의 attendanceId 계산

    return (
        <div className="member-attendance-container">
            <MemberAttendanceHeader
                filters={filters}
                onFilterChange={handleSetFilters}
                currentYear={filters.year}
                currentMonth={filters.month - 1}
            />
            <MemberAttendanceBody
                attendances={attendanceList}
                currentYear={filters.year}
                currentMonth={filters.month}
            />
            <MemberAttendanceFooter
                attendanceId={todayAttendanceId}
                updateAttendanceInState={updateAttendanceInState}/>
        </div>
    );
};
export default MemberAttendance;
