import React from "react";
import CloseImageButton from "../image/CloseImageButton";
import useModalScroll from "../../../hooks/useModalScroll";
import { getDepartmentName, getPositionName } from "../../../utils/Constant";
import "./Modal.css";
import { useNavigate } from "react-router-dom";
import LinkButton from "../buttons/LinkButton";
import ConfirmButton from "../buttons/ConfirmButton";
import DeleteProfileImageModal from "../../../features/members/components/details/modal/DeleteProfileImageModal";
import useUserInfoModal from "../hooks/useUserInfoModal";

const UserInfoModal = ({ show, handleClose, name, department, position, memberId, profileImageUrl }) => {
    useModalScroll(show);
    const navigate = useNavigate();
    const { isDeleteModalOpen, handleOpenDeleteModal, handleCloseDeleteModal, handleDeleteProfileImage } =
        useUserInfoModal(memberId, profileImageUrl, handleClose);

    if (!show) return null; // show가 false면 모달을 렌더링하지 않음

    const mappedDepartment = department ? getDepartmentName(department) : "";
    const mappedPosition = position ? getPositionName(position) : "";

    const handleMemberDetailsClick = () => {
        if (memberId) {
            navigate(`/members/${memberId}`);
            handleClose();
        } else {
            alert("로그인이 되지 않았습니다.");
        }
    };

    const handleEditProfile = () => {
        if (memberId) {
            navigate(`/members/${memberId}/update`);
            handleClose();
        } else {
            alert("로그인이 되지 않았습니다.");
        }
    };

    return (
        <div className="custom-modal-overlay" onClick={handleClose}>
            <div className="custom-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="custom-modal-header">
                    <h3>'{name}'님의 정보</h3>
                    <CloseImageButton handleClose={handleClose} />
                </div>
                <div className="custom-modal-body">
                    <p>{name ? `${name}님 안녕하세요!` : "비로그인 상태입니다."}</p>
                    <p>{mappedDepartment && mappedPosition ? `역할 : ${mappedDepartment}, ${mappedPosition}` : ""}</p>
                </div>
                <div className="custom-modal-footer">
                    <LinkButton text={"개인 페이지 가기"} goToLink={handleMemberDetailsClick} />
                    {profileImageUrl ? (
                        <ConfirmButton text={"프로필 사진 삭제"} onClick={handleOpenDeleteModal} />
                    ) : (
                        <ConfirmButton text={"프로필 사진 수정"} onClick={handleEditProfile} />
                    )}
                </div>
            </div>

            {/* 삭제 확인 모달 */}
            {isDeleteModalOpen && (
                <DeleteProfileImageModal
                    show={isDeleteModalOpen}
                    handleDeleteProfileImage={handleDeleteProfileImage}
                    onClose={handleCloseDeleteModal}
                />
            )}
        </div>
    );
};

export default UserInfoModal;
