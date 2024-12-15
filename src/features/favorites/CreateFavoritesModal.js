import React, { useState } from "react";
import '../../components/ui/modal/Modal.css';
import CloseImageButton from "../../components/ui/image/CloseImageButton";

const CreateFavoritesModal = ({ currentUrl, onClose, onConfirm }) => {
    const [description, setDescription] = useState("");

    const handleConfirm = () => {
        onConfirm(description);
    };

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <h3>즐겨찾기 추가</h3>
                    <CloseImageButton handleClose={onClose} />
                </div>
                <div className="custom-modal-body">
                    <p>현재 URL: {currentUrl}</p>
                    <div className="custom-modal-body-index">
                        <label className="custom-modal-body-content-label">설명:</label>
                        <input
                            type="text"
                            className="custom-modal-body-textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="즐겨찾기 설명을 입력하세요"
                        />
                    </div>
                </div>
                <div className="custom-modal-footer">
                    <button onClick={handleConfirm} className="confirm-button">
                        추가
                    </button>
                    <button onClick={onClose} className="cancel-button">
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateFavoritesModal;
