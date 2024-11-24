import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCookie } from "../../../../../utils/CookieUtil";
import { useAuth } from "../../../../auth/context/AuthContext";
import Comments from "../comments/Comments";
import BoardDetailsFooter from "./BoardDetailsFooter";
import "./BoardDetails.css";

import DeleteModal from "./DeleteModal";
import BoardDetailsHeader from "./BoardDetailsHeader";
import BoardDetailsBody from "./BoardDetailsBody";
import UpdateBoardDetailsModal from "./UpdateBoardDetailsModal";

import useBoardDetails from "../../hooks/useBoardDetails";
import useModalScroll from "../../hooks/useModalScroll";
import { updateBoardDetails, deleteBoardDetails } from "../../services/BoardsService";
import {useError, useLoading} from "../../../../utils/LoadingUtils";

const BoardDetails = () => {
    const { boardId } = useParams();
    const navigate = useNavigate();
    const { userId, name, department } = useAuth();

    // API 데이터를 관리하는 커스텀 훅
    const { board, setBoard, comments, setComments, loading, error } = useBoardDetails(boardId);

    // 파일 업로드 상태
    const [files, setFiles] = useState([]);

    // 모달 상태
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // 모달이 열렸을 때 스크롤 비활성화
    useModalScroll(showEditModal || showDeleteModal);

    // 게시글 수정 API 호출
    const handleEditSubmit = async (editForm, isDepartmentBoard) => {
        try {
            const response = await updateBoardDetails(
                board.boardId, editForm, files, isDepartmentBoard, department);
            setBoard(response); // 수정된 데이터로 상태 업데이트
            setShowEditModal(false);
        } catch (error) {
            console.error("Error updating board details:", error);
        }
    };

    // 게시글 삭제 API 호출
    const handleDeleteSubmit = async () => {
        try {
            await deleteBoardDetails(boardId);
            setShowDeleteModal(false);
            navigate(`/all-boards`);
        } catch (error) {
            console.error("Error deleting board:", error);
        }
    };

    // 파일 변경 핸들러
    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    // 로딩 및 에러 처리
    const loadingJSX = useLoading(loading);
    const errorJSX = useError(error);

    if (loadingJSX) return loadingJSX;
    if (errorJSX) return errorJSX;

    return (
        <div className={`board-details-container ${showEditModal || showDeleteModal ? "modal-open" : ""}`}>
            <div className="board-details">
                <BoardDetailsHeader
                    title={board.title}
                    isImportant={board.isImportant}
                    isLocked={board.isLocked}
                    board={board}
                    name={name}
                    setShowEditModal={setShowEditModal}
                    setShowDeleteModal={setShowDeleteModal}
                />
                <BoardDetailsBody board={board} />
                <BoardDetailsFooter
                    boardId={boardId}
                    reactionId={board.reactionList?.find((reaction) => reaction.reactorId === userId)?.reactionId}
                    reactionList={board.reactionList}
                    name={name}
                    accessToken={getCookie("accessToken")}
                    likeCount={board.likeCount}
                    commentCount={board.commentCount}
                    viewCount={board.viewCount}
                />
            </div>
            <Comments
                comments={comments}
                name={name}
                boardId={boardId}
                accessToken={getCookie("accessToken")}
                setComments={setComments}
            />
            <UpdateBoardDetailsModal
                show={showEditModal}
                handleClose={() => setShowEditModal(false)}
                board ={board}
                setEditForm={(newEditForm) => setBoard({ ...board, ...newEditForm })}
                handleEditSubmit={handleEditSubmit}
                handleFileChange={handleFileChange}
            />
            <DeleteModal
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                handleDeleteSubmit={handleDeleteSubmit}
            />
        </div>
    );
};

export default BoardDetails;
