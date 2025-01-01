import { departmentMapping } from "../../../utils/Constant";
import axiosInstance from "../../../utils/AxiosUtils";

export const getMappedDepartment = (department) => {
    return departmentMapping[department] || null;
};

// 전체 게시판 조회
export const fetchAllBoards = async () => {
    try {
        const response = await axiosInstance.get(`/boards`);
        return response.data || []; // 데이터 반환
    } catch (error) {
        console.error('Error fetching boards:', error.message);
        throw error;
    }
};

// 부서 게시판 조회
export const fetchDepartmentBoards = async (department) => {
    try {
        const response
            = await axiosInstance.get(`departments/${department}/boards`);
        return response.data || []; // 데이터 반환
    } catch (error) {
        console.error('Error fetching boards:', error.message);
        throw error;
    }
}

// 전체 게시판 생성
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

// 부서 게시판 생성
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

// 게시글 상세보기 조회
export const fetchBoardDetails = async (boardId) => {
    try {
        const response = await axiosInstance.get(`/boards/${boardId}`);
        return response.data || []; // 데이터 반환
    } catch (error) {
        console.error('Error fetching boards:', error.message);
        throw error;
    }
};

// 부서 게시글 상세보기 조회 API
export const fetchDepartmentBoardDetails = async (boardId, department) => {
    const response
        = await axiosInstance.get(`/departments/${department}/boards/${boardId}`)
    return response.data;
}
// 게시글 상세보기 수정 API
export const updateBoardDetails = async (boardId, editForm, files, isDepartmentBoard, department) => {
    const formData = new FormData();

    // 부서 게시판일 때
    if(isDepartmentBoard){
        const json = JSON.stringify({
            title: editForm.title,
            content: editForm.content,
            category: editForm.category,
            isImportant: editForm.isImportant,
            department: department,
            isLocked: editForm.isLocked,
        });
        formData.append('data', new Blob(
            [json], { type: 'application/json' }));
    }else{
        // JSON 데이터를 "data" 필드로 추가
        const json = JSON.stringify({
            title: editForm.title,
            content: editForm.content,
            category: editForm.category,
            isImportant: editForm.isImportant,
            department: null,
            isLocked: editForm.isLocked,
        });
        formData.append('data', new Blob(
            [json], { type: 'application/json' }));
    }

    // 파일이 있는 경우 "files" 필드로 추가
    if (files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }
    }

    // 멀티파트 요청으로 PATCH 호출
    if(isDepartmentBoard){
        const response
            = await axiosInstance.patch(`/departments/${department}/boards/${boardId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }else{
        const response
            = await axiosInstance.patch(`/boards/${boardId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }
};

// 게시글 삭제
export const deleteBoardDetails = async (boardId) => {
    const response = await axiosInstance.delete(`boards/${boardId}`);
    return response.data;
}

// 게시글 좋아요 요청
export const createBoardLike = async (boardId, emoji) => {
    const response
        = await axiosInstance.post(`boards/${boardId}/reactions`, {
        emoji: emoji, // 이모지 데이터 추가
    });
    return response.data;
};

// 게시글 좋아요 취소 요청
export const deleteBoardLike = async (boardId, likeId) => {
    const response
        = await axiosInstance.delete(`boards/${boardId}/reactions/${likeId}`);
    return response.data;
}

// 중요도 변경 API
export const patchMarkAsImportant = async (boardId) => {
    const response = await axiosInstance.patch(`/boards/${boardId}/important`);
    return response.data;
};

// 잠금 상태 변경 API
export const patchMarkAsLocked = async (boardId) => {
    const response = await axiosInstance.patch(`/boards/${boardId}/lock`);
    return response.data;
};