import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const EditReplyModal = ({ show, handleClose, replyContent, handleEditSubmit }) => {
    const [newContent, setNewContent] = useState(replyContent);

    const handleSaveChanges = () => {
        handleEditSubmit(newContent);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>답글 수정</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <textarea
                    className="form-control"
                    rows="3"
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="답글을 수정하세요"
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    취소
                </Button>
                <Button variant="primary" onClick={handleSaveChanges}>
                    저장
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditReplyModal;
