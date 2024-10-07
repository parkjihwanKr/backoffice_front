/*BoardDetailsFooter*/
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './BoardDetailsFooter.css';
import {useAuth} from "../../../../auth/components/AuthContext";
import {imagePrefix} from '../../../../../utils/Constant';

const BoardDetailsFooter = ({ boardId, reactionList, accessToken, likeCount, commentCount, viewCount }) => {
    const [liked, setLiked] = useState(false);
    const [reactionId, setReactionId] = useState(null);  // 초기 reactionId 설정
    const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);  // 좋아요 수 상태
    const { id } = useAuth();  // userId를 AuthContext에서 가져옴

    useEffect(() => {
        console.log(reactionList);
        console.log(id);
        if (reactionList && reactionList.length > 0) {
            const userReaction = reactionList.find(
                (reaction) => reaction.reactorId === id,  // reactorId를 기반으로 로그인한 사용자의 리액션 찾기
            );
            if (userReaction) {
                setLiked(true);  // 사용자가 좋아요를 눌렀으면 liked를 true로 설정
                setReactionId(userReaction.reactionId);  // reactionId 설정
            } else {
                setLiked(false);  // 좋아요를 누르지 않았으면 liked를 false로 설정
                setReactionId(null);  // reactionId를 null로 설정
            }
        } else {
            console.log("reactionList is null or undefined.");
        }

        setCurrentLikeCount(likeCount);  // 만약 서버에서 좋아요 수가 변경된 경우, 그 값을 반영
    }, [reactionList, id, likeCount]);

    const handleLikeClick = async () => {
        const likeUrl = `/api/v1/boards/${boardId}/reactions`;
        try {
            if (liked) {
                // 좋아요 취소 (DELETE 요청)
                if (reactionId) {
                    await axios.delete(`${likeUrl}/${reactionId}`, {
                        headers: { 'Authorization': `Bearer ${accessToken}` }
                    });
                    setLiked(false);
                    setReactionId(null);  // reactionId 초기화
                    setCurrentLikeCount(prev => prev - 1);  // 좋아요 수 감소
                } else {
                    console.error("reactionId is null, cannot delete reaction");
                }
            } else {
                // 좋아요 추가 (POST 요청)
                const response = await axios.post(likeUrl, { emoji: "LIKE" }, {
                    headers: { 'Authorization': `Bearer ${accessToken}` }
                });
                setLiked(true);
                setReactionId(response.data.reactionId);  // 서버에서 받은 reactionId 설정
                setCurrentLikeCount(prev => prev + 1);  // 좋아요 수 증가
            }
        } catch (error) {
            if (error.response && error.response.data) {
                const errorCode = error.response.data.errorCode;
                const errorMessage = error.response.data.message; // 도메인별 에러 메시지
                alert(`${errorCode} : ${errorMessage}`);
            } else {
                alert("Unexpected error occurred.");
            }
        }
    };

    return (
        <div className="post-meta">
            <span onClick={handleLikeClick} className="meta-item like-button">
                <img
                    src={liked ? `${imagePrefix}/shared/likes_done.png` : `${imagePrefix}/shared/likes.png`}
                    alt={liked ? 'liked' : 'likes'}
                    className="meta-icon"
                />
                : {currentLikeCount}
            </span>

            <span className="meta-item comment-count">
                <img
                    src={`${imagePrefix}/shared/commentList.png`}
                    alt="comments"
                    className="meta-icon"
                />
                : {commentCount}
            </span>

            <span className="meta-item view-count">
                <img
                    src={`${imagePrefix}/shared/viewCount.png`}
                    alt="views"
                    className="meta-icon"
                />
                : {viewCount}
            </span>
        </div>
    );
};

export default BoardDetailsFooter;
