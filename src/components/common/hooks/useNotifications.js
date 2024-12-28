import { useState, useEffect } from "react";
import { useNotification } from "../../../features/notifications/context/NotificationContext";

export const useNotifications = () => {
    const { isNotified, setIsNotified } = useNotification();
    const [showNotificationListModal, setShowNotificationListModal] = useState(false);

    useEffect(() => {
        console.log("알림 상태 업데이트 : ", isNotified);
    }, [isNotified]);

    const handleNotificationClick = () => {
        setShowNotificationListModal(true);
        setIsNotified(false);
    };

    const handleCloseNotificationListModal = () => setShowNotificationListModal(false);

    return {
        isNotified,
        showNotificationListModal,
        handleNotificationClick,
        handleCloseNotificationListModal,
    };
};
