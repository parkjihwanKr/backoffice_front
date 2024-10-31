import React, { useEffect, useState, useRef } from 'react';
import './NotificationListModal.css';
import { fetchMemberNotificationList } from "../../../features/notifications/services/NotificationService";
import { useAuth } from "../../../features/auth/components/AuthContext";
import CloseImageButton from "../image/CloseImageButton";
import { adjustModalAlignment, addModalAlignmentListener } from "../../../utils/ModalUtils";

const NotificationListModal = ({ show, handleClose }) => {
    const [notifications, setNotifications] = useState([]);
    const { id, name } = useAuth();
    const modalOverlayRef = useRef(null);
    const modalContentRef = useRef(null);

    useEffect(() => {
        if (show && id) {
            const fetchNotifications = async () => {
                try {
                    const response = await fetchMemberNotificationList(id);
                    setNotifications(response);
                    console.log(response);
                } catch (error) {
                    console.log("Fetch error:", error);
                }
            };
            fetchNotifications();
        }
    }, [show, id]);

    // 모달 정렬 조정 함수 사용 및 이벤트 리스너 추가
    useEffect(() => {
        if (show && modalOverlayRef.current && modalContentRef.current) {
            adjustModalAlignment(modalOverlayRef.current, modalContentRef.current);
            const removeListener = addModalAlignmentListener(modalOverlayRef.current, modalContentRef.current);
            return () => removeListener();  // 컴포넌트 언마운트 시 리스너 제거
        }
    }, [show]);

    if (!show) return null;

    return (
        <div
            className="notification-modal-overlay"
            onClick={handleClose}
            ref={modalOverlayRef}
        >
            <div
                className="notification-modal"
                onClick={(e) => e.stopPropagation()}
                ref={modalContentRef}
            >
                <h2>'{name}'님의 알림</h2>
                <CloseImageButton handleClose={handleClose} />
                <ul className="notification-list">
                    {notifications.length > 0 ? (
                        notifications.map((notification, index) => (
                            <li key={index} className="notification-item">
                                {notification.message} - {notification.date} <br />
                                읽었니? : {notification.isRead ? "예" : "아니오"}
                            </li>
                        ))
                    ) : (
                        <li className="notification-item">새로운 알림이 없습니다.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default NotificationListModal;
