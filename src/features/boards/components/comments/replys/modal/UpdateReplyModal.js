import React, {useState} from 'react';
import '../../../../../../components/ui/modal/Modal.css';
import CloseImageButton from "../../../../../../components/ui/image/CloseImageButton";
import useModalScroll from "../../../../hooks/useModalScroll";
import SubmitButton from "../../../../../../components/ui/buttons/SubmitButton";

const UpdateReplyModal
    = ({show, handleClose,
           replyContent, handleEditSubmit }) => {
    const [newContent, setNewContent] = useState(replyContent);
    const handleSaveChanges = () => {
        handleEditSubmit(newContent);
        handleClose();
    };

    useModalScroll(show);
    if (!show) return null;

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <CloseImageButton handleClose={handleClose}/>
                    <h3>답글 수정</h3>
                </div>
                <div className="custom-modal-body">
                    <textarea
                        className="custom-modal-body-textarea"
                        rows="3"
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        placeholder="답글을 수정하세요"
                    />
                </div>
                <div className="custom-modal-footer">
                    <SubmitButton onSubmit={handleSaveChanges} text="수정"/>
                </div>
            </div>
        </div>
    );
};

export default UpdateReplyModal;
