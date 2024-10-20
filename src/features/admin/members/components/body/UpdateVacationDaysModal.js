/*UpdateVacationDaysModal.js*/
import { useState } from "react";
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
import './UpdateVacationDaysModal.css';
import {updateRemainingVacationDays} from "../../services/MemberManagementService";

const UpdateVacationDaysModal = ({ member, onClose, onSave }) => {
    const [newVacationDays, setNewVacationDays] = useState(member.remainingVacationDays);

    // 변경 사항 저장
    const handleSaveChanges = () => {
        const response
            = updateRemainingVacationDays(member.memberId, newVacationDays);

        const updatedMember = {
            ...member,
            remainingVacationDays: newVacationDays,
        };

        onSave(updatedMember); // 부모 컴포넌트로 업데이트된 데이터를 전달
    };

    return (
        <div className="update-vacation-days-modal">
            <div className="update-vacation-days-modal-content">
                <div className="update-vacation-days-modal-header">
                    <h3>휴가 일수 변경</h3>
                    <CloseImageButton handleClose={onClose} />
                </div>
                <div className="update-vacation-days-modal-body">
                    <label htmlFor="vacationDays">남은 휴가 일수:</label>
                    <input
                        type="number"
                        id="vacationDays"
                        value={newVacationDays}
                        onChange={(e) => setNewVacationDays(e.target.value)}
                        min="0"
                    />
                </div>
                <div className="update-vacation-days-modal-footer">
                    <button className="save-button" onClick={handleSaveChanges}>저장</button>
                    <button className="cancel-button" onClick={onClose}>취소</button>
                </div>
            </div>
        </div>
    );
};

export default UpdateVacationDaysModal;
