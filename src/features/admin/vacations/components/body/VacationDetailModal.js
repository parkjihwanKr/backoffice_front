import React from 'react';
import '../../../../../components/ui/modal/Modal.css';
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
import UpdateIsAcceptedModal from './UpdateIsAcceptedModal';
import DeleteVacationForAdminModal from "./DeleteVacationForAdminModal";
import { useModalVisibility } from '../../hooks/useModalVisibility';
import {reverseVacationMapping} from "../../../../../utils/Constant";
import ConfirmButton from "../../../../../components/ui/buttons/ConfirmButton";
import useModalScroll from "../../../../../hooks/useModalScroll";
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

    const handleDeleteVacation = async (reason) => {
        try {
            await onDeleteVacation(vacation.vacationId, reason); // 부모 컴포넌트로 삭제 요청
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
                    <table className="custom-modal-table">
                        <tbody>
                        <tr>
                            <td className="custom-modal-table-column-1">
                                <strong>휴가 기간 : </strong>
                            </td>
                            <td className="custom-modal-table-column-2">
                                {new Date(vacation.startDate).toLocaleDateString()}
                                ~ {new Date(vacation.endDate).toLocaleDateString()}
                            </td>
                        </tr>
                        <tr>
                            <td className="custom-modal-table-column-1">
                                <strong>휴가 종류 : </strong>
                            </td>
                            <td className="custom-modal-table-column-2">
                                {reverseVacationMapping[vacation.vacationType]}
                            </td>
                        </tr>
                        <tr>
                            <td className="custom-modal-table-column-1">
                                <strong>승인 여부 : </strong>
                            </td>
                            <td className="custom-modal-table-column-2">
                                {vacation.isAccepted ? '승인됨' : '미승인'}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="custom-modal-divider"/>
                    <div className="custom-modal-body-description-title">
                        <strong>휴가 사유 : </strong>
                    </div>
                    <div className="custom-modal-body-description">
                        {vacation.urgentReason && vacation.urgentReason.trim() !== ""
                            ? vacation.urgentReason
                            : "사유 없음"}
                    </div>
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
                onDelete={(reason) => {
                    handleDeleteVacation(reason);
                }}
                onClose={closeDeleteModal}
            />
        </div>
    );
};

export default VacationDetailModal;
