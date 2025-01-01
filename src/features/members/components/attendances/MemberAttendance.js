import React from "react";
import MemberAttendanceHeader from "./MemberAttendanceHeader";
import MemberAttendanceBody from "./MemberAttendanceBody";
import MemberAttendanceFooter from "./MemberAttendanceFooter";
import useMemberAttendance from "./hooks/useMemberAttendance";
import {useParams} from "react-router-dom";

const MemberAttendance = () => {
    const { memberId } = useParams();

    const {
        filters,
        setFilters,
        attendanceList,
        updateAttendanceInState,
        todayAttendanceId,
    } = useMemberAttendance(memberId);

    return (
        <div className="member-attendance-container">
            <MemberAttendanceHeader
                filters={filters}
                onFilterChange={setFilters}
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
