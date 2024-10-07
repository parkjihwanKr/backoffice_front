import axios from 'axios';
import {getCookie} from "../../../../utils/CookieUtil";

// 개인 일정 API 요청
export const getPersonalMonthSchedule = async (memberId, year, month) => {
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

        return data;
    } catch (error) {
        console.error("Error fetching personal schedule:", error);
        throw error;
    }
};

// 개인 일정 디테일 API 요청
export const getPersonalDaySchedule = async (memberId, year, month, date) => {
    try {
        // API 호출
        const currentMonth = month + 1;
        console.log("selected date : "+year+"년 "+currentMonth+"월 "+ date +"일이 선택되었습니다.");
        const accessToken = getCookie('accessToken');
        const response
            = await fetch(`api/v1/members/${memberId}/events/years/${year}/months/${currentMonth}/days/${date}`, {
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

// 개인 휴가 일정 생성 API 요청
export const createPersonalSchedule = async () => {
    try {
        // API 호출
        const accessToken = getCookie('accessToken');
        const response
            = await fetch(`api/v1/vacations`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
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
