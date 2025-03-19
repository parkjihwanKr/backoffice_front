import React, {useEffect} from 'react';
import {imagePrefix} from "../../../../utils/Constant";
import {AuthProvider} from "../../../auth/context/AuthContext";

const BoardDetailsHeader =
    ({
         title,
         isImportant,
         isLocked,
         name,
         board,
         setShowEditModal,
         setShowDeleteModal,
         isDepartmentBoard,
         toggleImportant,
         toggleLocked
     }) => {

        useEffect(() => {
            console.log("isOwner :"+ board.author === name);
        }, []);

        return (
            <div className="board-details-card-header">
                <div className="left-action-icons">
                    <img
                        src={isImportant ?
                            `${imagePrefix}/shared/isImportant_true.png` :
                            `${imagePrefix}/shared/isImportant_false.png`}
                        alt={isImportant ? 'important!' : 'not important'}
                        className="board-details-important-icon"
                        onClick={toggleImportant} // 중요도 변경
                    />
                    {isDepartmentBoard && ( // 파라미터에 따라 isLocked 표시
                        <img
                            src={isLocked
                                ? `${imagePrefix}/shared/lock.png`
                                : `${imagePrefix}/shared/unlock.png`}
                            alt={isLocked ? 'lock' : 'unlock'}
                            className="board-details-lock-icon"
                            onClick={toggleLocked} // 잠금 상태 변경
                        />
                    )}
                </div>
                <h2>{title}</h2>

                {/* 게시글 주인일 경우 항상 수정/삭제 아이콘 표시 */}
                {name === board.author && (
                    <div className="right-action-icons">
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
