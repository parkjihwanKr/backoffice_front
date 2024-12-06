import MemberAttendanceHeader from "./MemberAttendanceHeader";
import MemberAttendanceBody from "./MemberAttendanceBody";
import MemberAttendanceFooter from "./MemberAttendanceFooter";

const MemberAttendance = () => {
    return(
        <div className="member-attendance-container">
            <MemberAttendanceHeader/>
            <MemberAttendanceBody/>
            <MemberAttendanceFooter/>
        </div>
    )
}
export default MemberAttendance;