import React, { useState } from "react";
import '../../../../../../components/ui/modal/Modal.css';

const UpdateCheckInTimeModal = ({ onClose, onSubmit }) => {
    const [newCheckInTime, setNewCheckInTime] = useState("");

    const handleSubmit = () => {
        onSubmit(newCheckInTime);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>출근 시간 변경</h3>
                <input
                    type="time"
                    value={newCheckInTime}
                    onChange={(e) => setNewCheckInTime(e.target.value)}
                />
                <div className="modal-actions">
                    <button onClick={onClose}>취소</button>
                    <button onClick={handleSubmit}>저장</button>
                </div>
            </div>
        </div>
    );
};

export default UpdateCheckInTimeModal;
