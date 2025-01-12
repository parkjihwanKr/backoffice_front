import React, { useState, useEffect } from 'react';
import './UpdateSalaryModal.css';
import '../../../../../components/ui/modal/Modal.css';
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
import { updateSalary } from "../../services/MemberManagementService";
import SubmitButton from "../../../../../components/ui/buttons/SubmitButton";
import useModalScroll from "../../../../../hooks/useModalScroll";

const UpdateSalaryModal = ({ show, member, onClose, onSave }) => {
    useModalScroll(show);
    const [newSalary, setNewSalary] = useState(member.salary || 0); // 초기 급여 설정

    // 새로 선택된 member가 변경되면 newSalary를 초기화
    useEffect(() => {
        setNewSalary(member.salary || 0); // 다시 숫자 형태로 설정
    }, [member]);

    // 급여 변경 저장 처리 함수
    const handleChangeSalary = async () => {
        // 새로운 급여를 서버에 업데이트
        await updateSalary(member.memberId, member.memberName, newSalary);
        // 부모 컴포넌트로 변경된 급여를 전달 (숫자 형태로 전달)
        onSave(Number(newSalary));
        onClose(); // 모달 닫기
    };

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <h3>{member.memberName}님의 급여 변경</h3>
                    <CloseImageButton handleClose={onClose}/>
                </div>
                <div className="custom-modal-divider"
                     style={{
                        marginTop : "40px"
                }}/>
                <div className="custom-modal-body">
                    <input
                        type="number"
                        value={newSalary}
                        onChange={(e) => setNewSalary(e.target.value)}
                        min="0"
                    />
                </div>
                <div className="custom-modal-footer">
                    <SubmitButton onSubmit={handleChangeSalary} text={"급여 변경"}/>
                </div>
            </div>
        </div>
    );
};

export default UpdateSalaryModal;
