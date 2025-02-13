// src/hooks/useNotificationWebSocket.js
import {useEffect, useRef} from 'react';
import {closeWebSocketConnection, initializeWebSocket} from '../utils/WebSocketUtil';

const useNotificationWebSocket = (setIsNotified, handleNotificationReceived, handleBroadcastNotification) => {
    const isMountedRef = useRef(true);

    useEffect(() => {
        initializeWebSocket(
            (notification) => {

                setIsNotified(true);  // 알림 상태 업데이트
                handleNotificationReceived(notification);  // 새 알림을 리스트에 추가
            },
            (broadcastNotification) => {
                handleBroadcastNotification(broadcastNotification); // 브로드캐스트 알림 처리
            }
        );

        return () => {
            if (isMountedRef.current) {
                closeWebSocketConnection();
                isMountedRef.current = false;
            }
        };
    }, [setIsNotified, handleNotificationReceived, handleBroadcastNotification]);
};

export default useNotificationWebSocket;
