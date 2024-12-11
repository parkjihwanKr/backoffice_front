// NotificationDetailModal.js
import React from 'react';
import '../../../../components/ui/modal/Modal.css';
import './NotificationDetailModal.css';
import CloseImageButton from "../../../../components/ui/image/CloseImageButton";
import { imagePrefix, NOTIFICATION_TYPE_LABELS } from "../../../../utils/Constant";

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
                    <h3>알림 상세 정보</h3>
                    <CloseImageButton handleClose={onClose} />
                </div>
                <div className="custom-modal-body">
                    <div className="notification-detail-view-box">
                        <p>
                            <strong>발신자 :</strong> {notification.fromMemberName} ({notification.fromMemberDepartment}, {notification.fromMemberPosition})
                        </p>
                        <p><strong>수신자 :</strong> {notification.toMemberName} ({department}, {position})</p>
                        <p><strong>발송일 :</strong> {notification.createdAt}</p>
                        <div className="notification-detail-modal-row">
                            <div className="notification-detail-modal-body-left">
                                <strong>유형 : </strong>
                                {NOTIFICATION_TYPE_LABELS[notification.notificationType] || "알 수 없는 알림 유형"}
                            </div>
                            <div className="notification-detail-modal-body-right">
                                <strong>읽음 : </strong>
                                <img
                                    src={
                                        notification.isRead
                                            ? `${imagePrefix}/shared/viewCount.png` // 읽음일 때 이미지
                                            : `${imagePrefix}/shared/is_read_false_notification.png` // 읽지 않음일 때 이미지
                                    }
                                    alt={notification.isRead ? "읽음" : "읽지 않음"}
                                    className="read-image"
                                />
                            </div>
                        </div>
                        <div className="notification-detail-message">
                            <div className="notification-detail-message-header">
                                <strong>설명 : </strong>
                            </div>
                            <div className="notification-detail-message-body">
                                {notification.message}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="notification-detail-modal-footer">
                    <button
                        className="delete-notification-detail"
                        onClick={handleDelete}>
                        알림 삭제
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotificationDetailModal;
