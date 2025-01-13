import { useState, useEffect } from "react";
import { useNotification } from "../../../features/notifications/context/NotificationContext";

export const useNotifications = () => {
    const { isNotified, setIsNotified } = useNotification();
    const [showNotificationListModal, setShowNotificationListModal] = useState(false);

    useEffect(() => {

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
