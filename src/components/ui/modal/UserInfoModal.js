import React from 'react';
import CloseImageButton from "../image/CloseImageButton";
import useModalScroll from "../../../hooks/useModalScroll";
import {getDepartmentName, getPositionName} from "../../../utils/Constant";

import './Modal.css';
import {useNavigate} from "react-router-dom";
import LinkButton from "../buttons/LinkButton";

const UserInfoModal = ({ show, handleClose, name, department, position, memberId }) => {
    useModalScroll(show);
    const navigate = useNavigate();

    if (!show) return null; // show가 false면 모달을 렌더링하지 않음

    const mappedDepartment = department ? getDepartmentName(department) : '';
    const mappedPosition = position ? getPositionName(position) : '';

    const handleMemberDetailsClick = () => {
        if (memberId) {
            navigate(`/members/${memberId}`);
            handleClose();
        } else {
            console.error("로그인이 되지 않았습니다.");
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
                </div>
            </div>
        </div>
    );
};

export default UserInfoModal;
