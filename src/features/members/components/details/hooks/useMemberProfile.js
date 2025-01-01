import { useState, useRef } from "react";
import { updateMemberProfileImage } from "../../../services/MembersService";
import { imagePrefix } from "../../../../../utils/Constant";

const useMemberProfile = (loginMemberId, memberId, profileImageUrl) => {
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
        fileInputRef.current.click();
    };

    return {
        currentImage: currentImage || `${imagePrefix}/shared/default_profile_image.png`,
        isDefaultImage,
        fileInputRef,
        handleFileChange,
        handleImageClick,
    };
};

export default useMemberProfile;
