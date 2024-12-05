import axiosInstance from "../../../../utils/AxiosUtils";
import CacheManager from "../../../../utils/CacheManager";

export const fetchFilteredMembers = async (position, department) => {
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
            memberName : memberName,
            salary : changeSalary,
        });
        console.log("Response Data:", response.data);
        return response.data;
    }catch (error){
        console.log(error);
    }
};

// 멤버 이름 리스트 -> 캐싱 데이터화
const fetchMemberListFromAPI = async () => {
    const response = await axiosInstance.get('/members/nameList');
    return response.data;
};

const memberCacheManager = new CacheManager(fetchMemberListFromAPI);

export const fetchMemberList = async () => {
    if (memberCacheManager.getCache() == null) {
        console.log("is null");
    }
    return memberCacheManager.getCache(); // 캐시에서 데이터 가져오기
};

export const getMemberTotalCount = async () => {
    const members = await memberCacheManager.getCache();
    return members.length; // 멤버 수 반환
};

export const clearMemberCache = () => {
    memberCacheManager.clearCache(); // 캐시 초기화
};
