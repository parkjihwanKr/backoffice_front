// hooks/useFetchNotifications.js
import { useEffect, useState } from 'react';
import { fetchMemberNotificationList } from "../services/NotificationService";

const useFetchNotifications = (memberId, currentPage) => {
    const [notifications, setNotifications] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetchMemberNotificationList(memberId, currentPage, 10);
                setNotifications(response.content);
                setTotalPages(response.totalPages);
            } catch (error) {
                console.error("알림 조회 오류:", error);
            }
        };

        if (memberId) fetchNotifications();
    }, [memberId, currentPage]);

    return { notifications, totalPages, setNotifications };
};

export default useFetchNotifications;
