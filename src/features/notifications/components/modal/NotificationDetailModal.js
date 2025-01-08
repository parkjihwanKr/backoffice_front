// NotificationDetailModal.js
import React from 'react';
import '../../../../components/ui/modal/Modal.css';
import './NotificationDetailModal.css';
import CloseImageButton from "../../../../components/ui/image/CloseImageButton";
import {getAttendanceStatus, imagePrefix, NOTIFICATION_TYPE_LABELS} from "../../../../utils/Constant";
import ConfirmButton from "../../../../components/ui/buttons/ConfirmButton";

const NotificationDetailModal = ({ notification, onClose, deleteNotification, department, position }) => {

    if (!notification) return null;

    const handleDelete = async () => {
        try {
            await deleteNotification(); // 삭제 완료까지 대기
            onClose(); // 삭제 완료 후에 모달 닫기
        } catch (error) {
            console.error("알림 삭제 중 오류가 발생했습니다:", error);
        }
    };

    return (
        <div className="custom-modal-overlay" onClick={onClose}>
            <div className="custom-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="custom-modal-header">
                    <img
                        src={
                            notification.isRead
                                ? `${imagePrefix}/shared/viewCount.png` // 읽음일 때 이미지
                                : `${imagePrefix}/shared/is_read_false_notification.png` // 읽지 않음일 때 이미지
                        }
                        alt={notification.isRead ? "읽음" : "읽지 않음"}
                        className="read-image"
                        style={{ position : "absolute", left : "5%", top : "3%", height : "24px", width : "24px"}}
                    />
                    <h3>알림 상세 정보</h3>
                    <CloseImageButton handleClose={onClose}/>
                </div>
                <div className="custom-modal-body">
                    <div className="custom-modal-body-row">
                        <div className="custom-modal-body-column">
                            <img src={`${imagePrefix}/shared/user_info.png`} alt="before-status"/>
                            <div className="custom-modal-body-column-user-info">
                                {notification.fromMemberName} <br/>
                                ({notification.fromMemberDepartment}, {notification.fromMemberPosition})
                            </div>
                        </div>
                        <div className="custom-modal-body-arrow">
                            <img
                                src={`${imagePrefix}/shared/right_arrow.png`}
                                alt="arrow"
                                className="custom-arrow-container"
                            />
                        </div>
                        <div className="custom-modal-body-column">
                            <img src={`${imagePrefix}/shared/user_info.png`} alt="after-status"/>
                            <div className="custom-modal-body-column-user-info">
                                {notification.toMemberName} <br/> ({department}, {position})
                            </div>
                        </div>
                    </div>
                    <div className="divider"></div>
                        <label className="custom-modal-body-content-label">
                            <strong>설명 :</strong>
                        </label>
                        <div className="custom-modal-body-description">
                            {notification.message}
                        </div>
                    </div>
                <div className="notification-detail-modal-footer">
                    <ConfirmButton onClick={handleDelete} text={"삭제"}/>
                </div>
            </div>
        </div>
    );
};

export default NotificationDetailModal;
