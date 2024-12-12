const GeneralBoard = () => {
    return(
        <div className="general-board-container">
            <div className="general-board-header">
                <h3> 전체 게시판 </h3>
                전체 게시판 이동 버튼(header) ->
            </div>
            <div className="general-board-body">
                중요한 게시글 1 (제목 / 좋아요, 댓글 수, 뷰 카운트 수)
            </div>
            <div>
                중요한 게시글 2 (... 3개까지)
            </div>
            <div className="general-board-footer">
                재사용하고 있지 않은 간단한 페이지네이션
            </div>
        </div>
    );
}
export default GeneralBoard;