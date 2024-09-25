import React from 'react';
import './DepartmentScheduleFooter.css';

const imagePrefix = 'https://pjhawss3bucket.s3.ap-northeast-2.amazonaws.com/backoffice';

const DepartmentScheduleFooter = ({ onPrevMonth, onNextMonth }) => {
    return (
        <div className="schedule-footer">
            <img
                src={`${imagePrefix}/shared/last-month-schedule.png`}
                alt="last-month"
                onClick={onPrevMonth}
            />
            <img
                src={`${imagePrefix}/shared/next-month-schedule.png`}
                alt="next-month"
                onClick={onNextMonth}
            />
        </div>
    );
};

export default DepartmentScheduleFooter;
