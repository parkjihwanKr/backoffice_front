import axiosInstance from "../../../../utils/AxiosUtils";

export const fetchBoardDetails = async (boardId) => {
    try {
        const response = await axiosInstance.get(`/boards/${boardId}`);
        console.log(response.data);
        return response.data || []; // 데이터 반환
    } catch (error) {
        console.error('Error fetching boards:', error.message);
        throw error;
    }
};

export const updateBoardDetails = async (boardId, accessToken, editForm, files) => {
    const formData = new FormData();

    const json = JSON.stringify({
        title: editForm.title,
        content: editForm.content,
        category: editForm.category,
        isImportant: editForm.isImportant,
        department: editForm.department,
        isLocked: editForm.isLocked,
    });
    formData.append('data', new Blob([json], { type: 'application/json' }));

    if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }
    }

    const response = await fetch(`/api/v1/boards/${boardId}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${errorData.errorCode}: ${errorData.message}`);
    }

    return response.json();
};

export const deleteBoard = async (boardId, accessToken) => {
    const response = await fetch(`/api/v1/boards/${boardId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to delete board');
    }
};
