import React from 'react';
import {Button, Form, Modal} from 'react-bootstrap';

const EditModal = ({ show, handleClose, editForm, setEditForm, handleEditSubmit, handleFileChange }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>게시글 수정</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>제목</Form.Label>
                        <Form.Control
                            type="text"
                            value={editForm.title}
                            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>내용</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={editForm.content}
                            onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>카테고리</Form.Label>
                        <Form.Control
                            as="select"
                            value={editForm.category}
                            onChange={(e) => {
                                console.log("Selected Category:", e.target.value); // 선택된 카테고리 로그 확인
                                setEditForm({ ...editForm, category: e.target.value });
                            }}
                        >
                            <option value="회의실">회의실</option>
                            <option value="전체 알림">전체 알림</option>
                            <option value="협업">협업</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>파일 업로드</Form.Label>
                        <Form.Control
                            type="file"
                            multiple
                            onChange={handleFileChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check
                            type="checkbox"
                            label="중요"
                            checked={editForm.isImportant}
                            onChange={(e) => setEditForm({ ...editForm, isImportant: e.target.checked })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check
                            type="checkbox"
                            label="잠금 여부"
                            checked={editForm.isLocked}
                            onChange={(e) => setEditForm({ ...editForm, isLocked: e.target.checked })}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleEditSubmit}>
                    저장
                </Button>

                <Button variant="secondary" onClick={handleClose}>
                    취소
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditModal;
