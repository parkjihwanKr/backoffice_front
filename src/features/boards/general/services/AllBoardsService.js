import axiosInstance from "../../../../utils/AxiosUtils";

export const fetchAllBoards = async () => {
    try {
        const response = await axiosInstance.get(`/boards`); // axiosInstance를 통해 GET 요청
        console.log(response.data.content);
        return response.data.content || []; // 데이터 반환
    } catch (error) {
        console.error('Error fetching boards:', error.message);
        throw error; // 에러를 호출자에게 전달
    }
};
