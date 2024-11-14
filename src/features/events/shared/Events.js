import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Events.css';
import { imagePrefix } from '../../../utils/Constant'
import DepartmentSelectModal from './DepartmentSelectModal';

const Events = () => {
    const navigate = useNavigate();
    const [is_modal_open, set_is_modal_open] = useState(false); // 모달 상태 관리

    const go_to_personal_schedule = () => {
        navigate('/personal-schedule'); // 개인 일정표 페이지로 이동
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
        <div className="event-page-container">
            <h1 className="event-title">일정 관리 페이지</h1>
            <div className="event-row">
                <div className="event-col">
                    <div className="custom-card">
                        <div className="event-card-header">
                            <h3>부서 스케줄</h3>
                        </div>
                        <div className="event-card-img">
                            <img
                                src={`${imagePrefix}/shared/department_schedule.png`}
                                alt="부서 스케줄 이미지"
                            />
                        </div>
                        <div className="event-card-body">
                            <button className="btn-primary" onClick={open_department_modal}>
                                부서 스케줄
                            </button>
                        </div>
                    </div>
                </div>

                <div className="event-col">
                    <div className="custom-card">
                        <div className="event-card-header">
                            <h3>개인 스케줄</h3>
                        </div>
                        <div className="event-card-img">
                            <img
                                src={`${imagePrefix}/shared/personal_schedule.png`}
                                alt="개인 스케줄 이미지"
                            />
                        </div>
                        <div className="event-card-body">
                            <button className="btn-primary" onClick={go_to_personal_schedule}>
                                개인 스케줄
                            </button>
                        </div>
                    </div>
                </div>
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
