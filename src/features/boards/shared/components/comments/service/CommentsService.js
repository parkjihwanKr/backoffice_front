import axiosInstance from "../../../../../../utils/AxiosUtils";

export const createBoardComment = async (boardId, commentContent) => {
    const response
        = await axiosInstance.post(`/boards/${boardId}/comments`,
        commentContent);
    console.log(response.data);
    return response.data;
}
export const createBoardReply = async (boardId, commentId, replyData) => {
    const response = await axiosInstance.post(
        `/boards/${boardId}/comments/${commentId}/replies`,
        replyData
    );
    return response.data;
};

export const createCommentReaction = async (boardId, commentId, reactionData) => {
    const response = await axiosInstance.post(
        `/boards/${boardId}/comments/${commentId}/reactions`,
        reactionData
    );
    return response.data;
};

export const deleteCommentReaction = async (boardId, commentId, reactionId) => {
    await axiosInstance.delete(`/boards/${boardId}/comments/${commentId}/reactions/${reactionId}`);
};

export const editComment = async (boardId, commentId, commentData) => {
    const response = await axiosInstance.patch(
        `/boards/${boardId}/comments/${commentId}`,
        commentData
    );
    return response.data;
};

export const deleteComment = async (boardId, commentId) => {
    await axiosInstance.delete(`/boards/${boardId}/comments/${commentId}`);
};