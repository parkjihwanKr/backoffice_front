import axiosInstance from "../../../../utils/AxiosUtils";

export const fetchFilteredVacations = async (year, month, isAccepted, urgent, department) => {
    const response = await axiosInstance.get(`/vacations/years/${year}/months/${month}/filtered`, {
        params: {
            isAccepted: isAccepted !== undefined ? isAccepted : null, // 값이 undefined이면 null로 처리
            urgent: urgent !== undefined ? urgent : null,
            department: department !== undefined && department !== 'all' ? department : null,
        }
    });

    console.log("Response data : ", response.data);
    return response.data;
};

export const updateVacationIsAccepted = async (vacationId) => {
    try {
        const response = await axiosInstance.patch(`/admin/vacations/${vacationId}`);
        return response.data;
    } catch (error) {
        console.error('휴가 승인/미승인 요청 중 오류 발생:', error);
        throw error;
    }
};

export const deleteVacation = async (vacationId, reason) => {
    try {
        // Body에 삭제 사유를 포함하여 DELETE 요청
        const response = await axiosInstance.delete(`/admin/vacations/${vacationId}`, {
            data: { reason }  // axios에서 body 데이터를 `data`로 전달
        });
        return response.data;
    } catch (error) {
        console.error('휴가 삭제 요청 중 오류 발생:', error);
        throw error;
    }
};