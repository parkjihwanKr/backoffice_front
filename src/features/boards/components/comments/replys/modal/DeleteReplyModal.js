import React from 'react';
import '../../../../../../components/ui/modal/Modal.css';
import DeleteButton from "../../../../../../components/ui/buttons/DeleteButton";
import CloseImageButton from "../../../../../../components/ui/image/CloseImageButton";

const DeleteReplyModal = ({ show, handleClose, handleDeleteSubmit }) => {
    if (!show) return null;

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <CloseImageButton handleClose={handleClose} />
                    <h3>답글 삭제</h3>
                </div>
                <div className="custom-modal-body">
                    <p>정말로 이 답글을 삭제하시겠습니까?</p>
                </div>
                <div className="custom-modal-footer">
                    <DeleteButton onSubmit={handleDeleteSubmit}/>
                </div>
            </div>
        </div>
    );
};

export default DeleteReplyModal;
