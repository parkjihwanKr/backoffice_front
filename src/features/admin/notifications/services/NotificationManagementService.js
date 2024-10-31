import axiosInstance from '../../../../utils/AxiosUtils'; // axiosInstance 가져오기
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { WS_BASE_URL } from "../../../../utils/Constant";

// API 요청 함수 - axiosInstance 사용
export const sendNotificationRequest = async (memberId, payload) => {
    try {
        const response = await axiosInstance.post(
            `/members/${memberId}/notifications`, // baseURL이 `/api/v1`로 설정된 상태
            payload
        );
        return response.data;
    } catch (error) {
        console.error('Failed to send notification request:', error);
        throw error;
    }
};

// WebSocket 연결 및 실시간 알림 수신 함수
export const connectToNotificationSocket = (memberId, onMessageReceived) => {
    const socket = new SockJS(WS_BASE_URL);
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
        stompClient.subscribe(`/user/${memberId}/queue/notifications`, (message) => {
            onMessageReceived(JSON.parse(message.body));
        });
    });

    return stompClient;
};

// 서버 알림 리스트 가져오기
export const fetchNotificationList = async () => {
    try {
        const response
            = await axiosInstance.get('/notification', {
        });
        console.log(response.data.content);
        return { data: response.data.content, totalPages: response.data.totalPages };
    } catch (err) {
        console.error('Error fetching audit logs:', err);
        throw err;
    }
};