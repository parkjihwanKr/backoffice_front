import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './UpdateBoardDetailsModal.css';
import { addModalAlignmentListener, adjustModalAlignment } from "../../../../../utils/ModalUtils";
import { imagePrefix } from "../../../../../utils/Constant";

const UpdateBoardDetailsModal = ({
                                     show,
                                     handleClose,
                                     board,
                                     setBoard,
                                     handleFileChange,
                                     handleEditSubmit,
                                 }) => {
    const modalOverlayRef = useRef(null);
    const modalContentRef = useRef(null);
    const location = useLocation(); // URL 정보 가져오기

    const [editForm, setEditForm] = useState({
        title: '',
        content: '',
        category: '',
        isImportant: false, // 추가
        isLocked: false, // 추가
        files: []
    });

    // 모달 열릴 때 board 데이터를 editForm으로 복사
    useEffect(() => {
        if (show && board) {
            setEditForm({
                title: board.title || '',
                content: board.content || '',
                category: board.category || '',
                isImportant: board.isImportant || false,
                isLocked: board.isLocked || false, // 초기값 설정
                files: []
            });
        }
    }, [show, board]);

    useEffect(() => {
        if (show) {
            const modalOverlay = modalOverlayRef.current;
            const modalContent = modalContentRef.current;

            adjustModalAlignment(modalOverlay, modalContent);
            return addModalAlignmentListener(modalOverlay, modalContent);
        }
    }, [show]);

    const handleToggleIsImportant = () => {
        setEditForm((prev) =>
            ({ ...prev, isImportant: !prev.isImportant })); // isImportant 값 반전
    };

    const handleToggleIsLocked = () => {
        setEditForm((prev) =>
            ({ ...prev, isLocked: !prev.isLocked })); // isLocked 값 반전
    };

    const handleSubmit = async () => {
        try {
            const updatedBoard = await handleEditSubmit(editForm, isDepartmentBoard); // API 요청
            setBoard(updatedBoard); // API 성공 시 board 업데이트
            handleClose(); // 모달 닫기
        } catch (error) {
            console.error('게시글 수정 오류:', error);
        }
    };

    if (!show) return null;

    const isDepartmentBoard = location.pathname.includes("/departments/"); // 부서 게시판 여부 확인

    return (
        <div className="edit-board-modal-overlay" ref={modalOverlayRef}>
            <div className="edit-board-modal" ref={modalContentRef}>
                <div className="edit-board-modal-header">
                    <div className="edit-board-modal-header-left">
                        <img
                            src={
                                editForm.isImportant
                                    ? `${imagePrefix}/shared/isImportant_true.png`
                                    : `${imagePrefix}/shared/isImportant_false.png`
                            }
                            alt={editForm.isImportant ? "Important" : "Not Important"}
                            onClick={handleToggleIsImportant}
                        />
                        {isDepartmentBoard && (
                            <img
                                src={
                                    editForm.isLocked
                                        ? `${imagePrefix}/shared/lock.png`
                                        : `${imagePrefix}/shared/unlock.png`
                                }
                                alt={editForm.isLocked ? "Locked" : "Unlocked"}
                                onClick={handleToggleIsLocked}
                            />
                        )}
                    </div>
                    <h2 className="edit-board-modal-header-center">게시글 수정</h2>
                </div>
                <div className="edit-board-modal-body">
                    <form>
                        <div className="form-group">
                            <label>제목</label>
                            <input
                                type="text"
                                value={editForm.title}
                                onChange={(e) =>
                                    setEditForm({ ...editForm, title: e.target.value })
                                }
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>내용</label>
                            <textarea
                                rows={3}
                                value={editForm.content}
                                onChange={(e) =>
                                    setEditForm({ ...editForm, content: e.target.value })
                                }
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>카테고리</label>
                            <select
                                value={editForm.category}
                                onChange={(e) =>
                                    setEditForm({ ...editForm, category: e.target.value })
                                }
                                className="form-control"
                            >
                                <option value="회의실">회의실</option>
                                <option value="전체 알림">전체 알림</option>
                                <option value="협업">협업</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>파일 업로드</label>
                            <input
                                type="file"
                                multiple
                                onChange={handleFileChange}
                                className="form-control"
                            />
                        </div>
                    </form>
                </div>
                <div className="edit-board-modal-footer">
                    <button onClick={handleSubmit} className="board-submit-button">
                        저장
                    </button>
                    <button onClick={handleClose} className="board-cancel-button">
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateBoardDetailsModal;
