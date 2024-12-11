import MemberAttendanceHeader from "./MemberAttendanceHeader";
import MemberAttendanceBody from "./MemberAttendanceBody";
import MemberAttendanceFooter from "./MemberAttendanceFooter";
import { useEffect, useState } from "react";
import DateUtils from "../../../../utils/DateUtils";
import { fetchMemberAttendanceListForMember } from "../../services/MembersService";
import { useParams } from "react-router-dom";

const MemberAttendance = () => {
    const { memberId } = useParams();
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
                    ? { ...attendance, ...updatedFields } // 해당 요소 업데이트
                    : attendance // 다른 요소는 그대로
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
                .replace(/-(?=[^-]*$)/, "");

            console.log(todayString);

            const todayAttendance = attendanceList.find(
                (attendance) =>
                    attendance.memberId === Number(memberId) &&
                    attendance.createdAt.startsWith(todayString) // 오늘 날짜와 비교
            );

            console.log(todayAttendance);
            setTodayAttendanceId(todayAttendance?.attendanceId || null); // 오늘의 attendanceId 설정
        }
    }, [attendanceList, memberId]); // attendanceList와 memberId가 변경될 때 실행

    useEffect(() => {
        const fetchMemberAttendanceList = async () => {
            setLoading(true);
            try {
                const response = await fetchMemberAttendanceListForMember(
                    memberId,
                    filters.year,
                    filters.month
                );
                console.log("Fetched attendance list:", response);
                setAttendanceList(response);
            } catch (error) {
                alert(`에러 발생: ${error.message || error}`);
                return;
            } finally {
                setLoading(false);
            }
        };

        fetchMemberAttendanceList();
    }, [filters, memberId]);

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
                updateAttendanceInState={updateAttendanceInState}
            />
            <MemberAttendanceFooter
                attendanceId={todayAttendanceId}
                updateAttendanceInState={updateAttendanceInState}
            />
        </div>
    );
};

export default MemberAttendance;
