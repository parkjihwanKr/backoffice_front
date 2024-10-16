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

export const deleteVacation = async (vacationId) => {

}