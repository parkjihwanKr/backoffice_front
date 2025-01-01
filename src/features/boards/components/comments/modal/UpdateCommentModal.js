import React, { useState } from 'react';
import '../../../../../components/ui/modal/Modal.css';
import useModalScroll from '../../../../../hooks/useModalScroll';
import CloseImageButton from '../../../../../components/ui/image/CloseImageButton';
import SubmitButton from '../../../../../components/ui/buttons/SubmitButton';

const UpdateCommentModal = ({
                                show,
                                handleClose,
                                commentContent,
                                handleEditSubmit,
                            }) => {
    const [newContent, setNewContent] = useState(commentContent);

    useModalScroll(show);
    if (!show) return null;

    const handleSubmit = () => {
        handleEditSubmit(newContent);
        handleClose();
    };

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <CloseImageButton handleClose={handleClose} />
                    <h3>댓글 수정</h3>
                </div>
                <div className="custom-modal-body">
                    <form onSubmit={handleSubmit}>
                        <textarea
                            className="custom-modal-body-textarea"
                            rows="4"
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                            placeholder="댓글을 수정하세요"
                            required
                        />
                        <div className="custom-modal-footer">
                            <SubmitButton onSubmit={handleSubmit} text="댓글 수정"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateCommentModal;
