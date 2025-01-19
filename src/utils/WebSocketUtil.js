// WebSocketUtil.js
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient = null;
const websocketUrl = process.env.REACT_APP_WEBSOCKET_URL;

export const initializeWebSocket = (accessToken, onMessageReceived, onBroadcastReceived) => {
    if (stompClient && stompClient.connected) {
        console.log("WebSocket is already connected");
        return;
    }

    const socket = new SockJS(websocketUrl);
    stompClient = new Client({
        webSocketFactory: () => socket,
        connectHeaders: { Authorization: `Bearer ${accessToken}` },
        // debug: (str) => console.log('STOMP: ' + str),
        reconnectDelay: 5000
    });

    // 수신 성공 로직
    stompClient.onConnect = () => {
        console.log("Connected to WebSocket");

        try {
            // 개인 알림 구독
            stompClient.subscribe("/user/queue/notifications", (message) => {
                console.log("Private message received from /user/queue/notifications: ", message);
                const notification = JSON.parse(message.body);
                onMessageReceived(notification);
            });
            console.log("Subscribed to /user/queue/notifications");

            // 전체 알림 구독
            stompClient.subscribe("/topic/notifications", (message) => {
                console.log("Broadcast message received from /topic/notifications: ", message);
                const notification = JSON.parse(message.body);
                onBroadcastReceived(notification);
            });
            console.log("Subscribed to /topic/notifications");

        } catch (error) {
            console.error("Subscription error:", error);
        }
    };

    stompClient.activate();

    stompClient.onStompError = (frame) => {
        console.error("Broker reported error:", frame.headers['message']);
        console.error("Additional details:", frame.body);
    };

    stompClient.onWebSocketError = (error) => {
        console.error("WebSocket error:", error);
    };

    stompClient.onWebSocketClose = (event) => {
        console.warn("WebSocket connection closed:", event);
    };
};

// 전체 알림 전송 (브로드캐스트)
export const sendWebSocketBroadcastMessage = (destination, payload, accessToken) => {
    // 예상 시나리오 : `/topic/notifications`
    console.log("Broadcast notification destination: " + destination);
    return new Promise((resolve, reject) => {
        if (stompClient && stompClient.connected) {
            console.log("Sending broadcast message to destination: ", destination, "with payload: ", payload);
            stompClient.publish({
                destination,
                body: JSON.stringify(payload),
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            resolve();
        } else {
            console.error("Failed to send broadcast message: WebSocket is not connected");
            reject(new Error("WebSocket is not connected"));
        }
    });
};

// 개인 알림 전송
export const sendWebSocketMessage = (destination, payload, accessToken) => {
    // 예상 시나리오 : `/user/queue/notifications`
    console.log("Private notification destination: " + destination);
    return new Promise((resolve, reject) => {
        if (stompClient && stompClient.connected) {
            console.log("Sending private message to destination: ", destination, "with payload: ", payload);
            stompClient.publish({
                destination,
                body: JSON.stringify(payload),
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            resolve();
        } else {
            console.error("Failed to send private message: WebSocket is not connected");
            reject(new Error("WebSocket is not connected"));
        }
    });
};

export const closeWebSocketConnection = () => {
    if (stompClient) {
        console.log("Deactivating WebSocket connection");
        stompClient.deactivate();
        stompClient = null;
    }
};
