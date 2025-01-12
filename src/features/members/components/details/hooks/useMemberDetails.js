import { useEffect, useState } from "react";
import { fetchMemberDetails } from "../../../services/MembersService";
import useModalScroll from "../../../../../hooks/useModalScroll";

const useMemberDetails = (memberId, auth) => {
    const [member, setMember] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 모달 상태 통합 관리
    const [modals, setModals] = useState({
        attribute: false,
        vacationDays: false,
        vacationList: false,
    });

    // 멤버 세부 정보 로드
    const loadMemberDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            const memberData = await fetchMemberDetails(memberId);
            setMember(memberData);
        } catch (error) {
            setError("멤버 정보를 가져오는 중 오류가 발생했습니다.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMemberDetails();
    }, [memberId]);

    // 모달 상태를 통합적으로 관리
    const openModal = (modalName) => setModals({ ...modals, [modalName]: true });
    const closeModal = (modalName) => setModals({ ...modals, [modalName]: false });

    // 스크롤 제어
    useModalScroll(modals.attribute || modals.vacationDays || modals.vacationList);

    // 저장 핸들러
    const handleSaveAttributeChanges = (updatedMember) => {
        setMember(updatedMember);
        closeModal("attribute");
    };

    const handleSaveVacationDays = (updatedMember) => {
        setMember(updatedMember);
        closeModal("vacationDays");
    };

    // 접근 권한 확인
    const hasAccess = () => {
        const { department, position } = auth;
        return (department === "HR" && position === "MANAGER") || position === "CEO";
    };

    return {
        member,
        setMember,
        loading,
        error,
        modals,
        openModal,
        closeModal,
        handleSaveAttributeChanges,
        handleSaveVacationDays,
        hasAccess,
    };
};

export default useMemberDetails;
