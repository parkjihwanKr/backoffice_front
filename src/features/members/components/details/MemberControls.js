import './MemberDetails.css';
import React, { useState } from "react";
import PersonalVacationListModal from "../../../events/personal/components/modal/PersonalVacationListModal";
import useMemberControls from "./hooks/useMemberControls";
import useMemberProfile from "./hooks/useMemberProfile";
import DeleteProfileImageModal from "./modal/DeleteProfileImageModal";
import { deleteMemberProfileImage } from "../../services/MembersService";
import {useAuth} from "../../../auth/context/AuthContext";

const MemberControls = ({ loginMemberId, memberId, onOpenAttributeModal, onOpenVacationDaysModal, hasAccess, updateMode, setMember }) => {
    const {
        isMemberVacationListModalOpen,
        handleEditPage,
        handlePersonalSchedule,
        handleMemberAttendancePage,
        handleMemberVacationListModalOpen,
        handleMemberVacationListModalClose,
    } = useMemberControls(loginMemberId, memberId);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const { setProfileImageUrl } = useAuth();
    const {resetToDefaultImage}
        = useMemberProfile(loginMemberId, memberId, localStorage.getItem("profileImageUrl"));
    const handleDeleteProfileImage = async () => {
        try {
            await deleteMemberProfileImage(memberId);
            alert("프로필 사진이 삭제되었습니다.");

            const defaultImage = null;
            setMember(prevMember => ({ ...prevMember, profileImageUrl: defaultImage }));
            setProfileImageUrl(defaultImage);

            localStorage.removeItem("profileImageUrl");
            localStorage.setItem("profileImageUrl", defaultImage);
            resetToDefaultImage();
            setIsDeleteModalOpen(false);
        } catch (error) {
            alert("프로필 사진 삭제 중 오류가 발생했습니다.");
            console.error(error);
        }
    };

    const handleCommingSoon = () => {
        alert("준비 중...");
    }

    return (
        <div className="member-details-buttons">
            {updateMode ? (
                <button
                    className="details-button"
                    onClick={() => setIsDeleteModalOpen(true)}
                >
                    프로필 사진 삭제
                </button>
            ) : (
                <>
                    <button className="details-button" onClick={handleEditPage}>
                        개인 정보 수정
                    </button>
                    <button className="details-button" onClick={handleMemberVacationListModalOpen}>
                        개인 휴가 리스트
                    </button>
                    <button className="details-button" onClick={handlePersonalSchedule}>
                        개인 일정표
                    </button>
                    <button className="details-button" onClick={handleCommingSoon}>개인 설문조사</button>
                    <button className="details-button" onClick={handleMemberAttendancePage}>
                        개인 근태 기록 확인
                    </button>
                    {hasAccess && (
                        <>
                            <button className="details-button" onClick={onOpenAttributeModal}>
                                직위 변경
                            </button>
                            <button className="details-button" onClick={onOpenVacationDaysModal}>
                                휴가 일수 변경
                            </button>
                        </>
                    )}
                </>
            )}
            {isMemberVacationListModalOpen && (
                <PersonalVacationListModal
                    handleClose={handleMemberVacationListModalClose}
                />
            )}
            {isDeleteModalOpen && (
                <DeleteProfileImageModal
                    handleDeleteProfileImage={handleDeleteProfileImage}
                    show={true}
                    onClose={() => setIsDeleteModalOpen(false)}
                />
            )}
        </div>
    );
};

export default MemberControls;
