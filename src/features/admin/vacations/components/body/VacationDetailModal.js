/*VacationDetailModal.js*/
import React from 'react';
import './VacationDetailModal.css';
import { imagePrefix} from "../../../../../utils/Constant";
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
const VacationDetailModal = ({ isOpen, onClose, vacation, onUpdate, onDelete }) => {
    if (!isOpen || !vacation) return null; // 모달이 열려있지 않거나 휴가 정보가 없으면 아무것도 렌더링하지 않음

    const getVacationTypeInKorean = (type) => {
        switch (type) {
            case 'URGENT_LEAVE':
                return '긴급한 휴가';
            case 'ANNUAL_LEAVE':
                return '연가';
            case 'SICK_LEAVE':
                return '병가';
            default:
                return type; // 해당되지 않으면 원래 값을 반환
        }
    };

    return (
        <div className="vacation-details-modal-overlay">
            <div className="vacation-details-modal">
                <div className="vacation-details-modal-header">
                    <h3> '{vacation.onVacationMemberName}'님의 휴가</h3>
                    <CloseImageButton handleClose={onClose}/>
                </div>
                <div className="vacation-details-modal-body">
                    <p><strong>시작일:</strong> {vacation.startDate}</p>
                    <p><strong>종료일:</strong> {vacation.endDate}</p>
                    <p><strong>휴가 타입:</strong> {getVacationTypeInKorean(vacation.vacationType)}</p>
                    <hr/>
                    <p><strong>승인 여부 :</strong> {vacation.isAccepted ? '승인됨' : '미승인'}</p>
                </div>
                {/* 업데이트 및 삭제 버튼 */}
                <div className="vacation-details-modal-footer">
                    <button onClick={() => onUpdate(vacation)}>휴가 승인</button>
                    <button onClick={() => onDelete(vacation.vacationId)}>휴가 삭제</button>
                </div>
            </div>
        </div>
    );
};

export default VacationDetailModal;
