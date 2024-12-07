import axiosInstance from "../../../utils/AxiosUtils";

// 멤버 상세 보기 조회
export const fetchMemberDetails = async (memberId) => {
    const response = await axiosInstance.get(`/members/${memberId}`);
    console.log("Response data : ", response.data);
    return response.data;
}

// 멤버 근태 기록 조회
export const fetchMemberAttendanceListForMember
    = async (memberId, year, month, attendanceStatus) => {
        // 요청 파라미터 구성
    const params = {
        year, month, attendanceStatus
    };
    const response
        = await axiosInstance.get(`/members/${memberId}/attendances`, {params,});

    console.log(response.data);

    return response.data;
}