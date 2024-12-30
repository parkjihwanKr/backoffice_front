import React from 'react';
import './DeleteCommentModal.css';
import CloseImageButton from '../../../../components/ui/image/CloseImageButton';
import DeleteButton from "../../../../components/ui/buttons/DeleteButton";

const DeleteCommentModal = ({ show, handleClose, handleDeleteSubmit }) => {
    if (!show) return null;

    return (
        <div className="delete-comment-modal-overlay">
            <div className="delete-comment-modal">
                <CloseImageButton handleClose={handleClose} />
                <div className="delete-comment-modal-header">
                    <h2 className="delete-comment-modal-title">댓글 삭제</h2>
                </div>
                <div className="delete-comment-modal-body">
                    <p>이 댓글을 정말로 삭제하시겠습니까?</p>
                </div>
                <div className="delete-comment-modal-footer">
                    <DeleteButton onSubmit={handleDeleteSubmit} />
                </div>
            </div>
        </div>
    );
};

export default DeleteCommentModal;
