import {axiosInstance} from '../../../../utils/AxiosUtils';
import {alertError} from "../../../../utils/ErrorUtils"; // axiosInstance 가져오기

// 개인 일정 API 요청
export const getPersonalMonthSchedule = async (memberId, year, month) => {
    try {
        const currentMonth = month + 1;
        const response
            = await axiosInstance.get(
                `/members/${memberId}/events/years/${year}/month/${currentMonth}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            alertError(error);
        } else {
            console.error(year+ "년 "+month+"월 개인 일정 조회 실패 : ", error.message);
        }
        throw error;
    }
};

// 개인 일정 디테일 API 요청
export const getPersonalDaySchedule = async (memberId, year, month, date) => {
    try {
        const currentMonth = month + 1;
        const response
            = await axiosInstance.get(
                `/members/${memberId}/events/years/${year}/months/${currentMonth}/days/${date}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            alertError(error);
        } else {
            console.error(+date+"일 개인 일정  조회 실패 : "+ error.message);
        }
        throw error;
    }
};

// 개인 휴가 일정 생성 API 요청
export const createVacationSchedule = async (vacationData) => {
    try {
        const response
            = await axiosInstance.post(`/vacations`, vacationData);
        return response.data;
    } catch (error) {
        if (error.response) {
            alertError(error);
        } else {
            console.error("휴가 생성 실패 : ", error.message);
        }
        throw error;
    }
};

// 멤버의 휴가 리스트 가져오기
export const getMemberVacationList = async (memberId) => {
    try {
        const response
            = await axiosInstance.get(`/members/${memberId}/vacations`);
        return response.data;
    } catch (error) {
        if (error.response) {
            alertError(error);
        } else {
            console.error("개인 휴가 리스트 조회 실패 : ", error.message);
        }
        throw error;
    }
};

// 휴가 일정 수정 API 요청
export const updateVacationSchedule = async (vacationId, updatedVacationData) => {
    try {
        const response
            = await axiosInstance.patch(`/vacations/${vacationId}`,
            updatedVacationData);
        return response.data;
    } catch (error) {
        if (error.response) {
            alertError(error);
        } else {
            console.error("휴가 수정 실패 : ", error.message);
        }
        throw error;
    }
};

// 휴가 일정 삭제 API 요청
export const deleteVacationSchedule = async (vacationId) => {
    try {
        const response
            = await axiosInstance.delete(`/vacations/${vacationId}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            alertError(error);
        } else {
            console.error("휴가 삭제 실패 : ", error.message);
        }
        throw error;
    }
};

// 휴가 정정 기간 조회 API
export const getUpcomingUpdateVacationPeriod = async () => {
    const response = await axiosInstance(`/vacations/update-period`, {});
    return response.data;
}