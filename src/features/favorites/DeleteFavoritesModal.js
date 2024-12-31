import React from "react";
import '../../components/ui/modal/Modal.css';
import CloseImageButton from "../../components/ui/image/CloseImageButton";
import SubmitButton from "../../components/ui/buttons/SubmitButton";

const DeleteFavoritesModal = ({ favorite, onClose, onDelete }) => {
    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <h3>즐겨찾기 삭제</h3>
                    <CloseImageButton handleClose={onClose}/>
                </div>
                <div className="custom-modal-body">
                    <p>다음 즐겨찾기를 삭제하시겠습니까?</p>
                    <p><strong>{favorite.url}</strong></p>
                </div>
                <div className="custom-modal-footer">
                    <SubmitButton onSubmit={onDelete} text={"삭제"}/>
                </div>
            </div>
        </div>
    );
};

export default DeleteFavoritesModal;
