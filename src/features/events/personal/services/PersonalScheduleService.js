import axios from 'axios';
import {getCookie} from "../../../../utils/CookieUtil";

// 개인 일정 API 요청
export const getPersonalSchedule = async (currentDate, memberId, year, month) => {
    try {
        // API 호출
        const currentMonth = month + 1;
        console.log("currentMonth : "+currentMonth);
        const accessToken = getCookie('accessToken');
        const response
            = await fetch(`api/v1/members/${memberId}/events/years/${year}/month/${currentMonth}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
            credentials: 'include'
        });
        // 응답 데이터를 JSON으로 파싱
        // client에서 해당 data를 object형태가 아니라 json 형태로 되돌려서 봄
        const data = await response.json();
        console.log("Response data: ", data);
        
        return response.data;
    } catch (error) {
        console.error("Error fetching personal schedule:", error);
        throw error;
    }
};
