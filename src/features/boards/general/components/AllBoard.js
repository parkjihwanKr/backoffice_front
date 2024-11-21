import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { imagePrefix } from '../../../../utils/Constant';
import './AllBoard.css'; // CSS 파일 import
import PaginationFooter from "../../../../components/common/PaginationFooter"; // 페이지네이션 컴포넌트 가져오기
import useFetchBoards from '../hooks/useFetchBoards'; // 커스텀 훅 가져오기

const AllBoards = () => {
    const navigate = useNavigate();

    const {
        currentBoards,
        totalPages,
        currentPage,
        loading,
        error,
        handlePageChange,
    } = useFetchBoards(); // 커스텀 훅 사용

    const defaultImageUrls = [
        `${imagePrefix}/board/brainstorming.png`,
        `${imagePrefix}/board/workshop.png`,
        `${imagePrefix}/board/communication.png`,
    ];

    const getDefaultImage = (index) => {
        return defaultImageUrls[index % defaultImageUrls.length];
    };

    const handleCardClick = (boardId) => {
        if (boardId) {
            navigate(`/all-boards/${boardId}`);
        } else {
            console.error('boardId is undefined');
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
                    <h2>전체 공지 사항</h2>
                </div>
                <div className="board-container-header-end">
                    <Link to="/create-board" className="no-underline-link">
                        <button className="button">새 게시글 작성</button>
                    </Link>
                </div>
            </div>

            <div className="board-list">
                {currentBoards.map((board, index) => (
                    <div
                        className="board-item"
                        key={board.boardId || index}
                    >
                        <div className="board-card"
                             onClick={() => handleCardClick(board.boardId)}>
                            <div className="board-card-important">
                                <img
                                    src={board.isImportant ? `${imagePrefix}/shared/isImportant_true.png` : `${imagePrefix}/shared/isImportant_false.png`}
                                    alt={board.isImportant ? "Important" : "Not Important"}
                                    width="30"
                                />
                            </div>
                            <div className="board-card-image">
                                <img
                                    src={getDefaultImage(index)}
                                    alt="Board Image"
                                />
                            </div>
                            <div className="board-card-content">
                                <div className="board-card-body">
                                    <h3 className="board-card-title">{board.title}</h3>
                                    <p className="board-card-categories">카테고리 : {board.categories}</p>
                                    <p className="board-card-text">{board.content}</p>
                                </div>
                                <div className="board-card-info">
                                    <span>
                                        <img src={`${imagePrefix}/shared/likes.png`} alt="likes" /> {board.likeCount}
                                    </span>
                                    <span>
                                        <img src={`${imagePrefix}/shared/viewCount.png`} alt="views" /> {board.viewCount}
                                    </span>
                                    <span>
                                        <img src={`${imagePrefix}/shared/commentList.png`} alt="comments" /> {board.commentCount}
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

export default AllBoards;
