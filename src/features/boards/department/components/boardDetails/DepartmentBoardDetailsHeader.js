import React from 'react';
import './DepartmentBoardDetailsHeader.css';

const DepartmentBoardDetailsHeader = ({ title, isImportant, isLocked, imagePrefix, name, board, setShowEditModal, setShowIsLockedEditModal, setShowIsImportantEditModal, setShowDeleteModal }) => {
    return (
        <div className="card-header">
            <div className="icon">
                {/* 중요 여부 아이콘 */}
                <img
                    src={isImportant ? `${imagePrefix}/shared/isImportant_true.png` : `${imagePrefix}/shared/isImportant_false.png`}
                    alt={isImportant ? 'important!' : 'not important'}
                    className="important-icon"
                    onClick={(e) => {
                        e.stopPropagation(); // 이벤트 버블링 방지
                        setShowIsImportantEditModal(true);
                    }}
                />

                {/* 잠금 상태 아이콘 */}
                <img
                    src={isLocked ? `${imagePrefix}/shared/lock.png` : `${imagePrefix}/shared/unlock.png`}
                    alt={isLocked ? 'lock' : 'unlock'}
                    className="important-icon"
                    onClick={(e) => {
                        e.stopPropagation(); // 이벤트 버블링 방지
                        setShowIsLockedEditModal(true); // 잠금 상태 변경 모달만 열림
                    }}
                    style={{ left: '40px' }}
                />
            </div>

            <h2>{title}</h2>

            {/* 게시글 작성자만 수정/삭제 가능 */}
            {name === board.author && (
                <div className="action-icons">
                    {/* 수정 아이콘 */}
                    <img
                        src={`${imagePrefix}/shared/edit_document.png`}
                        alt="Edit"
                        className="edit-icon"
                        onClick={(e) => {
                            e.stopPropagation(); // 이벤트 버블링 방지
                            setShowEditModal(true); // 게시글 수정 모달만 열림
                        }}
                    />
                    {/* 삭제 아이콘 */}
                    <img
                        src={`${imagePrefix}/shared/delete.png`}
                        alt="Delete"
                        className="delete-icon"
                        onClick={(e) => {
                            e.stopPropagation(); // 이벤트 버블링 방지
                            setShowDeleteModal(true);
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default DepartmentBoardDetailsHeader;
