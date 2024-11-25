import React from 'react';
import './DeleteModal.css';
import DeleteButton from "../../../../../components/ui/buttons/DeleteButton";
import {Button} from "react-bootstrap";
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";

const DeleteModal = ({ show, handleClose, handleDeleteSubmit }) => {
    if (!show) return null;

    return (
        <div className="delete-board-modal-overlay">
            <div className="delete-board-modal">
                <div className="delete-board-modal-header">
                    <h2>게시글 삭제</h2>
                    <CloseImageButton handleClose={handleClose}/>
                </div>
                <div className="delete-board-modal-body">
                    정말로 게시글을 삭제하시겠습니까?
                </div>
                <div className="delete-board-modal-footer">
                    <DeleteButton onSubmit={handleDeleteSubmit}/>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
