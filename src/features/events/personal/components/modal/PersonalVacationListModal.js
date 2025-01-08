import { useAuth } from "../../../../auth/context/AuthContext";
import "./PersonalVacationListModal.css";
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
import { imagePrefix } from "../../../../../utils/Constant";
import UpdateVacationModal from "./UpdateVacationModal";
import DeleteVacationModal from "./DeleteVacationModal";
import usePersonalVacationListModal from "../../hooks/usePersonalVacationListModal";

const PersonalVacationListModal = ({ handleClose }) => {
    const { name, id } = useAuth();
    const {
        vacationList,
        remainingVacationDays,
        selectedVacation,
        hoveredVacationId,
        setHoveredVacationId,
        isUpdateVacationModalOpen,
        handleUpdateVacationModalOpen,
        handleUpdateVacationModalClose,
        isDeleteVacationModalOpen,
        handleDeleteVacationModalOpen,
        handleDeleteVacationModalClose
    } = usePersonalVacationListModal(id);

    return (
        <div className="vacationList-modal-overlay">
            <div className="vacationList-vacation-modal-content">
                <div className="vacationList-vacation-modal-header">
                    <h3>{name}님의 휴가 리스트</h3>
                    <CloseImageButton handleClose={handleClose} className="modal-close-icon" />
                </div>
                <div className="vacationList-vacation-modal-body">
                    {vacationList.length === 0 ? (
                        <p>등록된 휴가가 없습니다.</p>
                    ) : (
                        <div className="vacationList-container">
                            {vacationList.map((vacation) => (
                                <div
                                    key={vacation.vacationId}
                                    className="vacationList-item"
                                    onMouseEnter={() => setHoveredVacationId(vacation.vacationId)}
                                    onMouseLeave={() => setHoveredVacationId(null)}
                                >
                                    <div className="vacationList-info">
                                        <span className="vacationList-title">{vacation.title}</span>
                                        <span className="vacationList-urgent-reason">
                                            긴급한 사유 : {vacation.urgentReason || "긴급한 사유 없음"}
                                        </span>
                                        <span className="vacationList-date">
                                            휴가 기간 : {vacation.startDate} ~ {vacation.endDate}
                                        </span>
                                        <hr className="border" />
                                        <div className="vacationList-info-isAccepted">
                                            승인 여부 : {vacation.isAccepted ? "승인됨" : "미승인"}
                                        </div>
                                    </div>
                                    {hoveredVacationId === vacation.vacationId && !vacation.isAccepted &&  (
                                        <div className="vacation-action-menu">
                                            <img
                                                title="휴가 수정"
                                                src={`${imagePrefix}/shared/edit_vacation_schedule.png`}
                                                onClick={() => handleUpdateVacationModalOpen(vacation)}
                                                className="vacation-action-icon"
                                            />
                                            <img
                                                title="휴가 삭제"
                                                src={`${imagePrefix}/shared/delete_schedule.png`}
                                                onClick={() => handleDeleteVacationModalOpen(vacation)}
                                                className="vacation-action-icon"
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="vacationList-vacation-modal-footer">
                    <p><strong>※ 남은 휴가 일수 : {remainingVacationDays}일</strong></p>
                </div>
                {isUpdateVacationModalOpen && (
                    <UpdateVacationModal
                        handleClose={handleUpdateVacationModalClose}
                        selectedVacation={selectedVacation}
                    />
                )}
                {isDeleteVacationModalOpen && (
                    <DeleteVacationModal
                        handleClose={handleDeleteVacationModalClose}
                        selectedVacation={selectedVacation}
                    />
                )}
            </div>
        </div>
    );
};

export default PersonalVacationListModal;
