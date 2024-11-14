import { useAuth } from "../../../auth/context/AuthContext";
import './PersonalVacationListModal.css';
import CloseImageButton from "../../../../components/ui/image/CloseImageButton";
import React, { useEffect, useState } from "react";
import { getMemberVacationList } from "../services/PersonalScheduleService";
import { imagePrefix } from "../../../../utils/Constant";
import UpdateVacationModal from "./UpdateVacationModal";
import DeleteVacationModal from "./DeleteVacationModal";
import { adjustModalAlignment, addModalAlignmentListener } from "../../../../utils/ModalUtils"; // 모듈 가져오기

const PersonalVacationListModal = ({ handleClose }) => {
    const { name, id } = useAuth();
    const [vacationList, setVacationList] = useState([]); // 휴가 목록
    const [remainingVacationDays, setRemainingVacationDays] = useState(0); // 남은 휴가 일수
    const [selectedVacation, setSelectedVacation] = useState(null); // 선택된 휴가
    const [hoveredVacationId, setHoveredVacationId] = useState(null); // Hover된 휴가 ID
    const [isUpdateVacationModalOpen, setUpdateVacationModalOpen] = useState(false);
    const [isDeleteVacationModalOpen, setDeleteVacationModalOpen] = useState(false);

    // 휴가 리스트를 가져오는 함수
    const fetchVacationList = async () => {
        try {
            const response = await getMemberVacationList(id);
            setVacationList(response.vacationList || []); // 받아온 휴가 목록을 상태에 저장
            setRemainingVacationDays(response.remainingVacationDays); // 남은 휴가 일수 설정
        } catch (error) {
            console.error("Error fetching vacation list:", error);
        }
    };

    useEffect(() => {
        fetchVacationList();
    }, [id]);

    const handleUpdateVacationModalOpen = (selectedVacation) => {
        console.log("선택된 휴가 : " + selectedVacation);
        setSelectedVacation(selectedVacation);
        setUpdateVacationModalOpen(true);
    };

    const handleUpdateVacationModalClose = () => {
        setUpdateVacationModalOpen(false);
    };

    const handleDeleteVacationModalOpen = (selectedVacation) => {
        setSelectedVacation(selectedVacation);
        setDeleteVacationModalOpen(true);
    };

    const handleDeleteVacationModalClose = () => {
        setDeleteVacationModalOpen(false);
    };

    // 모달의 내용이 화면을 넘어가는지 체크하는 함수
    useEffect(() => {
        if (vacationList.length > 0) {
            const modalOverlay = document.querySelector('.vacationList-modal-overlay');
            const modalContent = document.querySelector('.vacationList-vacation-modal-content');

            // 페이지 로드 시 정렬 조정
            adjustModalAlignment(modalOverlay, modalContent);

            // 리사이즈 이벤트 리스너 추가
            const cleanup = addModalAlignmentListener(modalOverlay, modalContent);

            // 컴포넌트 언마운트 시 리스너 제거
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
                    <div className="vacationList-vacation-modal-body-speech-ballon">
                        <p>남은 휴가 일수: {remainingVacationDays}일</p>
                    </div>
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
                                        <span className="vacationList-title">
                                            {vacation.title}
                                        </span>
                                        <span className="vacationList-urgent-reason">
                                            긴급한 사유 : {vacation.urgentReason ? vacation.urgentReason : '긴급한 사유 없음'}
                                        </span>
                                        <span className="vacationList-date">
                                            휴가 기간 : {vacation.startDate} ~ {vacation.endDate}
                                        </span>
                                        <hr className="border" />
                                        <div className="vacationList-info-isAccepted">
                                            승인 여부 : {vacation.isAccepted ? '승인됨' : '미승인'}
                                        </div>
                                    </div>

                                    {/* 오른쪽 끝에 수정/삭제 아이콘 표시 */}
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
                    ** 주의사항 1 : 지난 휴가는 해당 리스트에서 조회할 수 없습니다.
                    ** 주의사항 2 : 승인되지 않은 휴가는 잔여 휴가에서 차감되지 않으며, 승인 시에 잔여 휴가 수가 변경됩니다.
                    ** 예외적 상황 : 신청 기간 10월이라면 휴가 신청 시작의 시작날이 11월이면 휴가 생성 가능
                </div>
                {/* 모달 */}
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
