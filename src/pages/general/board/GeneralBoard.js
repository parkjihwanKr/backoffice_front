import { imagePrefix } from "../../../utils/Constant";
import { useNavigate } from "react-router-dom";

const GeneralBoard = ({ boards = [] }) => {
    const navigate = useNavigate();

    const goToGeneralBoard = () => {
        navigate('/all-boards');
    };

    const goToGeneralBoardDetails = (boardId) => {
        navigate(`/all-boards/${boardId}`);
    };

    return (
        <div className="general-board-container">
            <div className="general-board-header">
                <h3> 전체 게시판 </h3>
                <img
                    src={`${imagePrefix}/shared/reply.png`}
                    onClick={goToGeneralBoard}
                    alt="Reply Icon" />
            </div>
            <div className="general-board-body">
                {boards.length > 0 ? (
                    boards.map((board) => (
                        <div
                            key={board.boardId}
                            className="general-board-item"
                            onClick={() => goToGeneralBoardDetails(board.boardId)} // 수정된 부분
                        >
                            <div className="general-board-stats">
                                <span className="general-board-metric">
                                    <img
                                        src={board.isImportant ?
                                            `${imagePrefix}/shared/isImportant_true.png` :
                                            `${imagePrefix}/shared/isImportant_false.png`}
                                        alt={board.isImportant ? 'important!' : 'not important'}
                                    />
                                </span>
                                <span className="general-domain-title">
                                    {board.title}
                                </span>
                                <span className="general-board-metric">
                                    <img src={`${imagePrefix}/shared/likes.png`} alt="Likes Icon"/>
                                    : {board.likeCount}
                                </span>
                                <span className="general-board-metric">
                                    <img src={`${imagePrefix}/shared/commentList.png`} alt="Comments Icon"/>
                                    : {board.commentCount}
                                </span>
                                <span className="general-board-metric">
                                    <img src={`${imagePrefix}/shared/viewCount.png`} alt="Views Icon"/>
                                    : {board.viewCount >= 51 ? "50+" : board.viewCount}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="not-exist-data">
                        게시판 정보가 없습니다.
                    </p>
                )}
            </div>
            <div className="general-board-footer">
                {/* 추가 기능을 위한 Footer */}
            </div>
        </div>
    );
};

export default GeneralBoard;
