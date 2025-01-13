import axios from 'axios';
import {getCookie} from "./CookieUtil";

// axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: '/api/v1',  // 공통 base URL
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true  // 쿠키 전송을 위해 credentials 포함
});

// 요청 인터셉터: 각 요청마다 Authorization 헤더에 accessToken을 자동으로 추가
axiosInstance.interceptors.request.use(config => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default axiosInstance;
