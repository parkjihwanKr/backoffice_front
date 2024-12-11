import { imagePrefix, reverseDepartmentMapping, reversePositionMapping } from "../../../../utils/Constant";
import './MemberDetails.css';
import { updateMemberProfileImage } from "../../services/MembersService";
import { useRef, useState } from "react";

const MemberProfile = ({ loginMemberId, memberId, profileImageUrl, name, department, position }) => {
    const [currentImage, setCurrentImage] = useState(profileImageUrl);
    const fileInputRef = useRef(null); // 파일 input을 참조하기 위한 useRef

    const isDefaultImage = !currentImage || currentImage.includes("default_profile_image");

    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];
        if (!selectedFile) return;

        try {
            if (Number(loginMemberId) !== Number(memberId)) {
                alert("해당 멤버는 프로필 사진을 바꿀 권한이 없습니다.");
                return;
            }
            // API 호출로 이미지 업로드
            const updatedProfile = await updateMemberProfileImage(memberId, selectedFile);
            setCurrentImage(updatedProfile.profileImageUrl); // 업데이트된 이미지 URL로 변경
            alert("프로필 이미지가 업데이트되었습니다.");
        } catch (error) {
            alert("프로필 이미지 업데이트 중 오류가 발생했습니다.");
            console.error(error);
        }
    };

    const handleImageClick = () => {
        fileInputRef.current.click(); // 이미지 클릭 시 파일 input 클릭 이벤트 트리거
    };

    return (
        <div className="member-details-profile-info">
            <img
                src={currentImage || `${imagePrefix}/shared/default_profile_image.png`}
                alt="프로필"
                className={`profile-image ${isDefaultImage ? "default-image" : ""}`}
                onClick={handleImageClick} // 이미지 클릭 시 파일 선택 창 열기
            />
            <input
                ref={fileInputRef} // input을 ref로 관리
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="profile-image-input"
                style={{ display: "none" }} // input을 숨김
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
