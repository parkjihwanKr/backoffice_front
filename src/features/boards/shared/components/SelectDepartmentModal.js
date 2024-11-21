// src/components/ui/SelectDepartmentModal.js

import React from 'react';
import ConfirmButton from '../../../../components/ui/buttons/ConfirmButton';
import CloseButton from '../../../../components/ui/buttons/CloseButton';
import './SelectDepartmentModal.css'; // 모달 관련 CSS 가져오기
import { DEPARTMENTS } from '../../../../utils/Constant'; // Constant.js에서 DEPARTMENTS 가져오기

const SelectDepartmentModal = ({
                                   showModal,
                                   handleClose,
                                   selectedDepartment,
                                   setSelectedDepartment,
                                   handleSubmit
                               }) => {
    if (!showModal) return null; // 모달이 표시되지 않으면 아무것도 렌더링하지 않음

    return (
        <div className="boards-modal-overlay">
            <div className="boards-modal-content">
                <div className="boards-modal-header">
                    <h2 className="modal-title">부서 선택</h2>
                </div>
                <div className="boards-modal-body">
                    <select
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                        className="select-department"
                    >
                        <option value="">부서를 선택하세요</option>
                        {DEPARTMENTS.map(department => (
                            <option key={department} value={department}>
                                {department}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="boards-modal-footer">
                    <ConfirmButton onClick={handleSubmit} />
                    <CloseButton handleClose={handleClose} />
                </div>
            </div>
        </div>
    );
};

export default SelectDepartmentModal;
