import { useState, useCallback } from "react";
import {
    updateIsReadStatus,
    deleteNotificationList,
    getNotification,
    fetchMemberNotificationList,
} from "../services/NotificationService";

const useNotificationListModal = (id, setNotificationList) => {
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const loadNotifications = async (page) => {
        try {
            const response = await fetchMemberNotificationList(id, page, 10);
            setNotificationList(response.content);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error("알림 데이터를 가져오는 데 실패했습니다:", error);
        }
    };

    const markAllNotificationsAsRead = async () => {
        try {
            await updateIsReadStatus(id);
            setNotificationList((prev) =>
                prev.map((notification) => ({ ...notification, isRead: true }))
            );
        } catch (error) {
            console.error("모든 알림 읽음 상태 변경에 실패했습니다:", error);
        }
    };

    const deleteAllNotifications = async (notificationList) => {
        const allNotificationIds = notificationList.map((n) => n.notificationId);
        try {
            await deleteNotificationList(id, allNotificationIds);
            setNotificationList([]);
        } catch (error) {
            console.error("전체 알림 삭제 실패:", error);
        }
    };

    const openDetailModal = useCallback(async (notificationId) => {
        try {
            const notificationData = await getNotification(id, notificationId);
            setSelectedNotification(notificationData);
            setIsDetailModalOpen(true);
        } catch (error) {
            console.error("알림 상세 정보를 가져오는 데 실패했습니다:", error);
        }
    }, [id]);

    const closeDetailModal = () => {
        setSelectedNotification(null);
        setIsDetailModalOpen(false);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return {
        selectedNotification,
        isDetailModalOpen,
        currentPage,
        totalPages,
        loadNotifications,
        markAllNotificationsAsRead,
        deleteAllNotifications,
        openDetailModal,
        closeDetailModal,
        handlePageChange,
    };
};

export default useNotificationListModal;
