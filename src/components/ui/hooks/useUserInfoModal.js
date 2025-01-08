import { useState } from "react";
import { deleteMemberProfileImage } from "../../../features/members/services/MembersService";

const useUserInfoModal = (memberId, setProfileImageUrl, handleClose) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleOpenDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const handleDeleteProfileImage = async () => {
        if (memberId) {
            try {
                await deleteMemberProfileImage(memberId);
                const defaultImage = null;
                localStorage.removeItem("profileImageUrl");
                localStorage.setItem("profileImageUrl", defaultImage);

                setProfileImageUrl(defaultImage);
                setIsDeleteModalOpen(false);
                handleClose(); // 메인 모달도 닫음
            } catch (error) {
                console.error("프로필 삭제 중 오류 발생:", error);
            }
        } else {
            alert("로그인이 되지 않았습니다.");
        }
    };

    return {
        isDeleteModalOpen,
        handleOpenDeleteModal,
        handleCloseDeleteModal,
        handleDeleteProfileImage,
    };
};

export default useUserInfoModal;
