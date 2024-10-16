/*VacationManagementFooter.js*/
import {imagePrefix} from "../../../../../utils/Constant";
import './VacationManagementFooter.css';
import React from "react";

const VacationManagementFooter = ({ onPrevMonth, onNextMonth }) => {
    return (
        <div className="vacation-management-footer">
            <img
                src={`${imagePrefix}/shared/last-month-schedule.png`}
                alt="vacation-management-last-month"
                onClick={onPrevMonth}
            />
            <img
                src={`${imagePrefix}/shared/next-month-schedule.png`}
                alt="vacation-management-next-month"
                onClick={onNextMonth}
            />
        </div>
    );
}

export default VacationManagementFooter;