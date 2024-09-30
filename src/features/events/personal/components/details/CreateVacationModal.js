/*CreateVacationModal.js*/
import React, { useState } from 'react';
import './CreateVacationModal.css'; // 스타일 파일
import CloseButton from '../../../../../components/ui/button/CloseButton';

const CreateVacationModal = ({ handleClose }) => {
    const [vacationTitle, setVacationTitle] = useState('');
    const [vacationStartDate, setVacationStartDate] = useState('');
    const [vacationEndDate, setVacationEndDate] = useState('');
    const [vacationReason, setVacationReason] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!vacationTitle || !vacationStartDate || !vacationEndDate) {
            alert("All fields are required!");
            return;
        }

        const vacationData = {
            title: vacationTitle,
            startDate: vacationStartDate,
            endDate: vacationEndDate,
            reason: vacationReason,
        };

        console.log('Vacation Created:', vacationData);

        // 모달 닫기
        handleClose();
    };

    return (
        <div className="create-vacation-modal-overlay">
            <div className="create-vacation-modal-content">
                <div className="create-vacation-modal-header">
                    <h3>Create Vacation</h3>
                    <CloseButton handleClose={handleClose} />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="create-vacation-modal-body">
                        <label>
                            Vacation Title:
                            <input
                                type="text"
                                value={vacationTitle}
                                onChange={(e) => setVacationTitle(e.target.value)}
                                placeholder="Enter vacation title"
                                required
                            />
                        </label>
                        <label>
                            Start Date:
                            <input
                                type="date"
                                value={vacationStartDate}
                                onChange={(e) => setVacationStartDate(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            End Date:
                            <input
                                type="date"
                                value={vacationEndDate}
                                onChange={(e) => setVacationEndDate(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Reason (optional):
                            <textarea
                                value={vacationReason}
                                onChange={(e) => setVacationReason(e.target.value)}
                                placeholder="Enter reason for vacation"
                            />
                        </label>
                    </div>
                    <div className="create-vacation-modal-footer">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateVacationModal;
