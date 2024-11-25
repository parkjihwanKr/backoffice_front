import React from 'react';
import './DeleteReplyModal.css';
import CloseImageButton from "../../../../../../components/ui/image/CloseImageButton";
import SubmitButton from "../../../../../../components/ui/buttons/SubmitButton";
import DeleteButton from "../../../../../../components/ui/buttons/DeleteButton";

const DeleteReplyModal = ({ show, handleClose, handleDeleteSubmit }) => {
    if (!show) return null;

    return (
        <div className="delete-reply-modal-overlay">
            <div className="delete-reply-modal">
                <div className="delete-reply-modal-header">
                    <h2>답글 삭제</h2>
                    <CloseImageButton handleClose={handleClose} />
                </div>
                <div className="delete-reply-modal-body">
                    정말로 이 답글을 삭제하시겠습니까?
                </div>
                <div className="delete-reply-modal-footer">
                    <DeleteButton onSubmit={handleDeleteSubmit}/>
                </div>
            </div>
        </div>
    );
};

export default DeleteReplyModal;
