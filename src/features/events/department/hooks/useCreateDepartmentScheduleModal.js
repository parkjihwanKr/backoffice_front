// useCreateDepartmentScheduleModal.js
import { useState } from "react";

const useCreateDepartmentScheduleModal = (onSubmit) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        files: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            files: e.target.files,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // 필수 필드 검증
        if (!formData.title || !formData.description || !formData.startDate || !formData.endDate) {
            alert("모든 필드를 채워 주세요.");
            return;
        }

        onSubmit(formData);
    };

    return {
        formData,
        setFormData,
        handleChange,
        handleFileChange,
        handleSubmit,
    };
};

export default useCreateDepartmentScheduleModal;