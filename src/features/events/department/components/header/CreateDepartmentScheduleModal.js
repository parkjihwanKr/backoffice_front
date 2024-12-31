import React, { useState } from "react";
import '../../../../../components/ui/modal/Modal.css';
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
import ConfirmButton from "../../../../../components/ui/buttons/ConfirmButton";

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
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <h3 className="custom-modal-title">
                        부서 일정 만들기
                    </h3>
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
                                required/>
                        </div>
                        <div className="custom-modal-form-group">
                            <label>설명:</label>
                            <textarea name="description"
                                      className="custom-modal-body-textarea"
                                      value={formData.description}
                                      onChange={handleChange}
                                      required/>
                        </div>
                        <div className="custom-modal-form-group">
                            <label>시작 날짜와 시간:</label>
                            <input type="datetime-local" name="startDate" value={formData.startDate}
                                   onChange={handleChange} required/>
                        </div>
                        <div className="custom-modal-form-group">
                            <label>종료 날짜와 시간:</label>
                            <input type="datetime-local" name="endDate" value={formData.endDate} onChange={handleChange}
                                   required/>
                        </div>
                        <div className="custom-modal-form-group">
                            <label>파일 첨부:</label>
                            <input type="file" name="files" onChange={handleFileChange} multiple/>
                        </div>
                        <div className="custom-modal-form-group-right">
                            ※ 한 달 일정만 생성해주세요!
                        </div>
                        <div className="custom-modal-footer">
                            <ConfirmButton onSubmit={handleSubmit} text={"제출"}/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateDepartmentScheduleModal;
