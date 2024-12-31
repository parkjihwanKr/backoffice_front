import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../shared/DomainContainer.css';
import {departmentMapping, imagePrefix} from '../../../utils/Constant';
import SelectDepartmentModal from '../../shared/SelectDepartmentModal';

const Events = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState('');

    const goToPersonalSchedule = () => {
        navigate('/personal-schedule');
    };

    const openDepartmentModal = () => {
        setIsModalOpen(true); // 모달 열기
    };

    const closeDepartmentModal = () => {
        setIsModalOpen(false); // 모달 닫기
    };

    const handleDepartmentSelect = () => {
        if (selectedDepartment) {
            const departmentCode = departmentMapping[selectedDepartment];
            navigate(`/department-schedule/${departmentCode}`);
            closeDepartmentModal();
        } else {
            alert('부서를 선택해주세요.');
        }
    };

    return (
        <div className="domain-container">
            <h1 className="domain-title">일정 관리 페이지</h1>
            <div className="domain-card-row">
                <div className="domain-card">
                    <div className="domain-card-header">
                        <h3>부서 스케줄</h3>
                    </div>
                    <div className="domain-card-body">
                        <img
                            src={`${imagePrefix}/shared/department_schedule.png`}
                            alt="부서 스케줄 이미지"
                            className="domain-card-img"/>
                        <button className="all-domain-button"
                                onClick={openDepartmentModal}>
                            이동
                        </button>
                    </div>
                </div>
                <div className="domain-card">
                    <div className="domain-card-header">
                        <h3>개인 스케줄</h3>
                    </div>
                    <div className="domain-card-body">
                        <img
                            src={`${imagePrefix}/shared/personal_schedule.png`}
                            alt="개인 스케줄 이미지"
                            className="domain-card-img"/>
                        <button className="all-domain-button"
                                onClick={goToPersonalSchedule}>
                            이동
                        </button>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <SelectDepartmentModal
                    showModal={isModalOpen}
                    onClose={closeDepartmentModal}
                    selectedDepartment={selectedDepartment}
                    setSelectedDepartment={setSelectedDepartment}
                    handleSubmit={handleDepartmentSelect}
                />
            )}
        </div>
    );
};

export default Events;
