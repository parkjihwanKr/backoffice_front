import React, { useState } from 'react';
import './UpdateReplyModal.css';
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
import useModalScroll from "../../../hooks/useModalScroll";
import SubmitButton from "../../../../../components/ui/buttons/SubmitButton";
import {imagePrefix} from "../../../../../utils/Constant";
import {useAuth} from "../../../../auth/context/AuthContext";

const UpdateReplyModal
    = ({show, handleClose,
           replyContent, handleEditSubmit }) => {
    const [newContent, setNewContent] = useState(replyContent);
    const { name, department, position} = useAuth();
    const handleSaveChanges = () => {
        handleEditSubmit(newContent);
        handleClose();
    };

    useModalScroll(show);

    if (!show) return null;

    return (
        <div className="update-reply-modal-overlay">
            <div className="update-reply-modal">
                <div className="update-reply-modal-header">
                    <h2 className="update-reply-modal-title">답글 수정</h2>
                    <CloseImageButton handleClose={handleClose}/>
                </div>
                <div className="update-reply-modal-body">
                    <textarea
                        className="update-reply-textarea"
                        rows="3"
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        placeholder="답글을 수정하세요"
                    />
                </div>
                <div className="update-reply-modal-footer">
                    <SubmitButton onSubmit={handleSaveChanges} text="수정"/>
                </div>
            </div>
        </div>
    );
};

export default UpdateReplyModal;
