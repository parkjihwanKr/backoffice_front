import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
import SubmitButton from "../../../../../components/ui/buttons/SubmitButton";
import useModalScroll from "../../../../../hooks/useModalScroll";

const DeleteProfileImageModal = ({handleDeleteProfileImage, show, onClose}) => {
    useModalScroll(show);
    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <h3>프로필 사진 삭제</h3>
                    <CloseImageButton handleClose={onClose} />
                </div>
                <div className="custom-modal-body">
                    <p> 정말로 프로필 사진을 삭제하시겠습니까?</p>
                </div>
                <div className="custom-modal-footer">
                    <SubmitButton onSubmit={handleDeleteProfileImage} text={"삭제"}/>
                </div>
            </div>
        </div>
    );
}
export default DeleteProfileImageModal;