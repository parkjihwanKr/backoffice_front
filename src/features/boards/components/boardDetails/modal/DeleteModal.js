import React from 'react';
import '../../../../../components/ui/modal/Modal.css';
import DeleteButton from "../../../../../components/ui/buttons/DeleteButton";
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";

const DeleteModal = ({ show, handleClose, handleDeleteSubmit }) => {
    if (!show) return null;

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <h3>게시글 삭제</h3>
                    <CloseImageButton handleClose={handleClose}/>
                </div>
                <div className="custom-modal-body">
                    <p>정말로 게시글을 삭제하시겠습니까?</p>
                </div>
                <div className="custom-modal-footer">
                    <DeleteButton onSubmit={handleDeleteSubmit}/>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
