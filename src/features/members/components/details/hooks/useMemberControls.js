import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useModalScroll from "../../../../../hooks/useModalScroll";

const useMemberControls = (loginMemberId, memberId) => {
    const navigate = useNavigate();
    const [isMemberVacationListModalOpen, setMemberVacationListModalOpen] = useState(false);

    // 모달 스크롤 제어
    useModalScroll(isMemberVacationListModalOpen);

    // 공통 권한 체크 및 알림 헬퍼 함수
    const checkAccessAndNotify = (actionName, successCallback, fallbackCallback = null) => {
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

    return {
        isMemberVacationListModalOpen,
        handleEditPage,
        handlePersonalSchedule,
        handleMemberAttendancePage,
        handleMemberVacationListModalOpen,
        handleMemberVacationListModalClose,
    };
};

export default useMemberControls;
