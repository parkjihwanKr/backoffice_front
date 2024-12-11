import React from "react";
import CloseImageButton from "../../../../../../components/ui/image/CloseImageButton";
import "./UpcomingAttendanceRecordModal.css";

const UpcomingAttendanceRecordModal = ({ onClose, upcomingAttendances }) => {
    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <h3 className="custom-modal-title">예정된 근태 기록</h3>
                    <CloseImageButton handleClose={onClose} />
                </div>
                <div className="custom-modal-body">
                    {upcomingAttendances ? (
                        <div className="attendance-card-container">
                            {upcomingAttendances.map((upcomingAttendance) => (
                                <div
                                    key={upcomingAttendance.index}
                                    className="attendance-card"
                                >
                                    <h4 className="attendance-card-title">
                                        {upcomingAttendance.memberName} ({upcomingAttendance.department})
                                    </h4>
                                    <p className="attendance-card-description">
                                        특이사항 : {" "}
                                        {upcomingAttendance.description}
                                    </p>
                                    <p className="attendance-card-attendance-date">
                                        {upcomingAttendance.startDate} ~{" "}
                                        {upcomingAttendance.endDate}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No upcoming attendance records available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UpcomingAttendanceRecordModal;
