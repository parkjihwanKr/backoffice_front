import React from "react";
import { reverseDepartmentMapping, reversePositionMapping } from "../../../../utils/Constant";
import useMemberProfile from "./hooks/useMemberProfile";
import "./MemberDetails.css";

const MemberProfile = ({ loginMemberId, memberId, profileImageUrl, name, department, position }) => {
    const {
        currentImage,
        isDefaultImage,
        fileInputRef,
        handleFileChange,
        handleImageClick,
    } = useMemberProfile(loginMemberId, memberId, profileImageUrl);

    return (
        <div className="member-details-profile-info">
            <img
                src={currentImage}
                alt="프로필"
                className={`profile-image ${isDefaultImage ? "default-image" : "profile-image-info"}`}
                onClick={handleImageClick}
            />
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="profile-image-input"
                style={{ display: "none" }}
            />
            <p>
                <strong>이름:</strong> {name}
            </p>
            <p>
                <strong>직위 : </strong>
                {reverseDepartmentMapping[department]}, {reversePositionMapping[position]}
            </p>
        </div>
    );
};

export default MemberProfile;
