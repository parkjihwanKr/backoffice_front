import React, { useState } from 'react';
import './BoardDetailsHeader.css';

const BoardDetailsHeader = ({ title, isImportant, imagePrefix, name, board, setShowEditModal, setShowDeleteModal }) => {
    return (
        <div className="card-header">
            <div className="icon">
                <img
                    src={isImportant ? `${imagePrefix}/shared/isImportant_true.png` : `${imagePrefix}/shared/isImportant_false.png`}
                    alt={isImportant ? 'important!' : 'not important'}
                    className="important-icon"
                />
            </div>
            <h2>{title}</h2>

            {/* 게시글 주인일 경우 항상 수정/삭제 아이콘 표시 */}
            {name === board.author && (
                <div className="action-icons">
                    <img
                        src={`${imagePrefix}/shared/edit_document.png`}
                        alt="Edit"
                        className="edit-icon"
                        onClick={() => setShowEditModal(true)}
                    />
                    <img
                        src={`${imagePrefix}/shared/delete.png`}
                        alt="Delete"
                        className="delete-icon"
                        onClick={() => setShowDeleteModal(true)}
                    />
                </div>
            )}
        </div>
    );
};

export default BoardDetailsHeader;
