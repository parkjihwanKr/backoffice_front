import axiosInstance from "../../../../utils/AxiosUtils";
import {alertError} from "../../../../utils/ErrorUtils";

// 월별 근태 기록 조회 (필터링 가능)
export const fetchMemberAttendanceList
    = async (department, year, month, page) => {
    try {
        const params = {
            department, year, month, page};
        const response
            = await axiosInstance.get("/admin/attendances/monthly", {params,});
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// 해당 일의 근태 기록 조회
export const fetchDailyMemberAttendance
    = async ({department, memberName, year, month, day, page, size}) => {
    try {
        const params = {
            department, memberName, year, month, day, page, size};
        const response
            = await axiosInstance.get("/admin/attendances/daily", {params,});
        return response.data;
    } catch (error) {
        alertError(error);
        throw error;
    }
};

// 근태 기록 수동 삭제
export const deleteAttendanceManually = async (attendanceIdList) => {
    const response = await axiosInstance.delete(`/attendances`, {
        data: attendanceIdList,
    });
    return response.data;
};

// 근태 당일 기록 생성
export const createAttendance = async (data) => {
    try {
        const response
            = await axiosInstance.post(`/attendances`, data);
        return response.data;
    } catch (error) {
        console.error("Error creating attendance manually:", error);
        throw error;
    }
};

// 관리자가 특정 멤버의 근태 상태 변경
export const updateAttendanceStatusForAdmin = async ( memberId, attendanceId, attendanceStatus, description ) => {
    const response = await axiosInstance.patch(
        `/members/${memberId}/attendances/${attendanceId}/status`, {
            attendanceStatus: attendanceStatus,
            description: description,
        }
    );
    return response.data;
}

// 관리자가 특정 기간의 다가오는 근태 기록을 조회
export const fetchUpcomingAttendance = async () => {
    const response = await axiosInstance.get(`/admin/attendances`, {
        department : null
    });
    return response.data;
}