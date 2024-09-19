import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './Comments.css';
import EditCommentModal from "./EditCommentModal";
import DeleteCommentModal from "./DeleteCommentModal";
import ReplyCommentModal from './ReplyCommentModal';
import Reply from './replys/Reply';
import {useAuth} from "../../../../auth/components/AuthContext";

const Comments = ({ comments, name, boardId, accessToken, setComments }) => {
    const [comment, setComment] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingCommentContent, setEditingCommentContent] = useState('');
    const [commentIdToEdit, setCommentIdToEdit] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [commentIdToDelete, setCommentIdToDelete] = useState(null);
    const [showReplyModal, setShowReplyModal] = useState(false);
    const [commentToReply, setCommentToReply] = useState(null);
    const [likedComments, setLikedComments] = useState({});
    const [showReplies, setShowReplies] = useState({});
    const [hoveredCommentId, setHoveredCommentId] = useState(null); // 추가된 부분
    const { id } = useAuth();
    const imagePrefix = 'https://pjhawss3bucket.s3.ap-northeast-2.amazonaws.com/backoffice';

    useEffect(() => {
        const initialLikedComments = {};
        console.log("userId : " + id);
        console.log(comments);
        comments.forEach(comment => {
            const userReaction = comment.reactionList?.find(
                reaction => reaction.reactorId === id);
            if (userReaction) {
                initialLikedComments[comment.commentId] = {
                    liked: true,
                    reactionId: userReaction.reactionId
                };
            } else {
                initialLikedComments[comment.commentId] = { liked: false, reactionId: null };
            }
        });
        setLikedComments(initialLikedComments);
    }, [comments, id]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/v1/boards/${boardId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ content: comment })
            });

            if (!response.ok) {
                throw new Error('Failed to submit comment');
            }

            const newComment = await response.json();
            setComments(prevComments => [...prevComments, newComment]);
            setComment('');
        } catch (error) {
            console.error(error.message);
        }
    };

    const toggleShowReplies = (commentId) => {
        setShowReplies(prev => ({
            ...prev,
            [commentId]: !prev[commentId]
        }));
    };

    const handleReply = (comment) => {
        setCommentToReply(comment);
        setShowReplyModal(true);
    };

    const handleReplySubmit = async (replyContent) => {
        try {
            const response = await fetch(`/api/v1/boards/${boardId}/comments/${commentToReply.commentId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ content: replyContent })
            });

            if (!response.ok) {
                throw new Error('Failed to submit reply');
            }

            const newReply = await response.json();

            setComments(prevComments =>
                prevComments.map((comment) =>
                    comment.commentId === commentToReply.commentId
                        ? { ...comment, replyList: [...(comment.replyList || []), newReply] }
                        : comment
                )
            );

            setShowReplyModal(false);
        } catch (error) {
            console.error('Error submitting reply:', error.message);
        }
    };

    const handleCommentLike = async (commentId) => {
        const commentLiked = likedComments[commentId]?.liked;
        let reactionId = likedComments[commentId]?.reactionId;

        const likeUrl = `/api/v1/boards/${boardId}/comments/${commentId}/reactions`;

        setLikedComments((prevLikedComments) => ({
            ...prevLikedComments,
            [commentId]: { liked: !commentLiked, reactionId: reactionId },
        }));
        setComments((prevComments) =>
            prevComments.map((comment) =>
                comment.commentId === commentId
                    ? { ...comment, likeCount: commentLiked ? comment.likeCount - 1 : comment.likeCount + 1 }
                    : comment
            )
        );

        try {
            if (commentLiked) {
                // 좋아요 취소 (DELETE 요청)
                if (reactionId) {
                    const response = await axios.delete(`/api/v1/comments/${commentId}/reactions/${reactionId}`, {
                        headers: { 'Authorization': `Bearer ${accessToken}` },
                    });
                    console.log("전달 받은 데이터 :" + response);
                } else {
                    console.error("reactionId is null, cannot delete reaction");
                    throw new Error("reactionId가 설정되지 않았습니다.");
                }
            } else {
                // 좋아요 추가 (POST 요청)
                const response = await axios.post(likeUrl, { emoji: "LIKE" }, {
                    headers: { 'Authorization': `Bearer ${accessToken}` },
                });

                console.log("전달 받은 데이터 :" + response);
                if (response.data && response.data.reactionId) {
                    const updatedReaction = response.data;
                    setLikedComments((prevLikedComments) => ({
                        ...prevLikedComments,
                        [commentId]: { liked: true, reactionId: updatedReaction.reactionId },
                    }));
                } else {
                    throw new Error("서버 응답에 reactionId가 없습니다.");
                }
            }
        } catch (error) {
            console.error(error.errorCode + ' : ', error.message);

            setLikedComments((prevLikedComments) => ({
                ...prevLikedComments,
                [commentId]: { liked: commentLiked, reactionId },
            }));
            setComments((prevComments) =>
                prevComments.map((comment) =>
                    comment.commentId === commentId
                        ? { ...comment, likeCount: commentLiked ? comment.likeCount + 1 : comment.likeCount - 1 }
                        : comment
                )
            );
        }
    };

    const handleEditComment = (commentId, commentContent) => {
        setCommentIdToEdit(commentId);
        setEditingCommentContent(commentContent);
        setShowEditModal(true);
    };

    const handleDeleteComment = (commentId) => {
        setCommentIdToDelete(commentId);
        setShowDeleteModal(true);
    };

    const handleEditSubmit = async (newContent) => {
        try {
            const response = await fetch(`/api/v1/boards/${boardId}/comments/${commentIdToEdit}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ content: newContent })
            });

            if (!response.ok) {
                throw new Error('Failed to edit comment');
            }

            const updatedComment = await response.json();

            setComments((prevComments) =>
                prevComments.map((comment) =>
                    comment.commentId === updatedComment.commentId
                        ? { ...comment, content: updatedComment.content, modifiedAt: updatedComment.modifiedAt }
                        : comment
                )
            );

            setShowEditModal(false);
        } catch (error) {
            console.error('Error editing comment:', error.message);
        }
    };

    const handleDeleteSubmit = async () => {
        try {
            const response = await fetch(`/api/v1/boards/${boardId}/comments/${commentIdToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete comment');
            }

            setComments(prevComments =>
                prevComments.filter(comment => comment.commentId !== commentIdToDelete)
            );
            setShowDeleteModal(false);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="comments-section">
            <h5>댓글 작성</h5>
            <form onSubmit={handleCommentSubmit} className="d-flex flex-column">
                <textarea
                    className="form-control mb-2"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows="1"
                    placeholder="댓글을 입력하세요"
                    required
                />
                <div className="text-end">
                    <button type="submit" className="btn btn-primary btn-sm">
                        댓글 작성
                    </button>
                </div>
            </form>

            <hr />

            {comments.length > 0 && (
                <div className="comments-list">
                    <h5>댓글 리스트</h5>
                    {comments.map((comment) => (
                        <div key={comment.commentId} className="comment-card-wrapper">
                            <div className="comment-card"
                                 onMouseEnter={() => setHoveredCommentId(comment.commentId)}
                                 onMouseLeave={() => setHoveredCommentId(null)}>

                                <div className="comment-meta">
                                    <span className="comment-author">
                                        {comment.author} ({comment.authorDepartment}, {comment.authorPosition})
                                    </span>
                                    <div className="comment-actions">
                                        <img
                                            src={`${imagePrefix}/shared/reply.png`}
                                            alt="Reply"
                                            className="action-icon"
                                            onClick={() => handleReply(comment)}
                                        />
                                        <img
                                            src={likedComments[comment.commentId]?.liked ? `${imagePrefix}/shared/likes_done.png` : `${imagePrefix}/shared/commentListLike.png`}
                                            alt={likedComments[comment.commentId]?.liked ? 'liked' : 'likes'}
                                            className="action-icon"
                                            style={{ marginRight: '4px' }}
                                            onClick={() => handleCommentLike(comment.commentId)}
                                        />
                                        {comment.author === name && (
                                            <>
                                                <img
                                                    src={`${imagePrefix}/shared/edit_document.png`}
                                                    alt="Edit"
                                                    className="action-icon"
                                                    onClick={() => handleEditComment(comment.commentId, comment.content)}
                                                />
                                                <img
                                                    src={`${imagePrefix}/shared/delete.png`}
                                                    alt="Delete"
                                                    className="action-icon"
                                                    onClick={() => handleDeleteComment(comment.commentId)}
                                                />
                                            </>
                                        )}
                                    </div>
                                </div>

                                <p className="comment-content">{comment.content}</p>

                                {showReplies[comment.commentId] && (
                                    <div className="replies-container">
                                        {Array.isArray(comment.replyList) && comment.replyList.map((reply) => (
                                            <div className="reply-item" key={reply.replyId}>
                                                <img
                                                    src={`${imagePrefix}/shared/commentReply.png`}
                                                    alt="Reply Icon"
                                                    className="reply-icon"
                                                />
                                                <Reply
                                                    reply={reply}
                                                    commentId={comment.commentId}
                                                    accessToken={accessToken}
                                                    setComments={setComments}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* 말풍선 모양의 like-info */}
                                {hoveredCommentId === comment.commentId && (
                                    <div className="like-info">
                                        <img
                                            src={`${imagePrefix}/shared/likes.png`}
                                            style={{ height: '24px', width: '24px', verticalAlign: 'middle' }}
                                        />
                                        <span style={{ marginLeft: '5px' }}> : {comment.likeCount}</span>
                                    </div>
                                )}

                                {comment.replyList && comment.replyList.length > 0 && (
                                    <button
                                        className="reply-toggle-button"
                                        onClick={() => toggleShowReplies(comment.commentId)}
                                    >
                                        {showReplies[comment.commentId] ? '답글 숨기기' : '답글 보기'}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <EditCommentModal
                show={showEditModal}
                handleClose={() => setShowEditModal(false)}
                commentContent={editingCommentContent}
                handleEditSubmit={handleEditSubmit}
            />

            <DeleteCommentModal
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                handleDeleteSubmit={handleDeleteSubmit}
            />

            <ReplyCommentModal
                show={showReplyModal}
                handleClose={() => setShowReplyModal(false)}
                handleReplySubmit={handleReplySubmit}
                commentAuthor={commentToReply?.author}
                commentDepartment={commentToReply?.authorDepartment}
                commentPosition={commentToReply?.authorPosition}
                commentContent={commentToReply?.content}
            />
        </div>
    );
};

export default Comments;
