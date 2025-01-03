import React, {useState} from 'react';
import CloseImageButton from "../image/CloseImageButton";
import useModalScroll from "../../../hooks/useModalScroll";
import {getDepartmentName, getPositionName} from "../../../utils/Constant";

import './Modal.css';
import {useNavigate} from "react-router-dom";
import LinkButton from "../buttons/LinkButton";
import ConfirmButton from "../buttons/ConfirmButton";
import DeleteProfileImageModal from "../../../features/members/components/details/modal/DeleteProfileImageModal";
import {deleteMemberProfileImage} from "../../../features/members/services/MembersService";

const UserInfoModal = ({ show, handleClose, name, department, position, memberId, profileImageUrl }) => {
    useModalScroll(show);
    const navigate = useNavigate();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // 삭제 모달 열림 상태

    if (!show) return null; // show가 false면 모달을 렌더링하지 않음

    const mappedDepartment = department ? getDepartmentName(department) : '';
    const mappedPosition = position ? getPositionName(position) : '';

    const handleMemberDetailsClick = () => {
        if (memberId) {
            navigate(`/members/${memberId}`);
            handleClose();
        } else {
            alert("로그인이 되지 않았습니다.");
        }
    };

    const handleOpenDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const handleDeleteProfileImage = async () => {
        if(memberId){
            try {
                await deleteMemberProfileImage(memberId);
                const defaultImage = null;
                localStorage.removeItem("profileImageUrl");
                localStorage.setItem("profileImageUrl", defaultImage);

                setIsDeleteModalOpen(false);
                handleClose(); // 메인 모달도 닫음
            } catch (error) {
                console.error("프로필 삭제 중 오류 발생:", error);
            }
        }else{
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
                    <p>
                        {name ? `${name}님 안녕하세요!` : '비로그인 상태입니다.'}
                    </p>
                    <p>{mappedDepartment && mappedPosition ? `역할 : ${mappedDepartment}, ${mappedPosition}` : ''}</p>
                </div>
                <div className="custom-modal-footer">
                    <LinkButton text={"개인 페이지 가기"} goToLink={handleMemberDetailsClick} />
                    {profileImageUrl && (
                        <ConfirmButton text={"프로필 삭제"} onClick={handleOpenDeleteModal} />
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
