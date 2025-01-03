import {useRef, useState} from "react";
import {updateMemberProfileImage} from "../../../services/MembersService";
import {imagePrefix} from "../../../../../utils/Constant";
import {useAuth} from "../../../../auth/context/AuthContext";

const useMemberProfile = (loginMemberId, memberId, initialProfileImageUrl) => {
    const { setProfileImageUrl } = useAuth();
    const [currentImage, setCurrentImage] = useState(initialProfileImageUrl);
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
            localStorage.removeItem("profileImageUrl");
            localStorage.setItem("profileImageUrl", updatedProfile.profileImageUrl);
            setProfileImageUrl(updatedProfile.profileImageUrl);
        } catch (error) {
            alert("프로필 이미지 업데이트 중 오류가 발생했습니다.");
            console.error(error);
        }
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const resetToDefaultImage = () => {
        setCurrentImage(`${imagePrefix}/shared/default_profile_image.png`); // 기본 이미지로 재설정
    };

    // 이미지 변경을 호출할 수 있는 메서드 반환
    return {
        currentImage: currentImage || `${imagePrefix}/shared/default_profile_image.png`,
        setCurrentImage,
        isDefaultImage,
        fileInputRef,
        handleFileChange,
        handleImageClick,
        resetToDefaultImage, // 기본 이미지를 설정하는 메서드 추가
    };
};

export default useMemberProfile;
