// DepartmentScheduleService.js
import axios from 'axios';
import { getCookie } from "../../../../utils/CookieUtil";
import axiosInstance from "../../../../utils/AxiosUtils";

const accessToken = getCookie('accessToken');

// 회사 일정 가져오기
export const fetchSchedules = async (department, year, month) => {
    const response
        = await axiosInstance.get(
            `/departments/${department}/events/years/${year}/months/${month + 1}`,{});
    return response.data;
};

export const createEvent = async (department, formData) => {
    const requestData = new FormData();

    // JSON 데이터를 'data'라는 이름으로 Blob 형태로 추가
    requestData.append('data', new Blob([JSON.stringify({
        title: formData.title,
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate
    })], { type: 'application/json' }));

    // 파일이 존재하는 경우에만 파일을 추가
    if (formData.files && formData.files.length > 0) {
        for (let file of formData.files) {
            requestData.append('files', file);
        }
    }

    const response
        = await axiosInstance.post(`/departments/${department}/events`, requestData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// 일정 수정하기
export const updateEvent = async (department, eventId, formData) => {
    const requestData = new FormData();
    requestData.append('data', new Blob([JSON.stringify(formData)], { type: 'application/json' }));

    if (formData.files && formData.files.length > 0) {
        for (let file of formData.files) {
            requestData.append('files', file);
        }
    }

    return await axios.patch(`/api/v1/departments/${department}/events/${eventId}`, requestData, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
};

// 일정 삭제하기
export const deleteEvent = async (department, eventId) => {
    return await axios.delete(`/api/v1/departments/${department}/events/${eventId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
};
