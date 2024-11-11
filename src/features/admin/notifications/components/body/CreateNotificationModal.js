import React, { useState } from 'react';
import { getCookie } from "../../../../../utils/CookieUtil";
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
import './CreateNotificationModal.css';
import {sendWebSocketBroadcastMessage, sendWebSocketMessage} from "../../../../../utils/WebSocketUtil";

const CreateNotificationModal = ({ title, isOpen, onClose, onSubmit }) => {
    const [message, setMessage] = useState("");
    const accessToken = getCookie('accessToken');

    // 관리자 전용 단체 메세지 전송 핸들러
    const handleSend = () => {
        const payload = { message };  // 보낼 메시지 페이로드

        sendWebSocketBroadcastMessage("/app/admins/notifications", payload, accessToken) // WebSocketUtil로 메시지 전송
            .then(() => {
                onSubmit(message); // 전송 후 콜백 호출
                setMessage(""); // 메시지 필드 초기화
            })
            .catch(() => console.error("Failed to send message"));
    };

    if (!isOpen) return null;

    return (
        <div className="create-notification-modal-overlay">
            <div className="create-notification-modal-content">
                <div className="create-notification-modal-header">
                    <h2>{title}</h2>
                    <CloseImageButton handleClose={onClose} />
                </div>
                <textarea
                    placeholder="알림 내용을 입력하세요"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <div className="create-notification-modal-buttons">
                    <button
                        onClick={handleSend}
                        className="notification-submit-button">
                        발송
                    </button>
                </div>
            </div>
        </div>

    );
};

export default CreateNotificationModal;
