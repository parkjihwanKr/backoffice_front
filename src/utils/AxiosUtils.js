import axios from 'axios';
import {deleteCookie, getCookie, setCookie} from "./CookieUtil";

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
    console.log(error);
    return Promise.reject(error);
});

// 응답 인터셉터: AccessToken 만료 시 처리
axiosInstance.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;

        // /refresh-token 요청은 다시 시도하지 않음
        if (originalRequest.url === '/refresh-token') {
            return Promise.reject(error);
        }

        // AccessToken 만료 시 처리
        if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = getCookie('refreshToken');
                if (!refreshToken) {
                    throw new Error("Refresh token is missing");
                }

                // Refresh Token으로 Access Token 갱신 요청
                const refreshResponse = await axiosInstance.post('/refresh-token', null, {
                    headers: {
                        'refreshToken': `Bearer ${refreshToken}`,
                        'Content-Type': 'application/json', },
                    withCredentials: true,
                });

                const { accessToken } = refreshResponse.data;
                setCookie('accessToken', accessToken);

                // 갱신된 Access Token으로 Authorization 헤더 업데이트
                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

                // 원래 요청 재시도
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error('Failed to refresh token:', refreshError);
                deleteCookie('accessToken');
                deleteCookie('refreshToken');
                localStorage.clear();
                // window.location.href = '/auth/login';  // 필요 시 로그인 페이지로 이동
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
