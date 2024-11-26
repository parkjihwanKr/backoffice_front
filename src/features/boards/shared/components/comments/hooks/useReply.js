import {useState, useEffect, useRef} from 'react';
import { updateReply, deleteReply, toggleReplyLike } from '../service/CommentsService';

export const useReply = ({ reply, commentId, setComments, userId }) => {
    const [liked, setLiked] = useState(false);
    const [reactionId, setReactionId] = useState(null);
    const [likeCount, setLikeCount] = useState(reply.likeCount);

    // Like와 같은 반응 API는 일정 간격으로 제한 : 요청 디바바운스
    const requestInProgress = useRef(false);

    useEffect(() => {
        const userReaction = reply.reactionList?.find((reaction) => reaction.reactorId === userId);
        if (userReaction) {
            setLiked(true);
            setReactionId(userReaction.reactionId);
        } else {
            setLiked(false);
        }
        setLikeCount(reply.likeCount);
    }, [reply, userId]);

    const handleEditReplySubmit = async (newContent) => {
        try {
            const updatedReply = await updateReply(commentId, reply.replyId, newContent);
            setComments((prevComments) =>
                prevComments.map((comment) =>
                    comment.commentId === commentId
                        ? {
                            ...comment,
                            replyList: comment.replyList.map((r) =>
                                r.replyId === updatedReply.replyId ? updatedReply : r
                            ),
                        }
                        : comment
                )
            );
        } catch (error) {
            console.error('Error editing reply:', error.message);
            throw error;
        }
    };

    const handleDeleteReplySubmit = async () => {
        try {
            await deleteReply(commentId, reply.replyId);
            setComments((prevComments) =>
                prevComments.map((comment) =>
                    comment.commentId === commentId
                        ? {
                            ...comment,
                            replyList: comment.replyList.filter((r) => r.replyId !== reply.replyId),
                        }
                        : comment
                )
            );
        } catch (error) {
            console.log(error.response.data);
            alert(error.response.data.data +" : "+error.response.data.message);
            // throw error;
        }
    };

    const handleReplyLike = async () => {
        if (requestInProgress.current) return;
        requestInProgress.current = true;

        try {
            if (liked) {
                await toggleReplyLike(commentId, reply.replyId, reactionId, liked);
                setLiked(false);
                setReactionId(null);
                setLikeCount((prev) => prev - 1);
            } else {
                const newReactionId = await toggleReplyLike(commentId, reply.replyId, reactionId, liked);
                setLiked(true);
                setReactionId(newReactionId);
                setLikeCount((prev) => prev + 1);
            }
        } catch (error) {
            console.log(error.response.data);
            alert(error.response.data.data + " : " + error.response.data.message);
        } finally {
            requestInProgress.current = false;
        }
    };

    return {
        liked,
        likeCount,
        handleEditReplySubmit,
        handleDeleteReplySubmit,
        handleReplyLike,
    };
};
