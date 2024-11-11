// NotificationManagementBody.js
import React, { useState } from 'react';
import CreateNotificationModal from './CreateNotificationModal';
import './NotificationManagementBody.css';

const NotificationManagementBody = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [message, setMessage] = useState("");
    const [onSubmit, setOnSubmit] = useState(() => () => {});

    const handleOpenAllModal = () => {
        setModalTitle("전체 알림 발송");
        setOnSubmit(() => (msg) => alert(`전체 사용자에게 알림: ${msg}`));
        setIsModalOpen(true);
    };

    const handleOpenSpecificModal = () => {
        setModalTitle("특정 인원 알림 발송");
        setOnSubmit(() => (msg) => alert(`특정 사용자에게 알림: ${msg}`));
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setMessage(""); // 메시지 초기화
    };

    return (
        <div className="notification-management-body">
            <button
                className="notification-management-body-all-submit-button"
                onClick={handleOpenAllModal}
            >
                전체 알림 발송
            </button>
            <button
                className="notification-management-body-submit-button"
                onClick={handleOpenSpecificModal}
            >
                특정 인원 알림 발송
            </button>

            {isModalOpen && (
                <CreateNotificationModal
                    title={modalTitle}
                    message={message}
                    setMessage={setMessage}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSubmit={onSubmit}
                />
            )}
        </div>
    );
};

export default NotificationManagementBody;
