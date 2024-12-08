import MemberAttendanceHeader from "./MemberAttendanceHeader";
import MemberAttendanceBody from "./MemberAttendanceBody";
import MemberAttendanceFooter from "./MemberAttendanceFooter";
import {useEffect, useState} from "react";
import DateUtils from "../../../../utils/DateUtils";
import {fetchMemberAttendanceListForMember} from "../../services/MembersService";
import {useAuth} from "../../../auth/context/AuthContext";

const MemberAttendance = () => {
    const { id } = useAuth();
    const today = DateUtils.getToday();
    const [filters, setFilters] = useState({
        year: today.getFullYear(),
        month: today.getMonth() + 1,
    });

    const [attendanceList, setAttendanceList] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSetFilters = (newFilters) => {
        setFilters(newFilters);
    };

    useEffect(() => {
        const fetchMemberAttendanceList = async () => {
            setLoading(true);
            try {
                const response = await fetchMemberAttendanceListForMember(
                    id,
                    filters.year,
                    filters.month,
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

    return(
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
            <MemberAttendanceFooter/>
        </div>
    )
}
export default MemberAttendance;