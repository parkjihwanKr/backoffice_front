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

// 멤버 근태 기록 하나 조회
export const fetchMemberAttendance = async (attendanceId) => {
    const response
        = await axiosInstance.get(`/attendances/${attendanceId}`);

    console.log(response.data);
    return response.data;
}

// 멤버 근태 기록 출근 요청
export const updateCheckInTime = async (attendanceId, checkInTime) => {
    console.log("checkInTime : "+checkInTime);
    const response
        = await axiosInstance.patch(`/attendances/${attendanceId}/check-in`,{
            checkInTime : checkInTime
    });
    console.log(response.data);
    return response.data;
}

// 멤버 근태 기록 퇴근 요청
export const updateCheckOutTime = async (attendanceId, checkOutTime, description) => {
    const response
        = await axiosInstance.patch(`/attendances/${attendanceId}/check-out`, {
            checkOutTime : checkOutTime,
        description : description,
    });
    console.log(response.data);
    return response.data;
}

// 멤버 프로필 수정
export const updateMemberDetails = async (memberId, updatedMemberInfo) => {
    const response
        = await axiosInstance.patch(`/members/${memberId}/profile`, updatedMemberInfo);
    console.log(response.data);
    return response.data;
};

// 멤버 프로필 이미지 수정
export const updateMemberProfileImage = async (memberId, imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile); // `file` 키와 이미지 파일 추가

    try {
        const response
            = await axiosInstance.patch(`/members/${memberId}/profileImage`,
            formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // 반드시 multipart/form-data로 설정
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error( error);
        throw error; // 오류 처리
    }
};

// 상단 바의 멤버의 근태 기록 확인
export const checkTodayAttendance = async (memberId, createdAt) => {
    const response = await axiosInstance.get(`/members/${memberId}/check-today-attendance`);
    return response.data;
}