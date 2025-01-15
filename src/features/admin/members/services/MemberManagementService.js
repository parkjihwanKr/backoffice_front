import {axiosInstance} from "../../../../utils/AxiosUtils";
import CacheManager from "../../../../utils/CacheManager";

export const fetchFilteredMembers = async (position, department, page, pageSize) => {
    const response = await axiosInstance.get("/admin/members/filtered", {
        params: { position, department, page, size: pageSize },
    });
    return response.data;
};

export const updateAttribute = async (formData, memberId) => {
    const response = await axiosInstance.patch(`/members/${memberId}/attribute`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data', // FormData 전송을 위한 헤더 설정
        },
    });
    return response.data;
};

export const updateRemainingVacationDays = async (memberId, changeRemainingVacationDays) => {
    try {
        const response
            = await axiosInstance.patch(`/members/${memberId}/vacations`,
            {
                vacationDays : changeRemainingVacationDays
            }
        );
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
        return response.data;
    }catch (error){
        console.error(error);

    }
};

// 멤버 이름 리스트 -> 캐싱 데이터화
const fetchMemberListFromAPI = async () => {
    const response = await axiosInstance.get('/members/nameList');
    return response.data;
};

const memberCacheManager = new CacheManager(fetchMemberListFromAPI);

export const fetchMemberList = async () => {
    return memberCacheManager.getCache(); // 캐시에서 데이터 가져오기
};

export const getMemberTotalCount = async () => {
    const members = await memberCacheManager.getCache();
    return members.length; // 멤버 수 반환
};

export const clearMemberCache = () => {
    memberCacheManager.clearCache(); // 캐시 초기화
};
