import React from "react";
import UpcomingUpdateVacationPeriodModal from "./modal/UpcomingUpdateVacationModal";
import PersonalScheduleDetailsModal from "./modal/PersonalScheduleDetailsModal";
import PersonalScheduleFooter from "./PersonalScheduleFooter";
import { imagePrefix } from "../../../../utils/Constant";
import usePersonalSchedule from "../hooks/usePersonalSchedule";
import { useAuth } from "../../../auth/context/AuthContext";
import './PersonalSchedule.css';

const PersonalSchedule = () => {
    const { id, name } = useAuth();
    const {
        setCurrentDate,
        renderCalendarDays,
        currentMonth,
        currentYear,
        isDetailsModalOpen,
        isUpcomingModalOpen,
        selectedDate,
        handleToggleMenu,
        handleDetailsModalClose,
        handleUpcomingModalClose,
    } = usePersonalSchedule(id);

    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

    return (
        <div className="personal-schedule-container">
            <h1>{name}님의 개인 일정표</h1>
            <div className="find-upcoming-schedule">
                <img
                    src={`${imagePrefix}/shared/find_upcoming_updated_vacation_period.png`}
                    onClick={handleToggleMenu}
                    alt="이번달 휴가 정정 기간 조회"
                    title="이번달 휴가 정정 기간 조회"
                />
            </div>
            <div className="calendar">
                <div className="calendar-header">
                    <button onClick={() => setCurrentDate(new Date(currentYear, currentMonth - 1))}>&lt;&lt;</button>
                    <span className="calendar-header-year-month">
                        {`${currentYear}년 ${currentMonth + 1}월`}
                    </span>
                    <button onClick={() => setCurrentDate(new Date(currentYear, currentMonth + 1))}>&gt;&gt;</button>
                </div>
                <div className="calendar-days">
                    {daysOfWeek.map((day, index) => (
                        <div key={index} className={`day-header ${day === '일' ? 'sunday' : day === '토' ? 'saturday' : ''}`}>{day}</div>
                    ))}
                    {renderCalendarDays()}
                </div>
            </div>
            <PersonalScheduleFooter />
            <PersonalScheduleDetailsModal
                show={isDetailsModalOpen}
                handleClose={handleDetailsModalClose} // Correctly passing the handler
                selectedDate={selectedDate}
                memberId={id}
            />
            <UpcomingUpdateVacationPeriodModal
                show={isUpcomingModalOpen}
                handleClose={handleUpcomingModalClose}
            />
        </div>
    );
};

export default PersonalSchedule;
