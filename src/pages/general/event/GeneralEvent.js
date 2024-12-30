import {imagePrefix} from "../../../utils/Constant";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../../features/auth/context/AuthContext";

const GeneralEvent = ({events = []}) => {
    const navigate = useNavigate();
    const {department} = useAuth();

    const goToDepartmentEvent = () => {
        navigate(`/department-schedule/${department}`);
    };

    return(
        <div className="general-event-container">
            <div className="general-event-header">
                <h3> 이번주 회사 일정표 </h3>
                <img
                    src={`${imagePrefix}/shared/reply.png`}
                    onClick={goToDepartmentEvent}/>
            </div>
            <div className="general-event-body">
                {events.length > 0 ? (
                    events.map((event) => (
                        <div
                            key={event.eventId}
                            className="general-board-item"
                        >
                            <div className="general-event-row">
                                <span className="general-event-title">
                                    {event.title}
                                </span>
                            </div>
                            <div className="general-event-row">
                                <span className="general-domain-date">
                                    {event.startDate} ~ {event.endDate}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="not-exist-data">일정 정보가 없습니다.</p>
                )}
            </div>
            <div className="general-event-footer">
            </div>
        </div>
    );
}
export default GeneralEvent;