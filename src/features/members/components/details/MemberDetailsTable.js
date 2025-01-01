import {reverseDepartmentMapping, reversePositionMapping} from "../../../../utils/Constant";

const MemberDetailsTable = ({ member }) => {
    return (
        <table className="member-details-table">
            <tbody>
            <tr>
                <td><strong>이름:</strong></td>
                <td>{member.memberName}</td>
                <td><strong>부서:</strong></td>
                <td>{reverseDepartmentMapping[member.department]}</td>
            </tr>
            <tr>
                <td><strong>직책:</strong></td>
                <td>{reversePositionMapping[member.position]}</td>
                <td><strong>이메일:</strong></td>
                <td>{member.email}</td>
            </tr>
            <tr>
                <td><strong>연봉:</strong></td>
                <td>{member.salary.toLocaleString()} 원</td>
                <td><strong>입사일:</strong></td>
                <td>{new Date(member.createdAt).toLocaleDateString()}</td>
            </tr>
            <tr>
                <td><strong>주소:</strong></td>
                <td>{member.address}</td>
                <td><strong>남은 휴가 일수:</strong></td>
                <td>{member.remainingVacationDays}일</td>
            </tr>
            <tr>
                <td><strong>휴가 상태:</strong></td>
                <td>{member.onVacation ? "휴가 중" : "근무 중"}</td>
                <td><strong>좋아요 수:</strong></td>
                <td>{member.loveCount}</td>
            </tr>
            <tr>
                <td colSpan="4" className="member-details-introduction">
                    <div className="member-details-introduction-title">자기 소개</div>
                    <div className="member-details-introduction-content">
                        {member.introduction ? member.introduction : "자기소개가 없습니다."}
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
    );
};

export default MemberDetailsTable;
