/*UpdateDepartmentScheduleModal.js*/
import React, { useState } from "react";
import '../../../../../components/ui/modal/Modal.css';
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
import ConfirmButton from "../../../../../components/ui/buttons/ConfirmButton";

const UpdateDepartmentScheduleModal = ({ isOpen, title, description, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: title || '',
        description: description || '',
        startDate: '',
        endDate: '',
        files: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prevData => ({ ...prevData, files: e.target.files }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <h3 className="custom-modal-title">
                        부서 일정 변경하기
                    </h3>
                    <CloseImageButton handleClose={onClose}/>
                </div>
                <div className="custom-modal-body">
                    <form onSubmit={handleSubmit}>
                        <div className="custom-modal-form-group">
                            <label>제목:</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} required/>
                        </div>
                        <div className="custom-modal-form-group">
                            <label>설명:</label>
                            <textarea name="description"
                                      className="custom-modal-body-textarea"
                                      value={formData.description} onChange={handleChange} required/>
                        </div>
                        <div className="custom-modal-form-group">
                            <label>시작 날짜와 시간:</label>
                            <input type="datetime-local" name="startDate" value={formData.startDate} onChange={handleChange} required/>
                        </div>
                        <div className="custom-modal-form-group">
                            <label>종료 날짜와 시간:</label>
                            <input type="datetime-local" name="endDate" value={formData.endDate} onChange={handleChange} required/>
                        </div>
                        <div className="custom-modal-form-group">
                            <label>파일 첨부:</label>
                            <input type="file" name="files" onChange={handleFileChange} multiple/>
                        </div>
                        <div className='custom-modal-footer'>
                            <ConfirmButton onClick={handleSubmit} text={"수정"}/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateDepartmentScheduleModal;
