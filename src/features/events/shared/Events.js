/*Events.js*/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Events.css';
import DepartmentSelectModal from './DepartmentSelectModal';

const Events = () => {
    const navigate = useNavigate();
    const [is_modal_open, set_is_modal_open] = useState(false); // 모달 상태 관리

    const go_to_company_schedule = () => {
        navigate('/company-schedule'); // 회사 일정표 페이지로 이동
    };

    const open_department_modal = () => {
        set_is_modal_open(true); // 모달 열기
    };

    const close_department_modal = () => {
        set_is_modal_open(false); // 모달 닫기
    };

    const handle_department_select = (selected_department) => {
        navigate(`/department-schedule/${selected_department}`); // 부서 일정표 페이지로 이동
        close_department_modal();
    };

    return (
        <div className="events-page">
            <h1>일정 관리 페이지</h1>
            <div className="schedule-buttons">
                <button className="schedule-button" onClick={go_to_company_schedule}>
                    회사 스케줄
                </button>
                <button className="schedule-button" onClick={open_department_modal}>
                    부서 스케줄
                </button>
            </div>

            {/* 모달 컴포넌트 호출 */}
            {is_modal_open && (
                <DepartmentSelectModal
                    on_close={close_department_modal}
                    on_select={handle_department_select}
                />
            )}
        </div>
    );
};

export default Events;
