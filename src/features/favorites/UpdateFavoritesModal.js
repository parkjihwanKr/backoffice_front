import '../../components/ui/modal/Modal.css';
import CloseImageButton from "../../components/ui/image/CloseImageButton";
import React, {useState} from "react";
import SubmitButton from "../../components/ui/buttons/SubmitButton";

const UpdateFavoritesModal = ({ onClose, favorites, onUpdate }) => {
    const [description, setDescription] = useState(favorites.description);

    const handleUpdate = async () => {
        onUpdate(favorites.favoritesId, description);
    };

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <h3>즐겨찾기 수정</h3>
                    <CloseImageButton handleClose={onClose} />
                </div>
                <div className="custom-modal-body">
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
                    <div className="caution-description">
                        현재 즐겨찾기 URL : {favorites.favoritesUrl}
                    </div>
                    <div className="caution-description">
                        ※ 즐겨 찾기 URL은 변경하실 수 없습니다.
                    </div>
                </div>
                <div className="custom-modal-footer">
                    <SubmitButton onSubmit={handleUpdate} text={"수정"} />
                </div>
            </div>
        </div>
    );
};

export default UpdateFavoritesModal;
