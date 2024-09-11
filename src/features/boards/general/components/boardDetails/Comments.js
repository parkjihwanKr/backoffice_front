import React, { useState } from 'react';
import './Comments.css'; // CSS 파일을 추가합니다

const Comments = ({ comments, userName, boardId, accessToken, setComments }) => {
    const [comment, setComment] = useState('');
    const imagePrefix = 'https://pjhawss3bucket.s3.ap-northeast-2.amazonaws.com/backoffice';

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

            // 서버에서 새로 작성된 댓글을 응답받음
            const newComment = await response.json();

            // 새로운 댓글을 기존 댓글 리스트에 추가
            setComments(prevComments => [...prevComments, newComment]);
            setComment(''); // 댓글 입력란 초기화
            window.location.reload();
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleReply = (commentId) => {

    };

    const handleEdit = (commentId) => {
        // 수정 로직 추가
        console.log(`Edit comment with ID: ${commentId}`);
    };

    const handleDelete = (commentId) => {
        // 삭제 로직 추가
        console.log(`Delete comment with ID: ${commentId}`);
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

            <hr/>

            {comments.length > 0 && (
                <div className="comments-list">
                    <h5>댓글 리스트</h5>
                    {comments.map((comment) => (
                        <div key={comment.commentId} className="comment-card">
                            <div className="comment-meta">
                            <span className="comment-writer">
                                {comment.commentWriter} ({comment.commentWriterDepartment}, {comment.commentWriterPosition})
                            </span>
                                {/* 자신이 작성한 댓글일 경우에만 수정/삭제 아이콘 표시 */}
                                {comment.commentWriter === userName && (
                                    <div className="comment-actions">
                                        <img
                                            src={`${imagePrefix}/shared/reply.png`}
                                            alt="Edit"
                                            className="action-icon"
                                            onClick={() => handleReply(comment.commentId)}
                                        />
                                        <img
                                            src={`${imagePrefix}/shared/edit_document.png`}
                                            alt="Edit"
                                            className="action-icon"
                                            onClick={() => handleEdit(comment.commentId)}
                                        />
                                        <img
                                            src={`${imagePrefix}/shared/delete.png`}
                                            alt="Delete"
                                            className="action-icon"
                                            onClick={() => handleDelete(comment.commentId)}
                                        />
                                    </div>
                                )}
                            </div>
                            <p className="comment-content">{comment.commentContent}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Comments;
