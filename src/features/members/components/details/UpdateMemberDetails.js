import React from "react";
import {useParams} from "react-router-dom";
import MemberProfile from "./MemberProfile";
import useMemberDetails from "../../hooks/useMemberDetails"; // custom hook 사용
import "./MemberDetails.css";
import {useError, useLoading} from "../../../utils/LoadingUtils";
import UpdateMemberDetailsTable from "./UpdateMemberDetailsTable";

const UpdateMemberDetails = () => {
    const { memberId } = useParams();
    const { member, loading, error, setMember } = useMemberDetails(memberId);
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
                    memberId={member.memberId}
                    profileImageUrl={member.profileImageUrl}
                    name={member.memberName}
                    department={member.department}
                    position={member.position}
                />
            </div>
            <div className="member-details-info">
                <UpdateMemberDetailsTable
                    member={member} />
            </div>
        </div>
    );
};

export default UpdateMemberDetails;
