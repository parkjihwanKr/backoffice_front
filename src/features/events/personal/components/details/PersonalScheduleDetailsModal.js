import React from 'react';
import './PersonalScheduleDetailsModal.css';
import CloseButton from '../../../../../components/ui/CloseButton'; // CloseButton 컴포넌트 import

const PersonalScheduleDetailsModal = ({ show, handleClose, selectedDate, events }) => {
    if (!show) return null;
    return (
        <div className="personal-schedule-details-modal-overlay">
            <div className="personal-schedule-details-modal-content">
                <div className="personal-schedule-details-modal-header">
                    <span className="personal-schedule-details-modal-title">
                        Schedule Details for
                    </span>
                </div>
                <div className="personal-schedule-details-modal-body">
                    No event this day
                </div>
                <div className="personal-schedule-details-modal-footer">
                    <CloseButton onClick={handleClose} /> {/* CloseButton 사용 */}
                </div>
            </div>
        </div>
    );
};

export default PersonalScheduleDetailsModal;
