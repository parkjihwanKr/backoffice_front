import React, {useEffect, useState} from "react";
import '../../components/ui/modal/Modal.css';
import CloseImageButton from "../../components/ui/image/CloseImageButton";
import ConfirmButton from "../../components/ui/buttons/ConfirmButton";

const CreateFavoritesModal = ({ onClose, onConfirm }) => {
    const [description, setDescription] = useState("");
    const [currentUrl, setCurrentUrl] = useState(null);

    const handleConfirm = () => {
        onConfirm(description);
    };

    useEffect(() => {
        setCurrentUrl(window.location.href);
    }, []);

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <h3>즐겨찾기 추가</h3>
                    <CloseImageButton handleClose={onClose} />
                </div>
                <div className="custom-modal-body">
                    <div className="custom-modal-body-index">
                        <label className="custom-modal-body-content-label">
                            설명 :
                        </label>
                        <input
                            type="text"
                            className="custom-modal-body-textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="즐겨찾기 설명을 입력하세요"
                        />
                    </div>
                    <div className="custom-modal-body-text">
                        ※ {currentUrl}
                    </div>
                </div>
                <div className="custom-modal-footer">
                    <ConfirmButton onClick={handleConfirm} text={"추가"}/>
                </div>
            </div>
        </div>
    );
};

export default CreateFavoritesModal;
