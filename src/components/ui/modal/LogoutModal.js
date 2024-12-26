import React from 'react';
import CloseImageButton from "../image/CloseImageButton";
import ConfirmButton from "../buttons/ConfirmButton";
import useModalScroll from "../../../features/boards/shared/hooks/useModalScroll"; // 스타일을 함께 불러옵니다.

const LogoutModal = ({ show, handleClose, handleLogout }) => {
    useModalScroll(show);

    if (!show) return null; // show가 false면 모달을 렌더링하지 않음

    return (
        <div className="custom-modal-overlay" onClick={handleClose}>
            <div className="custom-modal-content"
                 onClick={(e) => e.stopPropagation()}> {/* 모달 바깥을 클릭하면 닫히도록 */}
                <div className="custom-modal-header">
                    <h3>로그 아웃</h3>
                    <CloseImageButton handleClose={handleClose}/>
                </div>
                <div className="custom-modal-body">
                    <p>
                        정말로 로그아웃 하시겠습니까?
                    </p>
                </div>
                <div className="custom-modal-footer">
                    <ConfirmButton onClick={handleLogout} text={"확인"} />
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;
