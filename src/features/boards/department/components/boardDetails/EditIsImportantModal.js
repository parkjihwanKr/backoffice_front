import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const EditIsImportantModal = ({ show, handleClose, handleEditIsImportantSubmit }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>중요 표시 상태 변경</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                게시글의 중요 표시 상태를 변경하시겠습니까?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleEditIsImportantSubmit}>
                    확인
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    취소
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditIsImportantModal;
