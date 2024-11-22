import { departmentMapping } from "../../../../utils/Constant";
import axiosInstance from "../../../../utils/AxiosUtils";

export const getMappedDepartment = (department) => {
    return departmentMapping[department] || null;
};

export const fetchAllBoards = async () => {
    try {
        const response = await axiosInstance.get(`/boards`);
        console.log(response.data);
        return response.data || []; // 데이터 반환
    } catch (error) {
        console.error('Error fetching boards:', error.message);
        throw error;
    }
};

export const fetchDepartmentBoards = async (department) => {
    try {
        const response
            = await axiosInstance.get(`departments/${department}/boards`);
        console.log(response.data);
        return response.data || []; // 데이터 반환
    } catch (error) {
        console.error('Error fetching boards:', error.message);
        throw error;
    }
}

export const createAllBoards = async (data, files) => {
    const formData = new FormData();

    formData.append(
        'data', new Blob([JSON.stringify(data)],
            { type: 'application/json' }));

    if (files.length > 0) {
        files.forEach((file) => {
            formData.append('files', file);
        });
    }

    try {
        const response = await axiosInstance.post(
            '/boards', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        return response.data;
    } catch (error) {
        console.error('Error creating board:', error.message);
        throw new Error('게시글 생성 실패');
    }
}

export const createDepartmentBoards = async (department, data, files) => {
    const formData = new FormData();

    formData.append(
        'data', new Blob([JSON.stringify(data)],
            { type: 'application/json' }));

    if (files.length > 0) {
        files.forEach((file) => {
            formData.append('files', file);
        });
    }

    try {
        const response = await axiosInstance.post(
            `/departments/${department}/boards`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        return response.data;
    } catch (error) {
        console.error('Error creating board:', error.message);
        throw new Error('게시글 생성 실패');
    }
}