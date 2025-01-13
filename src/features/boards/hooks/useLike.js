// useLike.js
import { useState, useEffect } from 'react';
import { createBoardLike, deleteBoardLike } from '../services/BoardsService';
import {alertError} from "../../../utils/ErrorUtils";

const useLike = (boardId, reactionList, likeCount, userId) => {
    const [liked, setLiked] = useState(false);
    const [reactionId, setReactionId] = useState(null);
    const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);

    useEffect(() => {
        if (reactionList && reactionList.length > 0) {
            const userReaction = reactionList.find((reaction) => reaction.reactorId === userId);
            if (userReaction) {
                setLiked(true);
                setReactionId(userReaction.reactionId);
            } else {
                setLiked(false);
                setReactionId(null);
            }
        }
        setCurrentLikeCount(likeCount);
    }, [reactionList, userId, likeCount]);

    const toggleLike = async (emoji = 'LIKE') => {
        try {
            if (liked) {
                // 좋아요 취소
                if (reactionId) {
                    await deleteBoardLike(boardId, reactionId);
                    setLiked(false);
                    setReactionId(null);
                    setCurrentLikeCount((prev) => prev - 1);
                }
            } else {
                // 좋아요 추가
                const response = await createBoardLike(boardId, emoji);
                setLiked(true);
                setReactionId(response.reactionId);
                setCurrentLikeCount((prev) => prev + 1);
            }
        } catch (error) {
            alertError(error);
        }
    };

    return {
        liked,
        reactionId,
        currentLikeCount,
        toggleLike,
    };
};

export default useLike;
