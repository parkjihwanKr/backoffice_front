import '../../MainPage.css';

const Personalboard = () => {
    return(
        <div className="personal-board-container">
            <div className="personal-board-header">
                <h3> 이번주 회사 일정표 </h3>
            </div>
            <div className="personal-board-body">
                회사의 이번주 일정표
            </div>
            <div className="personal-board-footer">
                이전주, 다음주 이동 버튼
            </div>
        </div>
    );
}
export default Personalboard;