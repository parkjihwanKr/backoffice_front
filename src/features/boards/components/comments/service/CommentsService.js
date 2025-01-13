import axiosInstance from "../../../../../utils/AxiosUtils";

export const createBoardComment = async (boardId, commentContent) => {
    const response
        = await axiosInstance.post(`/boards/${boardId}/comments`,
        commentContent);
    return response.data;
}

export const createCommentReply = async (boardId, commentId, replyData) => {
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
    await axiosInstance.delete(`/comments/${commentId}/reactions/${reactionId}`);
};

export const updateComment = async (boardId, commentId, commentData) => {
    const response
        = await axiosInstance.patch(
            `/boards/${boardId}/comments/${commentId}`, commentData);
    return response.data;
};

export const deleteComment = async (boardId, commentId) => {
    await axiosInstance.delete(`/boards/${boardId}/comments/${commentId}`);
};

export const updateReply = async (commentId, replyId, replyContent) => {
    const response
        = await axiosInstance.patch(
            `/comments/${commentId}/replies/${replyId}`, replyContent);
    return response.data;
}

export const deleteReply = async (commentId, replyId) => {
    await axiosInstance.delete(`/comments/${commentId}/replies/${replyId}`);
}

export const toggleReplyLike = async (commentId, replyId, reactionId, liked) => {
    if (liked) {
        // DELETE reaction
        await axiosInstance.delete(
            `/replies/${replyId}/reactions/${reactionId}`);
        return null;
    } else {
        // POST reaction
        const emoji = { emoji: 'LIKE' };
        const response
            = await axiosInstance.post(
                `/comments/${commentId}/replies/${replyId}/reactions`, emoji,);
        return response.data.reactionId;
    }
};