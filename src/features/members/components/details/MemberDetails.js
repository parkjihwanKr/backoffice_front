import React, {useState} from "react";
import {useParams} from "react-router-dom";
import MemberProfile from "./MemberProfile";
import MemberControls from "./MemberControls";
import MemberDetailsTable from "./MemberDetailsTable";
import UpdateAttributeModal from "../../../admin/members/components/body/UpdateAttributeModal";
import UpdateVacationDaysModal from "../../../admin/members/components/body/UpdateVacationDaysModal";
import PersonalVacationListModal from "../../../events/personal/components/modal/PersonalVacationListModal";
import useMemberDetails from "./hooks/useMemberDetails";
import "./MemberDetails.css";
import {useError, useLoading} from "../../../../utils/LoadingUtils";
import useModalScroll from "../../../../hooks/useModalScroll";
import {useAuth} from "../../../auth/context/AuthContext";

const MemberDetails = () => {
    const { id, department, position } = useAuth();
    const { memberId } = useParams();
    const { member, loading, error, setMember } = useMemberDetails(memberId);

    // 모달 상태 통합 관리
    const [modals, setModals] = useState({
        attribute: false,
        vacationDays: false,
        vacationList: false,
    });

    const hasAccess = () => {
        return (department === "HR" && position === "MANAGER") || position === "CEO";
    };

    // 모달 상태를 통합적으로 관리
    const openModal = (modalName) => setModals({ ...modals, [modalName]: true });
    const closeModal = (modalName) => setModals({ ...modals, [modalName]: false });

    // 스크롤 제어
    useModalScroll(modals.attribute || modals.vacationDays || modals.vacationList);

    const handleSaveAttributeChanges = (updatedMember) => {
        setMember(updatedMember);
        closeModal("attribute");
    };

    const handleSaveVacationDays = (updatedMember) => {
        setMember(updatedMember);
        closeModal("vacationDays");
    };

    const loadingJSX = useLoading(loading);
    const errorJSX = useError(error);

    if (loadingJSX) return loadingJSX;
    if (errorJSX) return errorJSX;

    if (!member) {
        return <div>멤버 정보를 불러오지 못했습니다.</div>;
    }

    return (
        <div className="member-details-page">
            <div className="member-details-sidebar">
                <MemberProfile
                    loginMemberId={id}
                    memberId={member.memberId}
                    profileImageUrl={member.profileImageUrl}
                    name={member.memberName}
                    department={member.department}
                    position={member.position}
                />
                <MemberControls
                    loginMemberId={id}
                    memberId={memberId}
                    onOpenAttributeModal={() => openModal("attribute")}
                    onOpenVacationDaysModal={() => openModal("vacationDays")}
                    onOpenVacationListModal={() => openModal("vacationList")}
                    hasAccess={hasAccess()}
                    updateMode={false}
                />
            </div>
            <div className="member-details-info">
                <MemberDetailsTable member={member} />
            </div>
            {modals.attribute && (
                <UpdateAttributeModal
                    member={member}
                    onClose={() => closeModal("attribute")}
                    onSave={handleSaveAttributeChanges}
                />
            )}
            {modals.vacationDays && (
                <UpdateVacationDaysModal
                    member={member}
                    onClose={() => closeModal("vacationDays")}
                    onSave={handleSaveVacationDays}
                />
            )}
            {modals.vacationList && (
                <PersonalVacationListModal
                    handleClose={() => closeModal("vacationList")}
                />
            )}
        </div>
    );
};

export default MemberDetails;
