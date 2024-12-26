import React from 'react';
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
import UpdateIsAcceptedModal from './UpdateIsAcceptedModal';
import DeleteVacationForAdminModal from "./DeleteVacationForAdminModal";
import { useModalVisibility } from '../../hooks/useModalVisibility';
import {reverseVacationMapping} from "../../../../../utils/Constant";
import ConfirmButton from "../../../../../components/ui/buttons/ConfirmButton";
import useModalScroll from "../../../../boards/shared/hooks/useModalScroll";
import {useAuth} from "../../../../auth/context/AuthContext";

const VacationDetailModal = ({ isOpen, vacation, onUpdateVacationIsAccepted, onDeleteVacation, onClose }) => {
    const {
        isUpdateModalOpen,
        isDeleteModalOpen,
        openUpdateModal,
        closeUpdateModal,
        openDeleteModal,
        closeDeleteModal,
    } = useModalVisibility();

    const { department, position} = useAuth();
    useModalScroll(isOpen);
    if (!isOpen || !vacation) return null;

    // 버튼 텍스트는 승인 여부에 따라 변경
    const buttonText = vacation.isAccepted ? '미승인 요청' : '승인 요청';

    const hasAccess = () => {
        if((department ===  "HR" && position == "MANAGER") || position === "CEO"){
            return true;
        }
        return false;
    }
    const handleUpdateIsAccepted = async () => {
        try {
            await onUpdateVacationIsAccepted(vacation.vacationId); // 부모 컴포넌트로 상태 업데이트 요청
            closeUpdateModal(); // 모달 닫기
            onClose(); // 모달을 닫으면서 새 데이터를 반영할 수 있도록 함
        } catch (error) {
            console.error('휴가 승인/미승인 처리 중 오류 발생:', error);
        }
    };

    const handleDeleteVacation = async () => {
        try {
            await onDeleteVacation(vacation.vacationId); // 부모 컴포넌트로 삭제 요청
            closeDeleteModal(); // 모달 닫기
            onClose(); // 모달을 닫으면서 새 데이터를 반영할 수 있도록 함
        } catch (error) {
            console.error('휴가 삭제 처리 중 오류 발생:', error);
        }
    }

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <h3>{vacation.onVacationMemberName}님의 휴가</h3>
                    <CloseImageButton handleClose={onClose} />
                </div>
                <div className="custom-modal-body">
                    <p>
                        <strong>휴가 기간 : </strong>
                        {new Date(vacation.startDate).toLocaleDateString()}
                        ~ {new Date(vacation.endDate).toLocaleDateString()}
                    </p>
                    <p>
                        <strong>휴가 사유 : </strong>
                        {vacation.urgentReason && vacation.urgentReason.trim() !== ""
                            ? vacation.urgentReason
                            : "사유 없음"}
                    </p>
                    <p>
                        <strong>휴가 종류 : </strong>
                        {reverseVacationMapping[vacation.vacationType]}
                        <strong style={{marginLeft: "10px"}}>승인 여부 :</strong> {vacation.isAccepted ? '승인됨' : '미승인'}
                    </p>
                </div>
                <div className="custom-modal-footer">
                    {hasAccess() ? (
                        <>
                            <ConfirmButton
                                onClick={openUpdateModal}
                                text={buttonText}
                            />
                            <ConfirmButton
                                onClick={openDeleteModal}
                                text={"삭제"}
                            />
                        </>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>

            <UpdateIsAcceptedModal
                isOpen={isUpdateModalOpen}
                vacation={vacation}
                onUpdate={handleUpdateIsAccepted}
                onClose={closeUpdateModal}
            />

            <DeleteVacationForAdminModal
                isOpen={isDeleteModalOpen}
                vacation={vacation}
                onDelete={handleDeleteVacation}
                onClose={closeDeleteModal}
            />
        </div>
    );
};

export default VacationDetailModal;
