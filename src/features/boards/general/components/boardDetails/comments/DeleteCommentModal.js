import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteCommentModal = ({ show, handleClose, handleDeleteSubmit }) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>댓글 삭제</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>이 댓글을 정말로 삭제하시겠습니까?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    취소
                </Button>
                <Button variant="danger" onClick={handleDeleteSubmit}>
                    삭제
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteCommentModal;
