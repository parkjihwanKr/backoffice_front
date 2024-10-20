import { useNavigate } from 'react-router-dom';
import { imagePrefix } from "../../../../../utils/Constant";
import useFilteredMembers from "../../hooks/useFilteredMembers"; // custom hook 임포트
import './MemberManagementBody.css';

const MemberManagementBody = ({ filters, currentPage, updateTotalPages }) => {
    const pageSize = 10; // 페이지당 표시할 멤버 수
    const navigate = useNavigate(); // React Router의 useNavigate 훅 사용

    // custom hook을 통해 멤버 상태 및 로딩/에러 관리
    const { members, loading, error } = useFilteredMembers(filters, currentPage, pageSize, updateTotalPages);

    // 상세 페이지로 이동하는 함수
    const goToMemberDetails = (memberId) => {
        navigate(`/members/${memberId}`); // 멤버 ID를 기반으로 상세 페이지로 이동
    };

    // 로딩 중일 때의 화면
    if (loading) {
        return <div>로딩 중...</div>;
    }

    // 에러가 발생했을 때의 화면
    if (error) {
        return <div>{error}</div>;
    }

    if (members.length === 0) {
        return <div className="member-management-body-no-member">
            해당 조건의 사람이 없습니다.
        </div>;
    }

    return (
        <div className="member-management-body">
            <table className="member-table">
                <thead>
                <tr>
                    <th>이름</th>
                    <th>이메일</th>
                    <th>부서</th>
                    <th>직위</th>
                    <th>입사일</th>
                    <th>상세보기</th>
                </tr>
                </thead>
                <tbody>
                {members.map((member) => (
                    <tr key={member.id}>
                        <td>{member.memberName}</td>
                        <td>{member.email}</td>
                        <td>{member.department}</td>
                        <td>{member.position}</td>
                        <td>{new Date(member.createdAt).toLocaleDateString()}</td>
                        <td>
                            <img
                                className="member-management-member-details"
                                src={`${imagePrefix}/shared/find_member.png`}
                                alt="상세보기"
                                onClick={() => goToMemberDetails(member.memberId)} // 상세 페이지로 이동
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default MemberManagementBody;
