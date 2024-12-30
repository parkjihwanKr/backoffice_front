import React from 'react';
import '../../components/ui/modal/Modal.css'; // 모달 관련 CSS 가져오기
import {DEPARTMENTS} from '../../utils/Constant';
import CloseImageButton from "../../components/ui/image/CloseImageButton";
import ConfirmButton from "../../components/ui/buttons/ConfirmButton";
import useModalScroll from "../boards/hooks/useModalScroll";

const SelectDepartmentModal = ({
                                   showModal,
                                   onClose,
                                   selectedDepartment,
                                   setSelectedDepartment,
                                   handleSubmit
                               }) => {
    useModalScroll(showModal);
    if (!showModal) return null; // 모달이 표시되지 않으면 아무것도 렌더링하지 않음

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <h3 className="modal-title">부서 선택</h3>
                    <CloseImageButton handleClose={onClose}/>
                </div>
                <div className="custom-modal-body">
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
                <div className="custom-modal-footer">
                    <ConfirmButton onClick={handleSubmit} text={"확인"}/>
                </div>
            </div>
        </div>
    );
};

export default SelectDepartmentModal;
