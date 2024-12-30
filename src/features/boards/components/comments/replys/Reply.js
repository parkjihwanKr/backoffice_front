// Reply.js
import React, { useState } from 'react';
import './Reply.css';
import UpdateReplyModal from './UpdateReplyModal';
import DeleteReplyModal from './DeleteReplyModal';
import { useAuth } from '../../../../auth/context/AuthContext';
import { imagePrefix } from '../../../../../utils/Constant';
import { useReply } from '../hooks/useReply';

const Reply = ({ reply, commentId, setComments }) => {
    const { id, name } = useAuth();
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingReplyContent, setEditingReplyContent] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const { liked, likeCount, handleEditReplySubmit, handleDeleteReplySubmit, handleReplyLike } =
        useReply({
            reply,
            commentId,
            setComments,
            id,
        });

    const handleEditReply = (replyContent) => {
        console.log(reply);
        setEditingReplyContent(replyContent);
        setShowEditModal(true);
    };

    const handleDeleteReply = () => {
        setShowDeleteModal(true);
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
                                onClick={() => handleEditReply(reply.content)}
                            />
                            <img
                                src={`${imagePrefix}/shared/delete.png`}
                                alt="Delete"
                                className="reply-action-icon"
                                onClick={handleDeleteReply}
                            />
                        </>
                    )}
                </div>
                <div className="reply-like-info">
                    <img
                        src={`${imagePrefix}/shared/likes.png`}
                        className="reply-like-info-img"/>
                    <span className="reply-like-info-span"> : {likeCount}</span>
                </div>
            </div>
            <p>{reply.content}</p>

            <UpdateReplyModal
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
