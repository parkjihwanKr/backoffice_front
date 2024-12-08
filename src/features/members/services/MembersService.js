import axiosInstance from "../../../utils/AxiosUtils";

// 멤버 상세 보기 조회
export const fetchMemberDetails = async (memberId) => {
    const response = await axiosInstance.get(`/members/${memberId}`);
    console.log("Response data : ", response.data);
    return response.data;
}

// 멤버 근태 기록 조회
export const fetchMemberAttendanceListForMember
    = async (memberId, year, month) => {
        // 요청 파라미터 구성
    const params = {year, month};

    const response
        = await axiosInstance.get(`/members/${memberId}/attendances`, {params,});

    console.log(response.data);

    return response.data;
}

export const fetchMemberAttendance = async (attendanceId) => {
    const response
        = await axiosInstance.get(`/attendances/${attendanceId}`);

    console.log(response.data);
    return response.data;
}

export const updateCheckInTime = async (attendanceId, checkInTime) => {
    console.log("checkInTime : "+checkInTime);
    const response
        = await axiosInstance.patch(`/attendances/${attendanceId}/check-in`,{
            checkInTime : checkInTime
    });
    console.log(response.data);
    return response.data;
}

export const updateCheckOutTime = async (attendanceId, checkOutTime, description) => {
    const response
        = await axiosInstance.patch(`/attendances/${attendanceId}/check-out`, {
            checkOutTime : checkOutTime,
        description : description,
    });
    console.log(response.data);
    return response.data;
}