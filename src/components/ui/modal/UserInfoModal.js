import React from 'react';
import CloseButton from "../button/CloseButton";
import './UserInfoModal.css'; // 스타일을 함께 불러옵니다.

const UserInfoModal = ({ show, handleClose, name, department, position }) => {
    if (!show) return null; // show가 false면 모달을 렌더링하지 않음

    return (
        <div className="user-info-modal-overlay" onClick={handleClose}>
            <div className="user-info-modal-content" onClick={(e) => e.stopPropagation()}> {/* 모달 바깥을 클릭하면 닫히도록 */}
                <div className="user-info-modal-header">
                    <h2>User Information</h2>
                </div>
                <div className="user-info-modal-body">
                    <p>{name ? `${name}님 안녕하세요!` : '비로그인 상태입니다.'}</p>
                    <p>{position && department ? `Role : ${department}, ${position}` : ''}</p>
                </div>
                <div className="user-info-modal-footer">
                    <CloseButton handleClose={handleClose}/>
                </div>
            </div>
        </div>
    );
};

export default UserInfoModal;
