import React, {useEffect, useState} from 'react';
import './EventDetailModal.css';
import UpdateDepartmentScheduleModal from './UpdateDepartmentScheduleModal';
import DeleteDepartmentScheduleModal from './DeleteDepartmentScheduleModal';
import DownloadButton from "../../../../../components/ui/DownloadButton";

const EventDetailModal = ({ isOpen, onClose, event, onUpdate, onDelete }) => {
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const imagePrefix = 'https://pjhawss3bucket.s3.ap-northeast-2.amazonaws.com/backoffice';

    const handleUpdateClick = () => setIsUpdateModalOpen(true);
    const handleDeleteClick = () => setIsDeleteModalOpen(true);

    useEffect(() => {
        console.log(event);
    }, [event]);
    const handleUpdateSubmit = (formData) => {
        if (onUpdate) {
            onUpdate(formData, event.eventId);
        }
        setIsUpdateModalOpen(false);
    };

    const handleDeleteSubmit = () => {
        onDelete(event.eventId);
        setIsDeleteModalOpen(false);
    };

    if (!isOpen || !event) return null;

    return (
        <div className="event-details-modal-overlay">
            <div className="event-details-modal">
                {/* Header */}
                <div className="event-details-modal-header">
                    <h3>{event.title}</h3>
                </div>

                {/* Body */}
                <div className="event-details-modal-body">
                    <div className="event-details-content-box">
                        <p style={{ fontSize : '1.2rem'}}>{event.description}</p>
                    </div>
                    <p className="event-details-small-text">시작일: {new Date(event.startDate).toLocaleString()}</p>
                    <p className="event-details-small-text">종료일: {new Date(event.endDate).toLocaleString()}</p>
                    {event.fileUrlList && event.fileUrlList.length > 0 && (
                        <DownloadButton fileList={event.fileUrlList} imagePrefix={imagePrefix} />
                    )}
                </div>

                {/* Footer */}
                <div className="event-details-modal-footer">
                    <div className="event-details-action-icon">
                        <img className="edit-schedule"
                             src={`${imagePrefix}/shared/make_schedule.png`} alt="edit_schedule"
                             onClick={handleUpdateClick}/>
                        <img className="delete-schedule"
                             src={`${imagePrefix}/shared/delete_schedule.png`} alt="delete_schedule"
                             onClick={handleDeleteClick}/>
                        <img className="close-schedule"
                             src={`${imagePrefix}/shared/close-schedule.png`} alt="close_schedule"
                             onClick={onClose}/>
                    </div>
                </div>
            </div>

            {/* Update 모달 */}
            <UpdateDepartmentScheduleModal
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                onSubmit={handleUpdateSubmit}
            />

            {/* Delete 모달 */}
            <DeleteDepartmentScheduleModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onDelete={handleDeleteSubmit}
            />
        </div>
    );
};

export default EventDetailModal;