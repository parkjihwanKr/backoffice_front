import React from 'react';
import CloseButton from "../button/CloseButton";
import './LogoutModal.css'; // 스타일을 함께 불러옵니다.

const LogoutModal = ({ show, handleClose, handleLogout }) => {
    if (!show) return null; // show가 false면 모달을 렌더링하지 않음

    return (
        <div className="logout-modal-overlay" onClick={handleClose}>
            <div className="logout-modal-content" onClick={(e) => e.stopPropagation()}> {/* 모달 바깥을 클릭하면 닫히도록 */}
                <div className="logout-modal-header">
                    <h2>Logout</h2>
                </div>
                <div className="logout-modal-body">
                    <p>Are you sure you want to log out?</p>
                </div>
                <div className="logout-modal-footer">
                    <button onClick={handleLogout}>Logout</button>
                    <CloseButton handleClose={handleClose}/>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;
