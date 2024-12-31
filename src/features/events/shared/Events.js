import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../shared/DomainContainer.css';
import {departmentMapping, imagePrefix, reverseDepartmentMapping} from '../../../utils/Constant';
import SelectDepartmentModal from '../../shared/SelectDepartmentModal';

const Events = () => {
    const navigate = useNavigate();
    const [is_modal_open, set_is_modal_open] = useState(false); // 모달 상태 관리
    const [selected_department, set_selected_department] = useState(''); // 선택된 부서

    const go_to_personal_schedule = () => {
        navigate('/personal-schedule'); // 개인 일정표 페이지로 이동
    };

    const open_department_modal = () => {
        set_is_modal_open(true); // 모달 열기
    };

    const close_department_modal = () => {
        set_is_modal_open(false); // 모달 닫기
    };

    const handle_department_select = () => {
        if (selected_department) {
            const departmentCode = departmentMapping[selected_department];
            navigate(`/department-schedule/${departmentCode}`); // 부서 일정표 페이지로 이동
            close_department_modal();
        } else {
            alert('부서를 선택해주세요.'); // 부서가 선택되지 않은 경우 경고
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
                                onClick={open_department_modal}>
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
                                onClick={go_to_personal_schedule}>
                            이동
                        </button>
                    </div>
                </div>
            </div>

            {is_modal_open && (
                <SelectDepartmentModal
                    showModal={is_modal_open}
                    onClose={close_department_modal}
                    selectedDepartment={selected_department}
                    setSelectedDepartment={set_selected_department}
                    handleSubmit={handle_department_select}
                />
            )}
        </div>
    );
};

export default Events;
