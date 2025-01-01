import './MemberDetails.css';
import React from "react";
import PersonalVacationListModal from "../../../events/personal/components/modal/PersonalVacationListModal";
import useMemberControls from "./hooks/useMemberControls";

const MemberControls = ({ loginMemberId, memberId, onOpenAttributeModal, onOpenVacationDaysModal, hasAccess }) => {
    const {
        isMemberVacationListModalOpen,
        handleEditPage,
        handlePersonalSchedule,
        handleMemberAttendancePage,
        handleMemberVacationListModalOpen,
        handleMemberVacationListModalClose,
    } = useMemberControls(loginMemberId, memberId);

    return (
        <div className="member-details-buttons">
            <button className="details-button" onClick={handleEditPage}>
                개인 정보 수정
            </button>
            <button className="details-button" onClick={handleMemberVacationListModalOpen}>
                개인 휴가 리스트
            </button>
            <button className="details-button" onClick={handlePersonalSchedule}>
                개인 일정표
            </button>
            <button className="details-button">개인 설문조사</button>
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
            {isMemberVacationListModalOpen && (
                <PersonalVacationListModal
                    handleClose={handleMemberVacationListModalClose}
                />
            )}
        </div>
    );
};

export default MemberControls;
