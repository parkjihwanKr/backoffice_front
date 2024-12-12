import '../../MainPage.css';

const GeneralEvent = () => {
    return(
        <div className="general-event-container">
            <div className="general-event-header">
                <h3> 이번주 회사 일정표 </h3>
            </div>
            <div className="general-event-body">
                회사의 이번주 일정표
            </div>
            <div className="general-event-footer">
                이전주, 다음주 이동 버튼
            </div>
        </div>
    );
}
export default GeneralEvent;