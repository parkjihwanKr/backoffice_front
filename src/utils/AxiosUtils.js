import axios from 'axios';
import {getCookie} from "./CookieUtil";

// 공통 baseURL 설정
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

// axios
export const axiosUnAuthenticated = axios.create({
    baseURL: apiBaseUrl,
    headers : {
        'Content-Type' : 'application/json,'
    },
})

// axios 인스턴스 생성
export const axiosInstance = axios.create({
    baseURL: apiBaseUrl,  // 공통 base URL
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true  // 쿠키 전송을 위해 credentials 포함
});

// 요청 인터셉터: 각 요청마다 Authorization 헤더에 accessToken을 자동으로 추가
axiosInstance.interceptors.request.use(config => {
    const accessToken = getCookie('accessToken');
    console.log("my server base url settings ... : "+apiBaseUrl);
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});
