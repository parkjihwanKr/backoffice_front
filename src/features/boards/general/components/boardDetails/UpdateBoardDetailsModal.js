import React from 'react';
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
import './UpdateBoardDetailsModal.css';

const UpdateBoardDetailsModal = ({ show, handleClose, editForm, setEditForm, handleEditSubmit, handleFileChange }) => {
    if (!show) return null;

    return (
        <div className="edit-board-modal-overlay">
            <div className="edit-board-modal">
                <div className="edit-board-modal-header">
                    <h2>게시글 수정</h2>
                    <CloseImageButton handleClose={handleClose} />
                </div>
                <div className="edit-board-modal-body">
                    <form>
                        <div className="form-group">
                            <label>제목</label>
                            <input
                                type="text"
                                value={editForm.title}
                                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>내용</label>
                            <textarea
                                rows={3}
                                value={editForm.content}
                                onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>카테고리</label>
                            <select
                                value={editForm.category}
                                onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                                className="form-control"
                            >
                                <option value="회의실">회의실</option>
                                <option value="전체 알림">전체 알림</option>
                                <option value="협업">협업</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>파일 업로드</label>
                            <input
                                type="file"
                                multiple
                                onChange={handleFileChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={editForm.isImportant}
                                    onChange={(e) => setEditForm({ ...editForm, isImportant: e.target.checked })}
                                    className="checkbox-control"
                                />
                                <span> 중요</span>
                            </label>
                        </div>
                    </form>
                </div>
                <div className="edit-board-modal-footer">
                    <button onClick={handleEditSubmit} className="btn-primary">
                        저장
                    </button>
                    <button onClick={handleClose} className="btn-secondary">
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateBoardDetailsModal;
