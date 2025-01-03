import { useCallback, useState, useEffect } from 'react';

const useNotificationFilter = (
    initialNotifications,
    setNotifications,
    toggleSelectionMode,
    setIsSelectionMode,
    markAllNotificationsAsRead,
    handleDeleteAllNotifications
) => {
    const [originalNotifications, setOriginalNotifications] = useState([]);

    useEffect(() => {
        // initialNotifications가 변경될 때 originalNotifications 갱신
        setOriginalNotifications(initialNotifications);
        console.log("Updated originalNotifications:", initialNotifications);
    }, [initialNotifications]);

    const filterNotifications = useCallback(
        async (type) => {
            switch (type) {
                case 'all':
                    setNotifications(originalNotifications); // 모든 알림 리스트 표시
                    break;
                case 'unread':
                    setNotifications(originalNotifications.filter((n) => !n.isRead));
                    break;
                case 'read':
                    setNotifications(originalNotifications.filter((n) => n.isRead));
                    break;
                case 'selected-delete':
                    toggleSelectionMode();
                    break;
                case 'cancel-selection-delete':
                    setIsSelectionMode(false);
                    break;
                case 'markAllRead':
                    await markAllNotificationsAsRead();

                    setOriginalNotifications((prev) =>
                        prev.map((notification) => ({ ...notification, isRead: true }))
                    );
                    setNotifications((prev) =>
                        prev.map((notification) => ({ ...notification, isRead: true }))
                    );

                    break;
                case 'page-delete':
                    handleDeleteAllNotifications();
                    break;
                default:
                    break;
            }
        },
        [
            originalNotifications,
            setNotifications,
            toggleSelectionMode,
            setIsSelectionMode,
            markAllNotificationsAsRead,
            handleDeleteAllNotifications,
        ]
    );

    return { filterNotifications };
};

export default useNotificationFilter;
