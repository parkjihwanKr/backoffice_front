import { useEffect, useState } from "react";
import { imagePrefix } from "../../../../../utils/Constant";
import { fetchFilteredMembers } from "../../services/MemberManagementService"; // fetchMemberDetails 제거
import { useNavigate } from 'react-router-dom'; // useNavigate 사용
import './MemberManagementBody.css';

const MemberManagementBody = ({ filters, currentPage, updateTotalPages }) => {
    const [members, setMembers] = useState([]); // 멤버 리스트 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태
    const navigate = useNavigate(); // React Router의 useNavigate 훅 사용

    const pageSize = 10; // 페이지당 표시할 멤버 수

    // 필터링된 멤버 리스트를 가져오는 함수
    const loadFilteredMembers = async (page = 0) => {
        setLoading(true);
        setError(null);
        try {
            const membersData = await fetchFilteredMembers(filters.position, filters.department, page, pageSize);
            setMembers(membersData.content); // 가져온 멤버 데이터를 상태에 저장
            updateTotalPages(membersData.totalPages); // 전체 페이지 수 설정
        } catch (error) {
            setError('멤버 데이터를 가져오는 중 오류가 발생했습니다.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // 상세 페이지로 이동하는 함수
    const goToMemberDetails = (memberId) => {
        navigate(`/members/${memberId}`); // 멤버 ID를 기반으로 상세 페이지로 이동
    };

    // 필터가 변경되거나 페이지가 변경될 때 필터링된 멤버 리스트를 가져옴
    useEffect(() => {
        loadFilteredMembers(currentPage); // 필터가 변경되거나 페이지가 변경될 때 데이터를 로드
    }, [filters, currentPage]);

    // 로딩 중일 때의 화면
    if (loading) {
        return <div>로딩 중...</div>;
    }

    // 에러가 발생했을 때의 화면
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="member-management-body">
            {/* 멤버 리스트 */}
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
