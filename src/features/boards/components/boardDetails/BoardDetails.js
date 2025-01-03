import React, {useState} from "react";
import "./BoardDetails.css";

import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../../../auth/context/AuthContext";
import Comments from "../comments/Comments";
import BoardDetailsFooter from "./BoardDetailsFooter";

import DeleteModal from "./modal/DeleteModal";
import BoardDetailsHeader from "./BoardDetailsHeader";
import BoardDetailsBody from "./BoardDetailsBody";
import UpdateBoardDetailsModal from "./modal/UpdateBoardDetailsModal";

import useBoardDetails from "../../hooks/useBoardDetails";
import useModalScroll from "../../../../hooks/useModalScroll";
import {
    deleteBoardDetails,
    patchMarkAsImportant,
    patchMarkAsLocked,
    updateBoardDetails
} from "../../services/BoardsService";
import {useError, useLoading} from "../../../../utils/LoadingUtils";

const BoardDetails = () => {
    const location = useLocation(); // 현재 URL 경로 가져오기
    // isDepartmentBoard 값을 URL에 따라 설정
    const isDepartmentBoard = location.pathname.includes("departments");

    const { boardId } = useParams();
    const navigate = useNavigate();
    const { name, department } = useAuth();

    // API 데이터를 관리하는 커스텀 훅
    const {
        board, setBoard, comments,
        setComments, loading, error }
        = useBoardDetails(boardId, department, isDepartmentBoard);

    // 파일 업로드 상태
    const [files, setFiles] = useState([]);

    // 모달 상태
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // 모달이 열렸을 때 스크롤 비활성화
    useModalScroll(showEditModal || showDeleteModal);

    // 중요도 변경
    const toggleImportant = async () => {
        try {
            const response = await patchMarkAsImportant(board.boardId);
            setBoard((prevBoard) => ({
                ...prevBoard,
                isImportant: !prevBoard.isImportant,
            }));
            alert(response.message);
        } catch (error) {
            console.error("Error toggling important status:", error);
            alert("중요도 변경에 실패했습니다.");
        }
    };

    // 잠금 상태 변경
    const toggleLocked = async () => {
        try {
            const response = await patchMarkAsLocked(board.boardId);
            setBoard((prevBoard) => ({
                ...prevBoard,
                isLocked: !prevBoard.isLocked,
            }));
            alert(response.message);
        } catch (error) {
            console.error("Error toggling locked status:", error);
            alert("잠금 상태 변경에 실패했습니다.");
        }
    };

    // 게시글 수정 API 호출
    const handleEditSubmit = async (editForm, isDepartmentBoard) => {
        try {
            const response = await updateBoardDetails(
                board.boardId, editForm, files, isDepartmentBoard, department);
            setBoard(response); // 수정된 데이터로 상태 업데이트
            setShowEditModal(false);
        } catch (error) {
            console.error("게시글 상세보기 실패 : ", error);
        }
    };

    // 게시글 삭제 API 호출
    const handleDeleteSubmit = async () => {
        try {
            await deleteBoardDetails(boardId);
            setShowDeleteModal(false);
            if(!isDepartmentBoard){
                navigate(`/all-boards`);
            }else {
                navigate(`/department-boards/${department}`);
            }
        } catch (error) {
            console.error("게시글 삭제 실패 오류 : ", error);
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
                    isDepartmentBoard={isDepartmentBoard}
                    toggleImportant={toggleImportant} // 전달
                    toggleLocked={toggleLocked} // 전달
                />

                <BoardDetailsBody board={board} />
                <BoardDetailsFooter
                    boardId={boardId}
                    reactionList={board.reactionList}
                    likeCount={board.likeCount}
                    commentCount={board.commentCount}
                    viewCount={board.viewCount}
                />
            </div>
            <Comments
                comments={comments}
                name={name}
                boardId={boardId}
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
