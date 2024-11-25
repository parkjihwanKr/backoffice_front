import React from 'react';
import './Comments.css';
import EditCommentModal from "./UpdateCommentModal";
import DeleteCommentModal from "./DeleteCommentModal";
import CreateReplyCommentModal from './CreateReplyCommentModal';
import Reply from './replys/Reply';
import {imagePrefix} from '../../../../../utils/Constant';
import {useComments} from './hooks/useComments';
import SubmitButton from "../../../../../components/ui/buttons/SubmitButton";

const Comments = ({ comments, name, boardId, accessToken, setComments }) => {
    const {
        comment,
        setComment,
        likedComments,
        hoveredCommentId,
        setHoveredCommentId,
        showEditModal,
        setShowEditModal,
        editingCommentContent,
        commentIdToEdit,
        showDeleteModal,
        setShowDeleteModal,
        commentIdToDelete,
        showReplyModal,
        setShowReplyModal,
        commentToReply,
        setCommentToReply,
        showReplies,
        handleCommentSubmit,
        handleReply,
        handleReplySubmit,
        handleCommentLike,
        toggleShowReplies,
        handleEditComment,
        handleDeleteComment,
        handleEditSubmit,
        handleDeleteSubmit,
    } = useComments(boardId, comments, setComments);

    return (
        <div className="comments-section">
            <div className="create-comment-section">
                <h3 className="create-comment-section-header">댓글 작성</h3>
                <form onSubmit={handleCommentSubmit}>
                <textarea
                    className="create-comment-section-body"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows="1"
                    placeholder="댓글을 입력하세요"
                    required
                />
                    <div className="create-comment-section-footer">
                        <SubmitButton onSubmit={handleCommentSubmit} text="댓글 작성"/>
                    </div>
                </form>
            </div>

            {comments.length > 0 && (
                <div className="comments-list-section">
                <h3>댓글 리스트</h3>
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
                                            className="comment-action-icon"
                                            onClick={() => handleReply(comment)}
                                        />
                                        <img
                                            src={likedComments[comment.commentId]?.liked ? `${imagePrefix}/shared/likes_done.png` : `${imagePrefix}/shared/commentListLike.png`}
                                            alt={likedComments[comment.commentId]?.liked ? 'liked' : 'likes'}
                                            className="comment-action-icon"
                                            onClick={() => handleCommentLike(comment.commentId)}
                                        />
                                        {comment.author === name && (
                                            <>
                                                <img
                                                    src={`${imagePrefix}/shared/edit_document.png`}
                                                    alt="Edit"
                                                    className="comment-action-icon"
                                                    onClick={() => handleEditComment(comment.commentId, comment.content)}
                                                />
                                                <img
                                                    src={`${imagePrefix}/shared/delete.png`}
                                                    alt="Delete"
                                                    className="comment-action-icon"
                                                    onClick={() => handleDeleteComment(comment.commentId)}
                                                />
                                            </>
                                        )}
                                    </div>
                                </div>

                                {hoveredCommentId === comment.commentId && (
                                    <div className="comment-like-info">
                                        <img
                                            src={`${imagePrefix}/shared/likes.png`}/>
                                        <span className="comment-like-count"> : {comment.likeCount}</span>
                                    </div>
                                )}

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

            <CreateReplyCommentModal
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
