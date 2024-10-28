import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
import './UpdateVacationDaysModal.css';
import useUpdateVacationDays from "../../hooks/useUpdateVacationDays"; // custom hook 임포트

const UpdateVacationDaysModal = ({ member, onClose, onSave }) => {
    const {
        newVacationDays, setNewVacationDays,
        handleSaveChanges
    } = useUpdateVacationDays(member, onSave, onClose);

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
