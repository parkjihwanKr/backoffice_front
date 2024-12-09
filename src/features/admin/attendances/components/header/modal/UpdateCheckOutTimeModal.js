import React, { useState } from "react";
import '../../../../../../components/ui/modal/Modal.css';

const UpdateCheckOutTimeModal = ({ onClose, onSubmit }) => {
    const [newCheckOutTime, setNewCheckOutTime] = useState("");

    const handleSubmit = () => {
        onSubmit(newCheckOutTime);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>퇴근 시간 변경</h3>
                <input
                    type="time"
                    value={newCheckOutTime}
                    onChange={(e) => setNewCheckOutTime(e.target.value)}
                />
                <div className="modal-actions">
                    <button onClick={onClose}>취소</button>
                    <button onClick={handleSubmit}>저장</button>
                </div>
            </div>
        </div>
    );
};

export default UpdateCheckOutTimeModal;
