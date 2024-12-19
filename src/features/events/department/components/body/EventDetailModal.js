import React, {useEffect, useState} from 'react';
import '../../../../../components/ui/modal/Modal.css';
import UpdateDepartmentScheduleModal from './UpdateDepartmentScheduleModal';
import DeleteDepartmentScheduleModal from './DeleteDepartmentScheduleModal';
import DownloadButton from "../../../../../components/ui/buttons/DownloadButton";
import {imagePrefix} from '../../../../../utils/Constant';
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
import ConfirmButton from "../../../../../components/ui/buttons/ConfirmButton";

const EventDetailModal = ({ isOpen, onClose, event, onUpdate, onDelete }) => {
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleUpdateClick = () => setIsUpdateModalOpen(true);
    const handleDeleteClick = () => setIsDeleteModalOpen(true);

    useEffect(() => {
        console.log(event);
    }, [event]);
    const handleUpdateSubmit = (formData) => {
        if (onUpdate) {
            onUpdate(formData, event.eventId);
        }
        onClose();
        setIsUpdateModalOpen(false);
    };

    const handleDeleteSubmit = () => {
        onDelete(event.eventId);
        setIsDeleteModalOpen(false);
        onClose();
    };

    if (!isOpen || !event) return null;

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <h3>{event.title}</h3>
                    <CloseImageButton handleClose={onClose} />
                </div>
                <div className="custom-modal-body">
                    <div
                        className="custom-modal-body-event-details"
                        style={{
                            height: event.fileUrlList && event.fileUrlList.length > 0 ? "110px" : "80px", // 높이를 동적으로 조정
                        }}
                    >
                        <p>{event.description}</p>
                        <p className="custom-small-text">
                            시작일: {new Date(event.startDate).toLocaleString()}
                        </p>
                        <p className="custom-small-text">
                            종료일: {new Date(event.endDate).toLocaleString()}
                        </p>
                        {event.fileUrlList && event.fileUrlList.length > 0 && (
                            <DownloadButton
                                fileList={event.fileUrlList}
                                imagePrefix={imagePrefix}
                                isModal={true}
                            />
                        )}
                    </div>
                </div>

                <div className="custom-modal-footer">
                    <ConfirmButton onClick={handleUpdateClick} text={"수정"}/>
                    <ConfirmButton onClick={handleDeleteClick} text={"삭제"}/>
                </div>
            </div>

            <UpdateDepartmentScheduleModal
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                onSubmit={handleUpdateSubmit}
            />
            <DeleteDepartmentScheduleModal
                title={event.title}
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onDelete={handleDeleteSubmit}
            />
        </div>
    );
};

export default EventDetailModal;