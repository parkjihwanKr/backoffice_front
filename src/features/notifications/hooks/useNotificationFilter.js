import { useCallback, useState } from 'react';

const useNotificationFilter = (initialNotifications, setNotifications, toggleSelectionMode, setIsSelectionMode, markAllNotificationsAsRead, handleDeleteAllNotifications) => {
    // 원본 알림 리스트 유지
    const [originalNotifications] = useState(initialNotifications);

    const filterNotifications = useCallback(async (type) => {
        switch (type) {
            case 'all':
                setNotifications(originalNotifications);
                break;
            case 'unread':
                setNotifications(originalNotifications.filter(n => !n.isRead));
                break;
            case 'read':
                setNotifications(originalNotifications.filter(n => n.isRead));
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
    }, [originalNotifications, setNotifications, toggleSelectionMode, setIsSelectionMode, markAllNotificationsAsRead, handleDeleteAllNotifications]);

    return { filterNotifications };
};

export default useNotificationFilter;
