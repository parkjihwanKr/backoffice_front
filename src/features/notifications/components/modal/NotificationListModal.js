// src/components/notifications/NotificationListModal.js
import React, { useCallback, useEffect, useRef, useState } from 'react';
import './NotificationListModal.css';
import {
    updateIsReadStatus,
    deleteNotificationList,
    getNotification
} from "../../services/NotificationService";
import { useAuth } from "../../../auth/context/AuthContext";
import CloseImageButton from "../../../../components/ui/image/CloseImageButton";
import { imagePrefix, NOTIFICATION_TYPE_LABELS } from "../../../../utils/Constant";
import { addModalAlignmentListener, adjustModalAlignment } from "../../../../utils/ModalUtils";
import NotificationPaginationFooter from './footer/NotificationPaginationFooter';
import NotificationDetailModal from './NotificationDetailModal';

import useSelectionMode from "../../hooks/useSelectionMode";
import useDropdownMenu from "../../hooks/useDropDownMenu";
import useNotificationFilter from "../../hooks/useNotificationFilter";
import { useNotification } from '../../context/NotificationContext';
import { fetchMemberNotificationList } from "../../services/NotificationService";

const NotificationListModal = ({ show, handleClose }) => {
    const { id, name, department, position } = useAuth();
    const { notificationList, setNotificationList, totalPages } = useNotification();

    const modalOverlayRef = useRef(null);
    const modalContentRef = useRef(null);

    const [selectedNotification, setSelectedNotification] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [activeDropdownId, setActiveDropdownId] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    const { isSelectionMode, toggleSelectionMode, selectedNotifications, handleCheckboxChange, setIsSelectionMode } = useSelectionMode();
    const { isDropdownOpen, toggleDropdown } = useDropdownMenu();

    const loadNotifications = async (page) => {
        try {
            const response = await fetchMemberNotificationList(id, page, 10);
            setNotificationList(response.content);
        } catch (error) {
            console.error("알림 데이터를 가져오는 데 실패했습니다:", error);
        }
    };

    useEffect(() => {
        if (show) {
            loadNotifications(currentPage);
        }
    }, [show, currentPage, id]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const markAllNotificationsAsRead = async () => {
        try {
            await updateIsReadStatus(id);
            setNotificationList(prev => prev.map(n => ({ ...n, isRead: true })));
            console.log("모든 알림이 읽음 상태로 변경되었습니다.");
        } catch (error) {
            console.error("모든 알림 읽음 상태 변경에 실패했습니다:", error);
            alert("모든 알림 읽음 상태 변경에 실패했습니다.");
        }
    };

    const handleDeleteAllNotifications = async () => {
        const allNotificationIds = notificationList.map(n => n.notificationId);
        try {
            await deleteNotificationList(id, allNotificationIds);
            setNotificationList([]);
            setIsSelectionMode(false);
            console.log("전체 알림 삭제 완료");
        } catch (error) {
            console.error("전체 알림 삭제 실패:", error);
            alert("전체 알림 삭제에 실패했습니다.");
        }
    };

    const { filterNotifications } = useNotificationFilter(
        notificationList,
        setNotificationList,
        toggleSelectionMode,
        setIsSelectionMode,
        markAllNotificationsAsRead,
        handleDeleteAllNotifications
    );

    const openDetailModal = useCallback(async (notificationId) => {
        try {
            const notificationData = await getNotification(id, notificationId);
            setSelectedNotification(notificationData);
            setIsDetailModalOpen(true);
        } catch (error) {
            console.error("알림 상세 정보를 가져오는 데 실패했습니다:", error);
            alert("알림 상세 정보를 가져오는 데 실패했습니다.");
        }
    }, [id]);

    const closeDetailModal = () => {
        setSelectedNotification(null);
        setIsDetailModalOpen(false);
    };

    const toggleNotificationDropdown = (notificationId) => {
        setActiveDropdownId((prevId) => (prevId === notificationId ? null : notificationId));
    };

    const markNotificationAsRead = async (notificationId) => {
        await updateIsReadStatus(id, [notificationId]);
        setNotificationList(prev => prev.map(n => n.notificationId === notificationId ? { ...n, isRead: true } : n));
    };

    const deleteNotification = async (notificationId) => {
        try {
            await deleteNotificationList(id, [notificationId]);
            setNotificationList(prev => prev.filter(n => n.notificationId !== notificationId));
            console.log("알림 삭제 완료");
        } catch (error) {
            console.error("알림 삭제에 실패했습니다:", error);
            alert("알림 삭제에 실패했습니다.");
        }
    };

    const deleteSelectedNotifications = async () => {
        try {
            await deleteNotificationList(id, selectedNotifications);
            setNotificationList(prev => prev.filter(n => !selectedNotifications.includes(n.notificationId)));
            setIsSelectionMode(false);
            console.log("선택된 알림 삭제 완료");
        } catch (error) {
            console.error("선택된 알림 삭제 실패:", error);
            alert("선택된 알림 삭제에 실패했습니다.");
        }
    };

    useEffect(() => {
        const modalOverlay = modalOverlayRef.current;
        const modalContent = modalContentRef.current;

        if (modalOverlay && modalContent) {
            adjustModalAlignment(modalOverlay, modalContent);
            const cleanup = addModalAlignmentListener(modalOverlay, modalContent);

            return cleanup;
        }
    }, [show, notificationList.length]);

    if (!show) return null;

    return (
        <div className="notification-modal-overlay" onClick={handleClose} ref={modalOverlayRef}>
            <div className="notification-modal" onClick={(e) => e.stopPropagation()} ref={modalContentRef}>
                <h2><strong>'{name}'</strong>님의 알림</h2>
                <div className="settings-container">
                    <img src={`${imagePrefix}/shared/settings.png`} alt="settings" className="settings" onClick={toggleDropdown} />
                    {isDropdownOpen && (
                        <div className="notification-dropdown-menu">
                            <div onClick={() => filterNotifications('all')}>전체 알림 보기</div>
                            <div onClick={() => filterNotifications('unread')}>읽지 않은 알림 리스트 보기</div>
                            <div onClick={() => filterNotifications('read')}>읽은 알림 리스트 보기</div>
                            <div onClick={() => filterNotifications('markAllRead')}>모든 알림 읽음 표시로 변경</div>
                            {!isSelectionMode && <div onClick={() => filterNotifications('selected-delete')}>선택 삭제</div>}
                            {isSelectionMode && (
                                <>
                                    <div onClick={() => filterNotifications('cancel-selection-delete')}>선택 삭제 취소</div>
                                    <div onClick={deleteSelectedNotifications}>선택된 알림 리스트 삭제</div>
                                </>
                            )}
                        </div>
                    )}
                </div>
                <CloseImageButton handleClose={handleClose} />
                <ul className="notification-list">
                    {notificationList.length > 0 ? (
                        notificationList.map(notification => (
                            <div
                                key={notification.notificationId}
                                className="notification-item-container"
                                onClick={() => openDetailModal(notification.notificationId)}
                            >
                                <div className={`checkbox-container ${isSelectionMode ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
                                    <input
                                        type="checkbox"
                                        checked={selectedNotifications.includes(notification.notificationId)}
                                        onChange={() => handleCheckboxChange(notification.notificationId)}
                                        className="notification-checkbox"
                                    />
                                </div>
                                <div className="notification-row">
                                    <div className="notification-list-left">
                                        <div className="member-info">
                                            <img src={`${imagePrefix}/shared/user_reserve_color.png`} alt="default_image" className="default-image" />
                                            <span>{notification.fromMemberName}</span>
                                        </div>
                                        <div className="arrow-container">
                                            <img src={`${imagePrefix}/shared/right_arrow.png`} alt="arrow" className="arrow-image" />
                                        </div>
                                        <div className="member-info">
                                            <img src={`${imagePrefix}/shared/user_reserve_color.png`} alt="default_image" className="default-image" />
                                            <span>{notification.toMemberName}</span>
                                        </div>
                                    </div>
                                    <div className="notification-list-right">
                                        <div className="is-read-status">
                                            {notification.isRead && (
                                                <img src={`${imagePrefix}/shared/viewCount.png`} alt="읽음" className="read-image" />
                                            )}
                                            <img
                                                src={`${imagePrefix}/shared/notification_settings.png`}
                                                alt="알림 설정"
                                                className="settings-image"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleNotificationDropdown(notification.notificationId);
                                                }}
                                            />
                                            {activeDropdownId === notification.notificationId && (
                                                <div className="notification-options-dropdown">
                                                    {!notification.isRead && (
                                                        <div
                                                            className="option-one"
                                                            onClick={() => markNotificationAsRead(notification.notificationId)}>
                                                            해당 알림 읽음 변경
                                                        </div>
                                                    )}
                                                    <div
                                                        className="option-two"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            openDetailModal(notification.notificationId);
                                                        }}
                                                    >
                                                        해당 알림 상세보기
                                                    </div>
                                                    <div
                                                        className="option-three"
                                                        onClick={() => deleteNotification(notification.notificationId)}>해당
                                                        알림 삭제
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <li className="notification-item">
                                            <strong>알림 유형
                                                : </strong>{NOTIFICATION_TYPE_LABELS[notification.notificationType] || "알 수 없는 알림 유형"}<br/>
                                            <strong>알림 발송일 : </strong>{notification.createdAt} <br/>
                                        </li>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <li className="notification-item">새로운 알림이 없습니다.</li>
                    )}
                </ul>
                <NotificationPaginationFooter
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
                {isDetailModalOpen && (
                    <NotificationDetailModal
                        notification={selectedNotification}
                        onClose={closeDetailModal}
                        deleteNotification={() => deleteNotification(selectedNotification.notificationId)}
                        department={department}
                        position={position}
                    />
                )}
            </div>
        </div>
    );
};

export default NotificationListModal;
