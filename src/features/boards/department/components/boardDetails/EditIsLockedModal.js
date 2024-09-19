import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const EditIsLockedModal = ({ show, handleClose, handleEditIsLockedSubmit }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>잠금 상태 변경</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                게시글의 잠금 상태를 변경하시겠습니까?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleEditIsLockedSubmit}>
                    확인
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    취소
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditIsLockedModal;
