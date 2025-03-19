import axios from 'axios';
import {deleteCookie} from "./CookieUtil";
import {alertError} from "./ErrorUtils";

// 공통 baseURL 설정
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

// axios
export const axiosUnAuthenticated = axios.create({
    baseURL: apiBaseUrl,
    headers : {
        'Content-Type' : 'application/json',
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
    return config;
}, error => {
    return Promise.reject(error);
});

// 응답 인터셉터: 403 처리
axiosInstance.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response) {
        if(error.response.status === 401){
            deleteCookie("accessToken");
            deleteCookie("refreshToken");
        }
        if (error.response.status === 403) {
            console.warn("403 Forbidden: 인증되지 않은 요청입니다.");
            if(error.response.data.errorCode === "JWT-008"){
                alertError(error.response.data.message);
                deleteCookie("accessToken");
                deleteCookie("refreshToken");
            }
            console.log(error);
        }
    }
    return Promise.reject(error);
});
