import React, { useState } from 'react';
import { imagePrefix } from '../../../../utils/Constant';
import './PersonalScheduleFooter.css';
import CreateVacationModal from './details/CreateVacationModal';

const PersonalScheduleFooter = () => {
    const [isVacationModalOpen, setVacationModalOpen] = useState(false);

    const handleVacationModalOpen = () => {
        setVacationModalOpen(true);
    };

    const handleVacationModalClose = () => {
        setVacationModalOpen(false);
    };

    return (
        <div className="personal-schedule-main-footer">
            <img
                title="휴가 추가"
                src={`${imagePrefix}/shared/create_vacation_schedule.png`}
                onClick={handleVacationModalOpen}  // 클릭 시 모달 열기
            />

            {isVacationModalOpen && (
                <CreateVacationModal
                    handleClose={handleVacationModalClose}
                />
            )}
        </div>
    );
};

export default PersonalScheduleFooter;
