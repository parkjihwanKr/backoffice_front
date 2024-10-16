import React, {useState} from 'react';
import './VacationDetailModal.css';
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
import UpdateIsAcceptedModal from './UpdateIsAcceptedModal';
import DeleteVacationForAdminModal from "./DeleteVacationForAdminModal";

const VacationDetailModal = ({ isOpen, vacation, onUpdateVacationIsAccepted, onDeleteVacation, onClose }) => {
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    if (!isOpen || !vacation) return null;

    const buttonText = vacation.isAccepted ? '미승인' : '승인';

    const handleUpdateIsAccepted = async () => {
        try {
            await onUpdateVacationIsAccepted(vacation.vacationId); // 부모 컴포넌트로 상태 업데이트 요청
            setShowUpdateModal(false); // 모달 닫기
            onClose(); // 모달을 닫으면서 새 데이터를 반영할 수 있도록 함
        } catch (error) {
            console.error('휴가 승인/미승인 처리 중 오류 발생:', error);
        }
    };

    const handleDeleteVacation = async () => {
        try {
            await onDeleteVacation(vacation.vacationId); // 부모 컴포넌트로 삭제 요청
            setShowDeleteModal(false); // 모달 닫기
            onClose(); // 모달을 닫으면서 새 데이터를 반영할 수 있도록 함
        } catch (error) {
            console.error('휴가 삭제 처리 중 오류 발생:', error);
        }
    }

    return (
        <div className="vacation-details-modal-overlay">
            <div className="vacation-details-modal">
                <div className="vacation-details-modal-header">
                    <h3>{vacation.onVacationMemberName}님의 휴가</h3>
                    <CloseImageButton handleClose={onClose} />
                </div>
                <div className="vacation-details-modal-body">
                    <p><strong>휴가
                        기간:</strong> {new Date(vacation.startDate).toLocaleDateString()} ~ {new Date(vacation.endDate).toLocaleDateString()}
                    </p>
                    <p><strong>휴가 종류 : </strong> {vacation.vacationType}</p>
                    <p><strong>휴가 사유 : </strong> {vacation.urgentReason}</p>
                    <hr/>
                    <p><strong>승인 여부 :</strong> {vacation.isAccepted ? '승인됨' : '미승인'}</p>
                </div>
                <div className="vacation-details-modal-footer">
                    <button onClick={() => setShowUpdateModal(true)}>{buttonText}</button>
                    <button onClick={() => setShowDeleteModal(true)}>삭제</button>
                </div>
            </div>

            <UpdateIsAcceptedModal
                isOpen={showUpdateModal}
                vacation={vacation}
                onUpdate={handleUpdateIsAccepted}
                onClose={() => setShowUpdateModal(false)}
            />

            <DeleteVacationForAdminModal
                isOpen={showDeleteModal}
                vacation={vacation}
                onDelete={handleDeleteVacation}
                onClose={() => setShowDeleteModal(false)}
            />
        </div>
    );
};

export default VacationDetailModal;
