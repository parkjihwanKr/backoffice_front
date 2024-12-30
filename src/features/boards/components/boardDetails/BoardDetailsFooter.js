import React from 'react';
import './BoardDetailsFooter.css';
import { useAuth } from "../../../auth/context/AuthContext";
import { imagePrefix } from '../../../../utils/Constant';
import useLike from '../../hooks/useLike';

const BoardDetailsFooter = ({ boardId, reactionList, likeCount, commentCount, viewCount }) => {
    const { id: userId } = useAuth(); // 사용자 ID
    const { liked, currentLikeCount, toggleLike } = useLike(boardId, reactionList, likeCount, userId);

    return (
        <div className="board-details-footer">
            <span onClick={() => toggleLike("LIKE")} className="board-details-footer like-button">
                <img
                    src={liked ? `${imagePrefix}/shared/likes_done.png` : `${imagePrefix}/shared/likes.png`}
                    alt={liked ? 'liked' : 'likes'}
                    className="like-button"
                />
                : {currentLikeCount}
            </span>

            <span className="board-details-footer comment-count">
                <img
                    src={`${imagePrefix}/shared/commentList.png`}
                    alt="comments"
                    className="comment-count"
                />
                : {commentCount}
            </span>

            <span className="board-details-footer view-count">
                <img
                    src={`${imagePrefix}/shared/viewCount.png`}
                    alt="views"
                    className="view-count"
                />
                : {viewCount}
            </span>
        </div>
    );
};

export default BoardDetailsFooter;
