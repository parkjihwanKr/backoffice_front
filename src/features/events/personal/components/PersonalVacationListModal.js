import React, { useEffect, useState } from "react";
import { useAuth } from "../../../auth/context/AuthContext";
import "./PersonalVacationListModal.css";
import CloseImageButton from "../../../../components/ui/image/CloseImageButton";
import { getMemberVacationList } from "../services/PersonalScheduleService";
import { imagePrefix } from "../../../../utils/Constant";
import UpdateVacationModal from "./UpdateVacationModal";
import DeleteVacationModal from "./DeleteVacationModal";
import { adjustModalAlignment, addModalAlignmentListener } from "../../../../utils/ModalUtils";

const PersonalVacationListModal = ({ handleClose }) => {
    const { name, id } = useAuth();
    const [vacationList, setVacationList] = useState([]);
    const [remainingVacationDays, setRemainingVacationDays] = useState(0);
    const [selectedVacation, setSelectedVacation] = useState(null);
    const [hoveredVacationId, setHoveredVacationId] = useState(null);
    const [isUpdateVacationModalOpen, setUpdateVacationModalOpen] = useState(false);
    const [isDeleteVacationModalOpen, setDeleteVacationModalOpen] = useState(false);
    const [isTooltipVisible, setTooltipVisible] = useState(false); // 툴팁 가시성 상태

    const fetchVacationList = async () => {
        try {
            const response = await getMemberVacationList(id);
            setVacationList(response.vacationList || []);
            setRemainingVacationDays(response.remainingVacationDays);
        } catch (error) {
            console.error("Error fetching vacation list:", error);
        }
    };

    useEffect(() => {
        fetchVacationList();
    }, [id]);

    const handleUpdateVacationModalOpen = (selectedVacation) => {
        setSelectedVacation(selectedVacation);
        setUpdateVacationModalOpen(true);
    };

    const handleDeleteVacationModalOpen = (selectedVacation) => {
        setSelectedVacation(selectedVacation);
        setDeleteVacationModalOpen(true);
    };

    const toggleTooltip = () => {
        setTooltipVisible(!isTooltipVisible); // 툴팁 가시성 토글
    };

    useEffect(() => {
        if (vacationList.length > 0) {
            const modalOverlay = document.querySelector(".vacationList-modal-overlay");
            const modalContent = document.querySelector(".vacationList-vacation-modal-content");

            adjustModalAlignment(modalOverlay, modalContent);

            const cleanup = addModalAlignmentListener(modalOverlay, modalContent);

            return cleanup;
        }
    }, [vacationList]);

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
                                    {hoveredVacationId === vacation.vacationId && (
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
                    {/*<div className={`tooltip-container ${isTooltipVisible ? 'active' : ''}`}>
                        <img
                            src={`${imagePrefix}/shared/caution_document.png`}
                            alt="주의사항 이미지"
                            className="tooltip-target"
                            onClick={toggleTooltip} // 클릭 시 툴팁 토글
                        />
                        <div className="tooltip-content">
                            <p><strong>주의사항 1:</strong> 지난 휴가는 해당 리스트에서 조회할 수 없습니다.</p>
                            <p><strong>주의사항 2:</strong> 승인되지 않은 휴가는 잔여 휴가에서 차감되지 않으며, 승인 시에 잔여 휴가 수가 변경됩니다.</p>
                            <p><strong>예외적 상황:</strong> 신청 기간 10월이라면 휴가 신청 시작의 시작날이 11월이면 휴가 생성 가능.</p>
                        </div>
                    </div>*/}
                    남은 휴가 일수: {remainingVacationDays}일
                </div>
                {isUpdateVacationModalOpen && (
                    <UpdateVacationModal
                        handleClose={() => setUpdateVacationModalOpen(false)}
                        selectedVacation={selectedVacation}
                    />
                )}
                {isDeleteVacationModalOpen && (
                    <DeleteVacationModal
                        handleClose={() => setDeleteVacationModalOpen(false)}
                        selectedVacation={selectedVacation}
                    />
                )}
            </div>
        </div>
    );
};

export default PersonalVacationListModal;
