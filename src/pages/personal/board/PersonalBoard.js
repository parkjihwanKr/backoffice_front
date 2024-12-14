import '../../shared/MainPage.css';
import {imagePrefix} from "../../../utils/Constant";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../../features/auth/context/AuthContext";

const Personalboard = ({ boards = [] }) => {
    console.log(boards);
    const navigate = useNavigate();
    const {department} = useAuth();
    const goToDepartmentBoard = () => {
        navigate(`/department-boards/${department}`);
    };

    const goToDepartmentBoardDetails = (boardId) => {
        navigate(`/departments/${department}/boards/${boardId}`);
    };

    return(
        <div className="personal-board-container">
            <div className="personal-board-header">
                <h3> {department} 게시판 </h3>
                <img
                    src={`${imagePrefix}/shared/reply.png`}
                    onClick={goToDepartmentBoard}/>
            </div>
            <div className="general-board-body">
                {boards.length > 0 ? (
                    boards.map((board) => (
                        <div
                            key={board.boardId}
                            className="general-board-item"
                            onClick={() => goToDepartmentBoardDetails(board.boardId)} // 수정된 부분
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
                                <span className="general-board-title">
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
                                    : {board.viewCount}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>게시판 정보가 없습니다.</p>
                )}
            </div>
            <div className="general-board-footer">
                {/* 추가 기능을 위한 Footer */}
            </div>
        </div>
    );
}
export default Personalboard;