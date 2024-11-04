import axiosInstance from "../../../utils/AxiosUtils";

export const fetchMemberNotificationList = async (memberId, currentPage, pageSize) => {
    const response = await axiosInstance.get(`/members/${memberId}/notifications`, {
        params: {
            page: currentPage,   // 쿼리 파라미터로 currentPage 추가
            size: pageSize       // 쿼리 파라미터로 pageSize 추가
        }
    });

    console.log("response.data.content:", response.data.content);
    console.log("response.data 전체:", JSON.stringify(response.data));
    return response.data; // 전체 페이지 정보 반환
};

export const fetchReadNotificationList = async (memberId) => {
    const response
        = await axiosInstance.get(`/members/${memberId}/notifications/read`, {
    });

    console.log("response.data.content : "+response.data.content);
    return response.data.content;
}

export const fetchUnReadNotificationList = async (memberId) => {
    const response
        = await axiosInstance.get(`/members/${memberId}/notifications/unread`, {
    });

    console.log("response.data.content : "+response.data.content);
    return response.data.content;
}

export const updateIsReadStatus = async (memberId) => {
    const response
        = await axiosInstance.post(`/members/${memberId}/notifications/changeIsReadTrue`, {
    });

    console.log("response.data.data : "+response.data.data);
    return response.data.data;
}

export const deleteNotificationList = async (memberId, selectedNotificationIdList) => {
    const response = await axiosInstance.delete(`/members/${memberId}/notifications`, {
        data: { notificationIds: selectedNotificationIdList }
    });

    console.log("response.data.data:", response.data.data);
    return response.data.data;
};

export const getNotification = async (memberId, selectedNotificationId) => {
    const response
        = await axiosInstance.get(
            `/members/${memberId}/notifications/${selectedNotificationId}`, {

        });
    console.log("response.data:", response.data.data);
    return response.data.data;
}


/*export const fetchFilteredMembers = async (position, department) => {
    const response = await axiosInstance.get(`/admin/members/filtered`, {
        params: {
            position: position !== undefined ? position : null, // 값이 undefined이면 null로 처리
            department: department !== undefined ? department : null,
        }
    });

    console.log("Response data : ", response.data);
    return response.data;
};

export const fetchMemberDetails = async (memberId) => {
    const response = await axiosInstance.get(`/members/${memberId}`);
    console.log("Response data : ", response.data);
    return response.data;
}

export const updateAttribute = async (formData, memberId) => {
    try {
        const response = await axiosInstance.patch(`/members/${memberId}/attribute`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // FormData 전송을 위한 헤더 설정
            },
        });
        console.log('Success:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating attribute:', error);
    }
};

export const updateRemainingVacationDays = async (memberId, changeRemainingVacationDays) => {
    try {
        const response
            = await axiosInstance.patch(`/members/${memberId}/vacations`,
            {
                vacationDays : changeRemainingVacationDays
            }
        );
        console.log('Success:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating members vacation:', error);
    }
};

export const updateSalary = async (memberId, memberName, changeSalary) => {
    try{
        const response = await axiosInstance.patch(`/members/${memberId}/attribute/salary`, {
            memberName : x`x`memberName,
            salary : changeSalary,
        });
        console.log("Response Data:", response.data);
        return response.data;
    }catch (error){
        console.log(error);
    }
};

let cachedMemberList = null;  // 캐시된 멤버 리스트

export const fetchMemberList = async () => {
    if (cachedMemberList) return cachedMemberList; // 캐시된 리스트가 있다면 반환
    console.log(cachedMemberList);
    try {
        const response = await axiosInstance.get('/members/nameList');
        cachedMemberList = response.data; // 캐시에 저장
        return cachedMemberList;
    } catch (error) {
        console.error("Error fetching member list:", error);
        throw error;
    }
};*/
