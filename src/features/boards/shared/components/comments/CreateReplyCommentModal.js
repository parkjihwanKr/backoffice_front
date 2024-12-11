import React, { useState } from 'react';
import './CreateReplyCommentModal.css';
import useModalScroll from '../../hooks/useModalScroll';
import CloseImageButton from '../../../../../components/ui/image/CloseImageButton';
import SubmitButton from '../../../../../components/ui/buttons/SubmitButton';
import {imagePrefix} from "../../../../../utils/Constant";
import {useAuth} from "../../../../auth/context/AuthContext";

const CreateReplyCommentModal = ({
                                     show,
                                     handleClose,
                                     handleReplySubmit,
                                     commentAuthor,
                                     commentDepartment,
                                     commentPosition,
                                     commentContent,
                                 }) => {
    const [replyContent, setReplyContent] = useState('');
    const { name, department, position } = useAuth();
    const handleSubmit = (e) => {
        // e.preventDefault();
        handleReplySubmit(replyContent); // 부모 컴포넌트에서 전달받은 답글 제출 함수 실행
        handleClose(); // 모달 닫기
    };

    useModalScroll(show); // 모달이 열릴 때 스크롤 잠금

    if (!show) return null;

    return (
        <div className="create-reply-modal-overlay">
            <div className="create-reply-modal">
                <CloseImageButton handleClose={handleClose} />
                <div className="create-reply-modal-header">
                    <h2 className="create-reply-modal-title">답글 작성</h2>
                </div>
                <div className="create-reply-modal-body">
                    <div className="create-reply-modal-body-row-1">
                        <div className="create-reply-modal-body-column">
                            <img src={`${imagePrefix}/shared/user_info.png`}/>
                            <div className="create-reply-modal-body-column-user-info">
                                {name} <br/>
                                ({department}, {position})
                            </div>
                        </div>
                        <img
                            src={`${imagePrefix}/shared/right_arrow.png`}
                            alt="arrow"
                            className="arrow-container"/>
                        <div className="create-reply-modal-body-column">
                            <img src={`${imagePrefix}/shared/user_info.png`}/>
                            <div className="create-reply-modal-body-column-user-info">
                                {commentAuthor} <br/>
                                ({commentDepartment}, {commentPosition})
                            </div>
                        </div>
                    </div>
                    <div className="reply-divider"/>
                    <div className="create-reply-modal-body-row-2">
                        {commentContent}
                    </div>
                    <div className="reply-divider"/>
                    <div className="create-reply-modal-body-row-3">
                        <div className="comment-reply-container">
                            <img src={`${imagePrefix}/shared/commentReply.png`}/>
                        </div>
                        <div style={{flex: 1}}> {/* 텍스트 영역이 남은 공간을 차지하도록 설정 */}
                            <form onSubmit={handleSubmit}>
                                <textarea
                                    className="create-reply-textarea"
                                    rows="3"
                                    value={replyContent}
                                    onChange={(e) => setReplyContent(e.target.value)}
                                    placeholder="답글을 입력하세요"
                                    required
                                />
                                <div className="create-reply-modal-footer">
                                    <SubmitButton onSubmit={handleSubmit} text="댓글 작성"/> {/* SubmitButton 연결 */}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateReplyCommentModal;
