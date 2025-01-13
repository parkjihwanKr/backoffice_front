import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import MemberProfile from "./MemberProfile";
import "./MemberDetails.css";
import {useError, useLoading} from "../../../../utils/LoadingUtils";
import UpdateMemberDetailsTable from "./UpdateMemberDetailsTable";
import {updateMemberDetails} from "../../services/MembersService";
import useUpdateMemberDetails from "./hooks/useUpdateMemberDetails";
import MemberControls from "./MemberControls";
import {useAuth} from "../../../auth/context/AuthContext";

const UpdateMemberDetails = () => {
    const { memberId } = useParams();
    const {profileImageUrl} = useAuth();
    const { member, loading, error, setMember } = useUpdateMemberDetails(memberId);
    const loadingJSX = useLoading(loading);
    const errorJSX = useError(error);

    useEffect(() => {
    }, [profileImageUrl]);

    if (loadingJSX) return loadingJSX;
    if (errorJSX) return errorJSX;

    if (!member) {
        return <div>멤버 정보를 불러오지 못했습니다.</div>;
    }

    const onEditMemberDetails = async (updatedMemberInfo) => {
        try {
            const updatedMember = await updateMemberDetails(member.memberId, updatedMemberInfo); // API 호출
            setMember(updatedMember); // 상태 업데이트
            return updatedMember; // 업데이트된 멤버 정보 반환
        } catch (error) {
            throw new Error("멤버 정보 수정 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="member-details-page">
            <div className="member-details-sidebar">
                <MemberProfile
                    loginMemberId={memberId}
                    memberId={member.memberId}
                    profileImageUrl={member.profileImageUrl}
                    name={member.memberName}
                    department={member.department}
                    position={member.position}
                />
                <MemberControls
                    memberId={memberId}
                    updateMode={true}
                    setMember={setMember}
                />
            </div>
            <div className="member-details-info">
                <UpdateMemberDetailsTable
                    member={member}
                    onEditMemberDetails={onEditMemberDetails}/>
            </div>
        </div>
    );
};

export default UpdateMemberDetails;
