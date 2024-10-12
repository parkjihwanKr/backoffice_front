/*VacationWarningModal.js*/
import React from 'react';
import './VacationWarningModal.css';
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";

const VacationWarningModal = ({ show, handleClose }) => {
    if (!show) return null; // 모달이 보이지 않을 때는 렌더링하지 않음

    return (
        <div className="warning-modal-overlay">
            <div className="warning-modal-content">
                <div className="warning-modal-header">
                    <h3>
                        주의사항
                        <CloseImageButton handleClose={handleClose}/>
                    </h3>
                </div>
                <div className="warning-modal-body">
                    <p>휴가 신청 기간에 맞춰서 연가를 사용해주세요!</p>
                    <p>휴가 신청 기간에 맞지 않은 날짜 입력 시, 사용이 안됩니다.</p>
                    <p>휴가 시작일과 마지막일은 토요일/일요일이면 안됩니다. </p>
                    <p>1. 연가 사용 시 주의 사항</p>
                    <p className="warning-modal-body-important">
                        1-1. 연가 사용을 할 때, 긴급함 표시를 선택하시면 안됩니다.
                    </p>
                    <p>1-2. 연가는 바로 적용이 되지 않으며 승인 여부를 알림을 통해 확인 부탁드립니다.</p>
                    <p>2. 병가 사용 시 주의 사항</p>
                    <p className="warning-modal-body-important">
                        2-1. 병가 사용을 할 때, 긴급함 표시를 선택하셔야 합니다.
                    </p>
                    <p>2-2. 적절한 사유를 꼭 적어서 보내주세요!</p>
                    <p>2-3. 관리자에게 바로 알림이 가지만, 구두로도 말씀 부탁드립니다.</p>
                    <p>3. 긴급한 휴가 사용 시 주의 사항</p>
                    <p className="warning-modal-body-important">
                        3-1. 긴급한 휴가 사용을 할 때, 긴급함 표시를 선택하셔야 합니다.
                    </p>
                    <p className="warning-modal-body-important">
                        3-2. 사유를 구체적으로 적어주셔야합니다!
                    </p>
                    <p>3-3. 관리자에게 바로 알림이 가지만, 구두로도 말씀 부탁드립니다.</p>
                </div>
            </div>
        </div>
    );
};

export default VacationWarningModal;
