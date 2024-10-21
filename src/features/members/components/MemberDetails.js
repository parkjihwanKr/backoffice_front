import { useParams } from "react-router-dom";
import { imagePrefix } from "../../../utils/Constant";
import { useAuth } from "../../auth/components/AuthContext";
import UpdateAttributeModal from "../../admin/members/components/body/UpdateAttributeModal";
import UpdateVacationDaysModal from "../../admin/members/components/body/UpdateVacationDaysModal";
import useMemberDetails from "../../admin/shared/hooks/useMemberDetails"; // custom hook 사용
import './MemberDetails.css';
import {useState} from "react";

const MemberDetails = () => {
    const { department, position } = useAuth();
    const { memberId } = useParams();
    const { member, loading, error, setMember } = useMemberDetails(memberId); // custom hook으로 데이터 로드
    const [showAttributeModal, setShowAttributeModal] = useState(false);
    const [showVacationDaysModal, setShowVacationDaysModal] = useState(false);

    const hasAccess = () => {
        return (department === 'HR' && position === 'MANAGER') || position === 'CEO';
    };

    const handleOpenAttributeModal = () => setShowAttributeModal(true);
    const handleCloseAttributeModal = () => setShowAttributeModal(false);
    const handleOpenVacationDaysModal = () => setShowVacationDaysModal(true);
    const handleCloseVacationDaysModal = () => setShowVacationDaysModal(false);

    const handleSaveChanges = (updatedMember) => {
        setMember(updatedMember);
        setShowAttributeModal(false);
    };

    const handleSaveVacationDays = (updatedMember) => {
        setMember(updatedMember);
        setShowVacationDaysModal(false);
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
                    {member.profileImageUrl ? (
                        <img src={member.profileImageUrl} alt="프로필" />
                    ) : (
                        <img src={`${imagePrefix}/shared/default_profile_image.png`} alt="기본 프로필 이미지" />
                    )}
                    <p><strong>이름:</strong> {member.memberName}</p>
                    <p><strong>직위:</strong> {member.department}, {member.position}</p>
                </div>
                <div className="member-details-buttons">
                    <button className="details-button">개인 정보 수정</button>
                    <button className="details-button">자기 소개서</button>
                    <button className="details-button">개인 휴가 리스트</button>
                    <button className="details-button">개인 일정표</button>
                    <button className="details-button">개인 설문조사</button>
                    <button className="details-button">근태 관리</button>
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
                            <div className="member-details-introduction-title">자기 소개</div>
                            <div className="member-details-introduction-content">
                                {member.introduction ? member.introduction : "자기소개가 없습니다."}
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            {showAttributeModal && (
                <UpdateAttributeModal
                    member={member}
                    onClose={handleCloseAttributeModal}
                    onSave={handleSaveChanges}
                />
            )}

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
