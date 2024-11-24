import React from 'react';
import './DeleteModal.css';

const DeleteModal = ({ show, handleClose, handleDeleteSubmit }) => {
    if (!show) return null;

    return (
        <div className="delete-board-modal-overlay">
            <div className="delete-board-modal">
                <div className="delete-board-modal-header">
                    <h2>게시글 삭제</h2>
                </div>
                <div className="delete-board-modal-body">
                    정말로 게시글을 삭제하시겠습니까?
                </div>
                <div className="delete-board-modal-footer">
                    <button className="delete-board-modal-button delete" onClick={handleDeleteSubmit}>
                        삭제
                    </button>
                    <button className="delete-board-modal-button cancel" onClick={handleClose}>
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
