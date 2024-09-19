import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ReplyCommentModal = ({ show, handleClose, handleReplySubmit, commentAuthor, commentDepartment, commentPosition, commentContent }) => {
    const [replyContent, setReplyContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleReplySubmit(replyContent);  // 부모로부터 전달된 답글 제출 함수 호출
        handleClose();  // 모달 닫기
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>답글 작성</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <strong>작성자:</strong> {commentAuthor} ({commentDepartment}, {commentPosition})
                </div>
                <div>
                    <strong>댓글 내용:</strong> {commentContent}
                </div>
                <form onSubmit={handleSubmit}>
                    <textarea
                        className="form-control mt-3"
                        rows="3"
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="답글을 입력하세요"
                        required
                    />
                    <div className="text-end mt-3">
                        <Button variant="secondary" onClick={handleClose}>
                            취소
                        </Button>
                        <Button variant="primary" type="submit">
                            답글 작성
                        </Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default ReplyCommentModal;
