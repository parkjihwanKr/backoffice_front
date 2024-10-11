import axiosInstance from '../../../../utils/AxiosUtils'; // axiosInstance 가져오기

// 개인 일정 API 요청
export const getPersonalMonthSchedule = async (memberId, year, month) => {
    try {
        const currentMonth = month + 1;
        const response = await axiosInstance.get(`/members/${memberId}/events/years/${year}/month/${currentMonth}`);
        console.log("Response data: ", response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error code: " + error.response.data.data + " : " + error.response.data.message);
            alert(error.response.data.data + " : " + error.response.data.message);
        } else {
            console.error("Error fetching personal schedule:", error.message);
        }
        throw error;
    }
};

// 개인 일정 디테일 API 요청
export const getPersonalDaySchedule = async (memberId, year, month, date) => {
    try {
        const currentMonth = month + 1;
        const response = await axiosInstance.get(`/members/${memberId}/events/years/${year}/months/${currentMonth}/days/${date}`);
        console.log("Response data: ", response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error code: " + error.response.data.data + " : " + error.response.data.message);
            alert(error.response.data.data + " : " + error.response.data.message);
        } else {
            console.error("Error fetching personal schedule:", error.message);
        }
        throw error;
    }
};

// 개인 휴가 일정 생성 API 요청
export const createVacationSchedule = async (vacationData) => {
    try {
        const response = await axiosInstance.post(`/vacations`, vacationData);
        console.log("Response data: ", response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error code: " + error.response.data.data + " : " + error.response.data.message);
            alert(error.response.data.data + " : " + error.response.data.message);
        } else {
            console.error("Error creating vacation schedule:", error.message);
        }
        throw error;
    }
};

// 멤버의 휴가 리스트 가져오기
export const getMemberVacationList = async (memberId) => {
    try {
        const response = await axiosInstance.get(`/members/${memberId}/vacations`);
        console.log("Response data: ", response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error code: " + error.response.data.data + " : " + error.response.data.message);
            alert(error.response.data.data + " : " + error.response.data.message);
        } else {
            console.error("Error fetching vacation list:", error.message);
        }
        throw error;
    }
};

// 휴가 일정 수정 API 요청
export const updateVacationSchedule = async (vacationId, updatedVacationData) => {
    try {
        const response = await axiosInstance.patch(`/vacations/${vacationId}`, updatedVacationData);
        console.log("Response data: ", response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error code: " + error.response.data.data + " : " + error.response.data.message);
            alert(error.response.data.data + " : " + error.response.data.message);
        } else {
            console.error("Error updating vacation schedule:", error.message);
        }
        throw error;
    }
};

// 휴가 일정 삭제 API 요청
export const deleteVacationSchedule = async (vacationId) => {
    try {
        const response = await axiosInstance.delete(`/vacations/${vacationId}`);
        console.log("Response data: ", response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error code: " + error.response.data.data + " : " + error.response.data.message);
            alert(error.response.data.data + " : " + error.response.data.message);
        } else {
            console.error("Error deleting vacation schedule:", error.message);
        }
        throw error;
    }
};
