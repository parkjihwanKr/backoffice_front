import './MemberDetails.css';
import { useNavigate } from "react-router-dom";
import PersonalVacationListModal from "../../../events/personal/components/PersonalVacationListModal";
import React, { useState } from "react";
import useModalScroll from "../../../boards/shared/hooks/useModalScroll";

const MemberControls = ({ loginMemberId, memberId, onOpenAttributeModal, onOpenVacationDaysModal, hasAccess }) => {
    const navigate = useNavigate();
    const [isMemberVacationListModalOpen, setMemberVacationListModalOpen] = useState(false);

    // 모달 스크롤 제어
    useModalScroll(isMemberVacationListModalOpen);

    // 공통 권한 체크 및 알림 헬퍼 함수
    const checkAccessAndNotify = (actionName, successCallback, fallbackCallback = null) => {
        console.log(`loginMemberId: ${loginMemberId} / memberId: ${memberId}`);
        if (Number(loginMemberId) !== Number(memberId)) {
            alert(`해당 멤버는 ${actionName} 권한이 없습니다. 자기 자신의 ${actionName}로 이동합니다.`);
            if (fallbackCallback) fallbackCallback(); // 권한이 없을 경우 수행할 동작
            return;
        }
        successCallback(); // 권한이 있을 경우 수행할 동작
    };

    const handleEditPage = () => {
        checkAccessAndNotify("상세 정보 수정", () =>
            navigate(`/members/${memberId}/update`)
        );
    };

    const handlePersonalSchedule = () => {
        checkAccessAndNotify("개인 일정표 조회", () =>
            navigate(`/personal-schedule`)
        );
    };

    const handleMemberAttendancePage = () => {
        checkAccessAndNotify(
            "개인 근태 기록 조회",
            () => navigate(`/members/${memberId}/attendance`),
            () => navigate(`/members/${loginMemberId}/attendance`)
        );
    };

    const handleMemberVacationListModalOpen = () => {
        checkAccessAndNotify(
            "개인 휴가 리스트 조회",
            () => setMemberVacationListModalOpen(true)
        );
    };

    const handleMemberVacationListModalClose = () => {
        setMemberVacationListModalOpen(false);
    };

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
