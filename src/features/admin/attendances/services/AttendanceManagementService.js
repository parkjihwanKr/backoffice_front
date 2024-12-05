import axiosInstance from "../../../../utils/AxiosUtils";

// 월별 근태 기록 조회 (필터링 가능)
export const fetchMemberAttendanceList
    = async (department, year, month, page, size) => {
    try {
        // 요청 파라미터 구성
        const params = {
            department, year, month, page, size};

        // API 요청
        const response
            = await axiosInstance.get("/admin/attendances/monthly", {params,});

        console.log(response.data);

        // 반환 데이터
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

// 근태 기록 수동 삭제
export const deleteAttendanceManually = async (attendanceIdList) => {
    console.log("deleteAttendanceManually method param:", attendanceIdList);
    try {
        const response = await axiosInstance.delete(`/attendances`, {
            data: attendanceIdList, // JSON 배열 형태로 보냄
        });
        return response.data;
    } catch (error) {
        console.error("API 요청 실패:", error);
        throw error;
    }
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
    console.log(response.data);
    return response.data;
}

