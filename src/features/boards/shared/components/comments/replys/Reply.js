/*Reply.js*/
import React, { useState, useEffect } from 'react';
import './Reply.css';
import EditReplyModal from './EditReplyModal';
import DeleteReplyModal from './DeleteReplyModal';
import { useAuth } from "../../../../../auth/context/AuthContext";
import axios from 'axios';
import {imagePrefix} from '../../../../../../utils/Constant';

const Reply = ({ reply, commentId, accessToken, setComments }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingReplyContent, setEditingReplyContent] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [replyIdToEdit, setReplyIdToEdit] = useState(null);
    const [liked, setLiked] = useState(false);
    const [reactionId, setReactionId] = useState(null);
    const { id, name } = useAuth();

    useEffect(() => {
        console.log('Current Reply:', reply);
        console.log(name + " " + reply.author);

        // 현재 사용자가 이미 해당 답글에 좋아요를 눌렀는지 확인
        const userReaction = reply.reactionList?.find(reaction => reaction.reactorId === id);
        if (userReaction) {
            setLiked(true);
            setReactionId(userReaction.reactionId);
        } else {
            setLiked(false);
        }
    }, [reply, id]);

    // 답글 수정 핸들러
    const handleEditReply = (replyId, replyContent) => {
        setReplyIdToEdit(replyId);
        setEditingReplyContent(replyContent);
        setShowEditModal(true);
    };

    // 답글 삭제 핸들러
    const handleDeleteReply = (replyId) => {
        setReplyIdToEdit(replyId);
        setShowDeleteModal(true);
    };

    // 답글 수정 제출 핸들러
    const handleEditReplySubmit = async (newContent) => {
        try {
            const response = await fetch(`/api/v1/comments/${commentId}/replies/${replyIdToEdit}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ content: newContent }),
            });

            if (!response.ok) {
                throw new Error('Failed to edit reply');
            }

            const updatedReply = await response.json(); // 서버로부터 수정된 답글 데이터

            // 댓글 리스트 전체 업데이트
            setComments((prevComments) =>
                prevComments.map((comment) =>
                    comment.commentId === commentId
                        ? {
                            ...comment,
                            replyList: comment.replyList.map((r) =>
                                r.replyId === updatedReply.replyId
                                    ? updatedReply // 수정된 답글로 교체
                                    : r
                            ),
                        }
                        : comment
                )
            );

            setShowEditModal(false);
        } catch (error) {
            console.error('Error editing reply:', error.message);
        }
    };

    // 답글 삭제 제출 핸들러
    const handleDeleteReplySubmit = async () => {
        try {
            const response = await fetch(`/api/v1/comments/${commentId}/replies/${replyIdToEdit}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete reply');
            }

            // 댓글 리스트 전체에서 해당 답글 삭제
            setComments((prevComments) =>
                prevComments.map((comment) =>
                    comment.commentId === commentId
                        ? {
                            ...comment,
                            replyList: comment.replyList.filter((r) => r.replyId !== replyIdToEdit),
                        }
                        : comment
                )
            );

            setShowDeleteModal(false);
        } catch (error) {
            console.error('Error deleting reply:', error.message);
        }
    };

    // 좋아요 (리액션) 추가/삭제 핸들러
    const handleReplyLike = async () => {
        try {
            if (liked) {
                // 리액션 삭제 요청 (DELETE)
                const response = await axios.delete(`/api/v1/replies/${reply.replyId}/reactions/${reactionId}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                console.log(response);
                setLiked(false);
                setReactionId(null);
            } else {
                // 리액션 추가 요청 (POST)
                const response = await axios.post(`/api/v1/comments/${commentId}/replies/${reply.replyId}/reactions`, {
                    emoji: 'LIKE',
                }, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                console.log(response.data);
                const { reactionId: newReactionId } = response.data;
                setLiked(true);
                setReactionId(newReactionId);
            }
        } catch (error) {
            console.error('Error handling reply like:', error.message);
        }
    };

    return (
        <div className="reply">
            <div className="reply-meta">
                <span className="reply-author">
                    {reply.author} ({reply.authorDepartment}, {reply.authorPosition})
                </span>
                <div className="reply-actions">
                    <img
                        src={liked ? `${imagePrefix}/shared/likes_done.png` : `${imagePrefix}/shared/commentReplyLike.png`}
                        alt="commentLikeReply"
                        className="reply-action-icon"
                        onClick={handleReplyLike}
                    />
                    {reply.author === name && (
                        <>
                            <img
                                src={`${imagePrefix}/shared/edit_document.png`}
                                alt="Edit"
                                className="reply-action-icon"
                                onClick={() => handleEditReply(reply.replyId, reply.content)}
                            />
                            <img
                                src={`${imagePrefix}/shared/delete.png`}
                                alt="Delete"
                                className="reply-action-icon"
                                onClick={() => handleDeleteReply(reply.replyId)}
                            />
                        </>
                    )}
                </div>
                <div className="like-info">
                    <img
                        src={`${imagePrefix}/shared/likes.png`}
                        style={{ height: '24px', width: '24px', verticalAlign: 'middle' }}
                    />
                    <span style={{ marginLeft: '5px' }}> : {reply.likeCount}</span>
                </div>
            </div>
            <p>{reply.content}</p>

            <EditReplyModal
                show={showEditModal}
                handleClose={() => setShowEditModal(false)}
                replyContent={editingReplyContent}
                handleEditSubmit={handleEditReplySubmit}
            />

            <DeleteReplyModal
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                handleDeleteSubmit={handleDeleteReplySubmit}
            />
        </div>
    );
};

export default Reply;
