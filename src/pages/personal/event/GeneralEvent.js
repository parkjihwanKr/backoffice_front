import '../../MainPage.css';

const PersonalEvent = () => {
    return(
        <div className="personal-event-container">
            <div className="personal-event-header">
                <h3> 이번주 회사 일정표 </h3>
            </div>
            <div className="personal-event-body">
                회사의 이번주 일정표
            </div>
            <div className="personal-event-footer">
                이전주, 다음주 이동 버튼
            </div>
        </div>
    );
}
export default PersonalEvent;