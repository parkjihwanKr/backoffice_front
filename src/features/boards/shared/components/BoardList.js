import React from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {getDepartmentName, imagePrefix} from "../../../../utils/Constant";
import "./BoardList.css";
import "../../../../components/common/PaginationFooter";
import {getDefaultImage} from "../../../../utils/ImageUtils";
import useFetchBoards from "../../general/hooks/useFetchBoards";
import PaginationFooter from "../../../../components/common/PaginationFooter";

const BoardList = ({ isDepartmentBoard = false }) => {
    const navigate = useNavigate();
    const { department } = useParams(); // department 값을 URL에서 가져옴
    const boardTitle = isDepartmentBoard
        ? `${getDepartmentName(department)} 게시판`
        : "전체 공지 사항";

    const {
        currentBoards,
        totalPages,
        currentPage,
        loading,
        error,
        handlePageChange,
    } = useFetchBoards(department); // 부서별 또는 전체 데이터를 가져옴

    const handleCardClick = (boardId) => {
        if (boardId) {
            const path = isDepartmentBoard
                ? `/departments/${department}/boards/${boardId}`
                : `/all-boards/${boardId}`;
            navigate(path);
        } else {
            console.error("boardId is undefined");
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="board-container">
            <div className="board-container-header">
                <div className="board-container-header-title">
                    <h1>{boardTitle}</h1>
                </div>
                <div className="board-container-header-end">
                    <Link
                        to={isDepartmentBoard ? `/create-department-board/${department}` : "/create-board"}
                        className="no-underline-link"
                    >
                        <button className="button">새 게시글 작성</button>
                    </Link>
                </div>
            </div>

            <div className="board-list">
                {currentBoards.map((board, index) => (
                    <div className="board-item" key={board.boardId || index}>
                        <div className="board-card" onClick={() => handleCardClick(board.boardId)}>
                            <div className="board-card-settings">
                                <img src={
                                    board.isImportant
                                        ? `${imagePrefix}/shared/isImportant_true.png`
                                        : `${imagePrefix}/shared/isImportant_false.png`
                                    }
                                    alt={board.isImportant ? "Important" : "Not Important"}
                                />
                                {isDepartmentBoard && (
                                    <img src={
                                        board.isLocked
                                            ? `${imagePrefix}/shared/lock.png`
                                            : `${imagePrefix}/shared/unlock.png`
                                    }
                                    alt={board.isLocked ? "lock" : "unlock"}
                                />)}
                            </div>
                            <div className="board-card-image">
                                <img src={getDefaultImage(index)} alt="Board Image"/>
                            </div>
                            <div className="board-card-content">
                                <div className="board-card-body">
                                    <h3 className="board-card-title">{board.title}</h3>
                                    <p className="board-card-categories">카테고리 : {board.categories}</p>
                                    <p className="board-card-text">{board.content}</p>
                                </div>
                                <div className="board-card-info">
                                    <span>
                                        <img src={`${imagePrefix}/shared/likes.png`} alt="likes" />{" "}
                                        {board.likeCount}
                                    </span>
                                    <span>
                                        <img src={`${imagePrefix}/shared/viewCount.png`} alt="views" />{" "}
                                        {board.viewCount}
                                    </span>
                                    <span>
                                        <img src={`${imagePrefix}/shared/commentList.png`} alt="comments" />{" "}
                                        {board.commentCount}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <PaginationFooter
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default BoardList;
