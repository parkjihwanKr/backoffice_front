import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
import '../../../../../components/ui/modal/Modal.css';
import useUpdateVacationDays from "../../hooks/useUpdateVacationDays";
import SubmitButton from "../../../../../components/ui/buttons/SubmitButton"; // custom hook 임포트

const UpdateVacationDaysModal = ({ member, onClose, onSave }) => {
    const {
        newVacationDays, setNewVacationDays,
        handleSaveChanges
    } = useUpdateVacationDays(member, onSave, onClose);

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <h3>휴가 일수 변경</h3>
                    <CloseImageButton handleClose={onClose} />
                </div>
                <div className="custom-modal-body">
                    <div className="custom-modal-form-group">
                        <label htmlFor="vacationDays">남은 휴가 일수:</label>
                        <div className="divider"></div>
                        <input
                            type="number"
                            id="vacationDays"
                            value={newVacationDays}
                            onChange={(e) => setNewVacationDays(e.target.value)}
                            min="0"
                        />
                    </div>
                </div>
                <div className="custom-modal-footer">
                    <SubmitButton onSubmit={handleSaveChanges} text={"변경"} />
                </div>
            </div>
        </div>
    );
};

export default UpdateVacationDaysModal;
