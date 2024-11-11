// src/hooks/useNotificationWebSocket.js
import {useEffect, useRef} from 'react';
import { initializeWebSocket, closeWebSocketConnection } from '../utils/WebSocketUtil';
import { getCookie } from '../utils/CookieUtil';

const useNotificationWebSocket = (setIsNotified, handleNotificationReceived, handleBroadcastNotification) => {
    const accessToken = getCookie('accessToken');
    const isMountedRef = useRef(true);

    useEffect(() => {
        initializeWebSocket(
            accessToken,
            (notification) => {
                console.log("Received notification from WebSocket:", notification);
                setIsNotified(true);  // 알림 상태 업데이트
                handleNotificationReceived(notification);  // 새 알림을 리스트에 추가
            },
            (broadcastNotification) => {
                console.log("Received broadcast from WebSocket:", broadcastNotification);
                handleBroadcastNotification(broadcastNotification); // 브로드캐스트 알림 처리
            }
        );

        return () => {
            if (isMountedRef.current) {
                closeWebSocketConnection();
                isMountedRef.current = false;
            }
        };
    }, [accessToken, setIsNotified, handleNotificationReceived, handleBroadcastNotification]);
};

export default useNotificationWebSocket;
