import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // URL에서 파라미터를 추출
import { fetchMemberDetails } from "../../services/MemberManagementService"; // 멤버 상세 정보 API 호출
import './MemberDetails.css';
import { imagePrefix } from "../../../../../utils/Constant";

const MemberDetails = () => {
    const { memberId } = useParams(); // 라우트 파라미터에서 memberId 추출
    const [member, setMember] = useState(null); // 멤버 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태

    // 멤버 상세 정보를 가져오는 함수
    const loadMemberDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            const memberData = await fetchMemberDetails(memberId); // API 호출로 멤버 상세 정보 가져오기
            setMember(memberData); // 가져온 멤버 정보를 상태에 저장
        } catch (error) {
            setError('멤버 정보를 가져오는 중 오류가 발생했습니다.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMemberDetails(); // 컴포넌트가 마운트될 때 멤버 상세 정보 로드
    }, [memberId]);

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!member) {
        return <div>멤버 정보를 불러오지 못했습니다.</div>;
    }

    return (
        <div className="member-details-page">
            <div className="member-details-profile">
                <div className="member-details-profile-info">
                    {member.profileImageUrl
                        ? <img src={member.profileImageUrl} alt="프로필"/>
                        : <img src={`${imagePrefix}/shared/default_profile_image.png`} alt="기본 프로필 이미지"/>
                    }
                    <p><strong>이름:</strong> {member.memberName}</p>
                    <p><strong>직위:</strong> {member.department}, {member.position}</p>
                </div>
                {/* 고정 버튼 추가 */}
                <div className="member-details-buttons">
                    <button className="details-button">개인 정보 수정</button>
                    <button className="details-button">자기 소개서</button>
                    <button className="details-button">개인 휴가 리스트</button>
                    <button className="details-button">개인 일정표</button>
                    <button className="details-button">개인 설문조사</button>
                </div>
            </div>

            <div className="member-details-info">
                <table className="member-details-table">
                    <tbody>
                    <tr>
                        <td><strong>이름:</strong></td>
                        <td>{member.memberName}</td>
                        <td><strong>부서:</strong></td>
                        <td>{member.department}</td>
                    </tr>
                    <tr>
                        <td><strong>직책:</strong></td>
                        <td>{member.position}</td>
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
                            <div className="member-details-introduction-title">
                                자기 소개
                            </div>
                            <div className="member-details-introduction-content">
                                {member.introduction ? member.introduction : "자기소개가 없습니다."}
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MemberDetails;
