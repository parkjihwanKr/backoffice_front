/*UpdateDepartmentScheduleModal.js*/
import React, { useState } from "react";
import './UpdateDepartmentScheduleModal.css';

const UpdateDepartmentScheduleModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
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
        <div className="modal open">
            <div className="modal-content">
                <h5 className="modal-title">부서 일정 변경하기</h5>
                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>제목:</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} required/>
                        </div>
                        <div className="form-group">
                            <label>설명:</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} required/>
                        </div>
                        <div className="form-group">
                            <label>시작 날짜와 시간:</label>
                            <input type="datetime-local" name="startDate" value={formData.startDate} onChange={handleChange} required/>
                        </div>
                        <div className="form-group">
                            <label>종료 날짜와 시간:</label>
                            <input type="datetime-local" name="endDate" value={formData.endDate} onChange={handleChange} required/>
                        </div>
                        <div className="form-group">
                            <label>파일 첨부:</label>
                            <input type="file" name="files" onChange={handleFileChange} multiple/>
                        </div>
                        <div className='modal-custom-footer'>
                            <button type="submit" className="btn btn-primary">제출</button>
                            <button type="button" className="btn btn-secondary" onClick={onClose}>닫기</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateDepartmentScheduleModal;
