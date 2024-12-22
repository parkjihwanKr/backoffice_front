import '../../shared/MainPage.css';
import {imagePrefix, reverseDomainMapping, reverseVacationMapping} from "../../../utils/Constant";
import {useAuth} from "../../../features/auth/context/AuthContext";
import {useNavigate} from "react-router-dom";

const PersonalEvent = ({events = []}) => {
    const {name} = useAuth();
    const navigate = useNavigate();

    if(events === []){
        console.log("전달 받은 개인 일정표가 없습니다.");
    }

    const goToPersonalSchedule = () => {
        navigate('/personal-schedule');
    }

    const goToVacationDetailsModal = () => {
        alert("준비중..");
    }

    return(
        <div className="personal-event-container">
            <div className="personal-event-header">
                <h3> '{name}'님의 휴가 일정 </h3>
                <img
                    src={`${imagePrefix}/shared/reply.png`}
                    onClick={goToPersonalSchedule}/>
            </div>
            <div className="personal-event-body">
                {events.length > 0 ? (
                    events.map((vacation) => (
                        <div
                            key={vacation.vacationId}
                            className="general-event-item"
                        >
                            <div className="general-board-stats">
                                <span className="general-domain-metric">
                                    <img
                                        src={vacation.isAccepted ?
                                            `${imagePrefix}/shared/is_accepted_true_vacation.png` :
                                            `${imagePrefix}/shared/is_accepted_false_vacation.png`}
                                        alt={vacation.isAccepted ? '허용' : '안됨'}
                                    />
                                </span>
                                <span className="general-domain-title">
                                    {reverseVacationMapping[vacation.vacationType]}
                                    (
                                    {new Date(vacation.startDate).toLocaleDateString()}
                                    ~
                                    {new Date(vacation.endDate).toLocaleDateString()}
                                    )
                                </span>
                                <span className="general-event-metric">
                                    <img
                                        src={`${imagePrefix}/shared/go_to_details.png`}
                                        className="pointer-img"
                                        onClick={goToVacationDetailsModal}
                                    />
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>개인 휴가 정보가 없습니다.</p>
                )}
            </div>
            <div className="personal-event-footer">

            </div>
        </div>
    );
}
export default PersonalEvent;