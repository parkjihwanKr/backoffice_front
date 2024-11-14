// src/hooks/useNotificationFilter.js
import { useCallback } from 'react';

const useNotificationFilter = (notifications, setNotifications, toggleSelectionMode, setIsSelectionMode, markAllNotificationsAsRead, handleDeleteAllNotifications) => {
    const filterNotifications = useCallback(async (type) => {
        switch (type) {
            case 'all':
                setNotifications(notifications);
                break;
            case 'unread':
                setNotifications(notifications.filter(n => !n.isRead));
                break;
            case 'read':
                setNotifications(notifications.filter(n => n.isRead));
                break;
            case 'selected-delete':
                toggleSelectionMode();
                break;
            case 'cancel-selection-delete':
                setIsSelectionMode(false);
                break;
            case 'markAllRead':
                await markAllNotificationsAsRead();
                break;
            case 'page-delete':
                handleDeleteAllNotifications();
                break;
            default:
                break;
        }
    }, [notifications, setNotifications, toggleSelectionMode, setIsSelectionMode, markAllNotificationsAsRead, handleDeleteAllNotifications]);

    return { filterNotifications };
};

export default useNotificationFilter;
