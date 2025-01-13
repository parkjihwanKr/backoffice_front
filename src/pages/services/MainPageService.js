import axiosInstance from "../../utils/AxiosUtils";

// 메인 페이지 조회
export const fetchMainPage = async () => {
    const response = await axiosInstance.get(`/main-page`);
    return response.data;
}