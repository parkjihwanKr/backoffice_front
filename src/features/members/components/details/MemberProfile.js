import {imagePrefix} from "../../../../utils/Constant";
import './MemberDetails.css';

const MemberProfile = ({ profileImageUrl, name, department, position }) => {
    return (
        <div className="member-details-profile-info">
            {profileImageUrl ? (
                <img src={profileImageUrl} alt="프로필" />
            ) : (
                <img
                    src={`${imagePrefix}/shared/default_profile_image.png`}
                    alt="기본 프로필 이미지"
                />
            )}
            <p>
                <strong>이름:</strong> {name}
            </p>
            <p>
                <strong>직위:</strong> {department}, {position}
            </p>
        </div>
    );
};
export default MemberProfile;