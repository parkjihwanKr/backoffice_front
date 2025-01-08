import axiosInstance from "../../../utils/AxiosUtils";

export const fetchMemberNotificationList = async (memberId, currentPage, pageSize) => {
    const response = await axiosInstance.get(`/members/${memberId}/notifications`, {
        params: {
            page: currentPage,   // 쿼리 파라미터로 currentPage 추가
            size: pageSize       // 쿼리 파라미터로 pageSize 추가
        }
    });

    console.log("response.data 전체:", JSON.stringify(response.data));
    return response.data; // 전체 페이지 정보 반환
};

export const updateIsReadStatus = async (memberId) => {
    const response
        = await axiosInstance.post(`/members/${memberId}/notifications/change-is-read-true`, {
    });

    console.log("response.data.data : "+response.data.data);
    return response.data.data;
}

export const deleteNotificationList = async (memberId, selectedNotificationIdList) => {
    const response = await axiosInstance.delete(`/members/${memberId}/notifications`, {
        data: { notificationIds: selectedNotificationIdList }
    });

    console.log("response.data.data:", response.data.data);
    return response.data.data;
};

export const getNotification = async (memberId, selectedNotificationId) => {
    const response
        = await axiosInstance.get(
            `/members/${memberId}/notifications/${selectedNotificationId}`, {
        });
    console.log("response.data:", response.data.data);
    return response.data.data;
}