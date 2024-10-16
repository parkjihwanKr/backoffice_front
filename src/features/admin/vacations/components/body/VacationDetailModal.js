import React, { useState } from 'react';
import './VacationDetailModal.css';
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
import UpdateIsAcceptedModal from './UpdateIsAcceptedModal';
import { updateVacationIsAccepted } from '../../services/VacationManagementService'; // 서비스 함수 직접 임포트

const VacationDetailModal = ({ isOpen, onClose, vacation }) => {
    const [showUpdateModal, setShowUpdateModal] = useState(false); // 모달 상태 관리

    if (!isOpen || !vacation) return null;

    const getVacationType = (type) => {
        switch (type) {
            case 'URGENT_LEAVE':
                return '긴급한 휴가';
            case 'ANNUAL_LEAVE':
                return '연가';
            case 'SICK_LEAVE':
                return '병가';
            default:
                return type;
        }
    };

    const buttonText = vacation.isAccepted ? '미승인' : '승인';

    const handleUpdateIsAccepted = async (vacationId) => {
        try {
            await updateVacationIsAccepted(vacationId); // 휴가 상태를 서버에 업데이트
            setShowUpdateModal(false);  // 모달 닫기
            // 업데이트 후 필요한 추가 작업이 있다면 여기에 작성 (ex. 부모 컴포넌트로 상태 전달)
        } catch (error) {
            console.error('휴가 승인/미승인 처리 중 오류 발생:', error);
        }
    };

    return (
        <div className="vacation-details-modal-overlay">
            <div className="vacation-details-modal">
                <div className="vacation-details-modal-header">
                    <h3>'{vacation.onVacationMemberName}'님의 휴가</h3>
                    <CloseImageButton handleClose={onClose} />
                </div>
                <div className="vacation-details-modal-body">
                    <p><strong>휴가 기간:</strong> {new Date(vacation.startDate).toLocaleDateString()} ~ {new Date(vacation.endDate).toLocaleDateString()}</p>
                    <div className="vacation-details-urgent-reason">
                        <p><strong>휴가자 부서:</strong> {vacation.department}</p>
                        <p><strong>휴가 종류:</strong> {getVacationType(vacation.vacationType)}</p>
                        <p><strong>휴가 사유:</strong> {vacation.urgentReason ? vacation.urgentReason : '-'}</p>
                    </div>
                    <hr />
                    <p><strong>승인 여부 :</strong> {vacation.isAccepted ? '승인됨' : '미승인'}</p>
                </div>
                <div className="vacation-details-modal-footer">
                    <button onClick={() => setShowUpdateModal(true)}>
                        {buttonText}
                    </button>
                    <button onClick={onClose}>취소</button>
                </div>
            </div>

            {/* 승인/미승인 모달 */}
            <UpdateIsAcceptedModal
                isOpen={showUpdateModal}
                vacation={vacation}
                onUpdate={() => handleUpdateIsAccepted(vacation.vacationId)} // 직접 서비스 함수 호출
                onClose={() => setShowUpdateModal(false)}  // 모달 닫기
            />
        </div>
    );
};

export default VacationDetailModal;
