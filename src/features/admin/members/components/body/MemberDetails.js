import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMemberDetails } from "../../services/MemberManagementService";
import './MemberDetails.css';
import { departmentMapping, imagePrefix, positionMapping } from "../../../../../utils/Constant";
import { useAuth } from "../../../../auth/components/AuthContext";
import UpdateAttributeModal from "./UpdateAttributeModal"; // 직위 변경 모달 컴포넌트 임포트
import UpdateVacationDaysModal from "./UpdateVacationDaysModal"; // 휴가 일수 변경 모달 컴포넌트 임포트

const MemberDetails = () => {
    const { department, position } = useAuth();
    const { memberId } = useParams(); // 라우트 파라미터에서 memberId 추출
    const [member, setMember] = useState(null); // 멤버 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태
    const [showAttributeModal, setShowAttributeModal] = useState(false); // 직위 변경 모달 상태
    const [showVacationDaysModal, setShowVacationDaysModal] = useState(false); // 휴가 일수 변경 모달 상태

    // 권한 체크 함수
    const hasAccess = () => {
        if ((department === 'HR' && position === 'MANAGER') || position === 'CEO') {
            return true;
        }
        return false;
    };

    // 모달 열기/닫기
    const handleOpenAttributeModal = () => {
        setShowAttributeModal(true);
    };

    const handleCloseAttributeModal = () => {
        setShowAttributeModal(false);
    };

    const handleOpenVacationDaysModal = () => {
        setShowVacationDaysModal(true);
    };

    const handleCloseVacationDaysModal = () => {
        setShowVacationDaysModal(false);
    };

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

    // 업데이트가 저장된 후 멤버 정보를 업데이트하는 함수
    const handleSaveChanges = (updatedMember) => {
        setMember(updatedMember); // 변경된 멤버 정보로 업데이트
        setShowAttributeModal(false); // 모달 닫기
    };

    const handleSaveVacationDays = (updatedMember) => {
        setMember(updatedMember); // 변경된 휴가 일수로 업데이트
        setShowVacationDaysModal(false); // 모달 닫기
    };

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
                        ? <img src={member.profileImageUrl} alt="프로필" />
                        : <img src={`${imagePrefix}/shared/default_profile_image.png`} alt="기본 프로필 이미지" />
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
                    <button className="details-button">근태 관리</button>
                    {/* 직위 변경 버튼 (권한 있을 때만 노출) */}
                    {hasAccess() && (
                        <>
                            <button className="details-button" onClick={handleOpenAttributeModal}>직위 변경</button>
                            <button className="details-button" onClick={handleOpenVacationDaysModal}>휴가 일수 변경</button>
                        </>
                    )}
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

            {/* UpdateAttributeModal 모달 */}
            {showAttributeModal && (
                <UpdateAttributeModal
                    member={member}
                    onClose={handleCloseAttributeModal}
                    onSave={handleSaveChanges}
                />
            )}

            {/* UpdateVacationDaysModal 모달 */}
            {showVacationDaysModal && (
                <UpdateVacationDaysModal
                    member={member}
                    onClose={handleCloseVacationDaysModal}
                    onSave={handleSaveVacationDays}
                />
            )}
        </div>
    );
};

export default MemberDetails;
