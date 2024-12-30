import React, { useState } from 'react';
import './UpdateCommentModal.css';
import useModalScroll from '../../hooks/useModalScroll';
import CloseImageButton from '../../../../components/ui/image/CloseImageButton';
import SubmitButton from '../../../../components/ui/buttons/SubmitButton';

const UpdateCommentModal = ({
                                show,
                                handleClose,
                                commentContent,
                                handleEditSubmit,
                            }) => {
    const [newContent, setNewContent] = useState(commentContent);

    const handleSubmit = (e) => {
        // e.preventDefault();
        handleEditSubmit(newContent); // 부모 컴포넌트에서 전달받은 수정 함수 실행
        handleClose(); // 모달 닫기
    };

    useModalScroll(show); // 모달이 열릴 때 스크롤 잠금

    if (!show) return null;

    return (
        <div className="update-comment-modal-overlay">
            <div className="update-comment-modal">
                <CloseImageButton handleClose={handleClose} />
                <div className="update-comment-modal-header">
                    <h2 className="update-comment-modal-title">댓글 수정</h2>
                </div>
                <div className="update-comment-modal-body">
                    <form onSubmit={handleSubmit}>
                        <textarea
                            className="update-comment-textarea"
                            rows="4"
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                            placeholder="댓글을 수정하세요"
                            required
                        />
                        <div className="update-comment-modal-footer">
                            <SubmitButton onSubmit={handleSubmit} text="댓글 수정"/> {/* SubmitButton 연결 */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateCommentModal;
