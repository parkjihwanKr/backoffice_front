import React, { useState } from "react";
import './CreateDeaprtmentScheduleModal.css';

const CreateDepartmentScheduleModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        files: [],  // 기본값을 빈 배열로 설정
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prevData => ({
            ...prevData,
            files: e.target.files  // 파일이 있으면 추가
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // formData가 제대로 설정되었는지 확인
        console.log("Form Data:", formData);

        // 필수 필드가 비어 있는지 확인
        if (!formData.title || !formData.description || !formData.startDate || !formData.endDate) {
            alert("모든 필드를 채워 주세요.");
            return;
        }

        try {
            await onSubmit(formData);  // formData를 부모 컴포넌트로 전달하고 완료 대기
            onClose();  // 성공적으로 생성되면 모달 닫기
        } catch (error) {
            console.error("Error creating schedule:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="create-department-schedule-modal open">
            <div className="create-department-schedule-modal-content">
                <h3 className="create-department-schedule-modal-title">부서 일정 만들기</h3>
                <div className="create-department-schedule-modal-body">
                    <form onSubmit={handleSubmit}>
                        <div className="create-department-schedule-form-group">
                            <label>제목:</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                        </div>
                        <div className="create-department-schedule-form-group">
                            <label>설명:</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} required />
                        </div>
                        <div className="create-department-schedule-form-group">
                            <label>시작 날짜와 시간:</label>
                            <input type="datetime-local" name="startDate" value={formData.startDate} onChange={handleChange} required />
                        </div>
                        <div className="create-department-schedule-form-group">
                            <label>종료 날짜와 시간:</label>
                            <input type="datetime-local" name="endDate" value={formData.endDate} onChange={handleChange} required />
                        </div>
                        <div className="create-department-schedule-form-group">
                            <label>파일 첨부:</label>
                            <input type="file" name="files" onChange={handleFileChange} multiple />
                        </div>
                        <div className="create-department-schedule-modal-footer">
                            <button type="submit" className="btn btn-primary">제출</button>
                            <button type="button" className="btn btn-secondary" onClick={onClose}>닫기</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateDepartmentScheduleModal;
