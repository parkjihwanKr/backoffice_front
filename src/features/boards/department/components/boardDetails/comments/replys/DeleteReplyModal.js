import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DeleteReplyModal = ({ show, handleClose, handleDeleteSubmit }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>답글 삭제</Modal.Title>
            </Modal.Header>
            <Modal.Body>정말로 이 답글을 삭제하시겠습니까?</Modal.Body>
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

export default DeleteReplyModal;
