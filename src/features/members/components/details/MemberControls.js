import './MemberDetails.css';
import { useNavigate } from "react-router-dom";
import PersonalVacationListModal from "../../../events/personal/components/PersonalVacationListModal";
import React, { useState } from "react";
import useModalScroll from "../../../boards/shared/hooks/useModalScroll";

const MemberControls = ({ memberId, onOpenAttributeModal, onOpenVacationDaysModal, hasAccess }) => {
    const navigate = useNavigate();
    const [isMemberVacationListModalOpen, setMemberVacationListModalOpen] = useState(false);

    // 모달 스크롤 제어
    useModalScroll(isMemberVacationListModalOpen);

    const handleEditPage = () => {
        navigate(`/members/${memberId}/update`);
    };

    const handlePersonalSchedule = () => {
        navigate(`/personal-schedule`); // 일정표 페이지로 라우팅
    };

    const handleMemberAttendancePage = () => {
        navigate(`/members/${memberId}/attendance`); // 일정표 페이지로 라우팅
    };

    const handleMemberVacationListModalOpen = () => {
        setMemberVacationListModalOpen(true);
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
