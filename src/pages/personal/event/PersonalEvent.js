import '../../shared/MainPage.css';
import {imagePrefix, reverseVacationMapping} from "../../../utils/Constant";
import {useAuth} from "../../../features/auth/context/AuthContext";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import VacationDetailModal from "../../../features/admin/vacations/components/body/VacationDetailModal";

const PersonalEvent = ({events = []}) => {
    const {name} = useAuth();
    const navigate = useNavigate();

    const [selectedVacation, setSelectedVacation] = useState(null); // 선택된 휴가 데이터
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태

    if(events === []){
        console.log("전달 받은 개인 일정표가 없습니다.");
    }

    const goToPersonalSchedule = () => {
        navigate('/personal-schedule');
    }

    const openVacationDetailsModal = (vacation) => {
        setSelectedVacation(vacation);
        setIsModalOpen(true);
    };

    const closeVacationDetailsModal = () => {
        setSelectedVacation(null);
        setIsModalOpen(false);
    };

    const handleUpdateVacationIsAccepted = async (vacationId) => {
        // 승인 상태 업데이트 API 호출 로직 추가
        console.log(`휴가 ${vacationId} 승인 상태 업데이트`);
    };

    const handleDeleteVacation = async (vacationId) => {
        // 휴가 삭제 API 호출 로직 추가
        console.log(`휴가 ${vacationId} 삭제`);
    };

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
                                            `${imagePrefix}/shared/caution.png`}
                                        alt={vacation.isAccepted ? '승인' : '승인 안됨'}
                                        title={vacation.isAccepted ? '승인' : '승인 안됨'}
                                    />
                                </span>
                                <span className="general-domain-title" style={{ cursor : "default"}}>
                                    {reverseVacationMapping[vacation.vacationType]}
                                    (
                                    {new Date(vacation.startDate).toLocaleDateString()}
                                    ~
                                    {new Date(vacation.endDate).toLocaleDateString()}
                                    )
                                </span>
                                <span className="general-domain-metric">
                                    <img
                                        src={`${imagePrefix}/shared/go_to_details.png`}
                                        className="pointer-img"
                                        onClick={() => openVacationDetailsModal(vacation)}
                                        alt={"휴가 상세보기 조회"}
                                    />
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="not-exist-data">개인 휴가 정보가 없습니다.</p>
                )}
            </div>
            <div className="personal-event-footer">
                ★ 해당 휴가 일정은 상세보기만 가능합니다.
            </div>
            {isModalOpen && selectedVacation && (
                <VacationDetailModal
                    isOpen={isModalOpen}
                    vacation={selectedVacation}
                    onUpdateVacationIsAccepted={handleUpdateVacationIsAccepted}
                    onDeleteVacation={handleDeleteVacation}
                    onClose={closeVacationDetailsModal}
                />
            )}
        </div>
    );
}
export default PersonalEvent;