import axiosInstance from "../../../../utils/AxiosUtils";

export const fetchMemberAttendance
    = async ({department, memberName, year, month, page, size}) => {
    try {
        // 요청 파라미터 구성
        const params = {
            department, memberName, year, month, page, size};

        // API 요청
        const response
            = await axiosInstance.get("/admin/attendances/monthly", {params,});

        console.log(response.data);

        // 반환 데이터
        return response.data;
    } catch (error) {
        console.error("Error fetching attendance data:", error);
        throw error;
    }
};

export const fetchDailyMemberAttendance
    = async ({department, memberName, year, month, day, page, size}) => {
    try {
        // 요청 파라미터 구성
        const params = {
            department, memberName, year, month, day, page, size};

        // API 요청
        const response
            = await axiosInstance.get("/admin/attendances/daily", {params,});

        console.log(response.data);

        // 반환 데이터
        return response.data;
    } catch (error) {
        alert(error.response.data.data + " : "+error.response.data.message);
        // console.error("Error fetching attendance data:", error);
        throw error;
    }
};