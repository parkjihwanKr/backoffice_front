// src/features/notifications/context/NotificationContext.js
import React, { createContext, useContext, useState } from "react";
import useNotificationWebSocket from "../../../hooks/useNotificationWebSocket";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [isNotified, setIsNotified] = useState(false);
    const [notificationList, setNotificationList] = useState([]);

    // 새 알림을 받으면 리스트에 추가하는 핸들러
    const handleNotificationReceived = (newNotification) => {
        setIsNotified(true); // 알림 아이콘을 업데이트
        setNotificationList((prevList) => [newNotification, ...prevList]); // 새 알림 추가
    };

    const handleBroadcastNotification = (broadcastNotification) => {
        setNotificationList((prevList) => [broadcastNotification, ...prevList]);
        setIsNotified(true);
    };

    // WebSocket 훅 사용
    useNotificationWebSocket(setIsNotified, handleNotificationReceived, handleBroadcastNotification);

    return (
        <NotificationContext.Provider value={{ isNotified, setIsNotified, notificationList, setNotificationList }}>
            {children}
        </NotificationContext.Provider>
    );
};
