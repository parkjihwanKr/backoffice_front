import React from "react";
import '../../../../../components/ui/modal/Modal.css';
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
import ConfirmButton from "../../../../../components/ui/buttons/ConfirmButton";
import useCreateDepartmentScheduleModal from "../../hooks/useCreateDepartmentScheduleModal";

const CreateDepartmentScheduleModal = ({ isOpen, onClose, onSubmit }) => {
    const {
        formData,
        handleChange,
        handleFileChange,
        handleSubmit,
    } = useCreateDepartmentScheduleModal(onSubmit);

    if (!isOpen) return null;

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <h3 className="custom-modal-title">부서 일정 만들기</h3>
                    <CloseImageButton handleClose={onClose} />
                </div>
                <div className="custom-modal-body">
                    <form onSubmit={handleSubmit}>
                        <div className="custom-modal-form-group">
                            <label>제목:</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="custom-modal-form-group">
                            <label>설명:</label>
                            <textarea
                                name="description"
                                className="custom-modal-body-textarea"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="custom-modal-form-group">
                            <label>시작 날짜와 시간:</label>
                            <input
                                type="datetime-local"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="custom-modal-form-group">
                            <label>종료 날짜와 시간:</label>
                            <input
                                type="datetime-local"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="custom-modal-form-group">
                            <label>파일 첨부:</label>
                            <input
                                type="file"
                                name="files"
                                onChange={handleFileChange}
                                multiple
                            />
                        </div>
                        <div className="custom-modal-form-group-right">
                            ※ 한 달 일정만 생성해주세요!
                        </div>
                        <div className="custom-modal-footer">
                            <ConfirmButton onSubmit={handleSubmit} text={"제출"} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateDepartmentScheduleModal;
