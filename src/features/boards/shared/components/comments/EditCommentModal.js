import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'; // Bootstrap 컴포넌트 import

const EditCommentModal = ({ show, handleClose, commentContent, handleEditSubmit }) => {
    const [newContent, setNewContent] = useState(commentContent);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleEditSubmit(newContent);  // 부모로부터 전달된 수정 함수 호출
        handleClose();  // 모달 닫기
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>댓글 수정</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="editComment">
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                            placeholder="댓글을 수정하세요"
                        />
                    </Form.Group>
                    <div className="text-end mt-3">
                        <Button variant="secondary" onClick={handleClose} className="me-2">
                            취소
                        </Button>
                        <Button variant="primary" type="submit">
                            수정 제출
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditCommentModal;
