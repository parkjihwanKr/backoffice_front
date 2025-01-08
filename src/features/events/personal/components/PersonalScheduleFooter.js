import React from 'react';
import {imagePrefix} from '../../../../utils/Constant';
import CreateVacationModal from './modal/CreateVacationModal';
import PersonalVacationListModal from "./modal/PersonalVacationListModal";
import usePersonalScheduleFooter from "../hooks/usePersonalScheduleFooter";

const PersonalScheduleFooter = () => {
    const {
        isCreateVacationModalOpen,
        isMemberVacationListModalOpen,
        handleCreateVacationModalOpen,
        handleCreateVacationModalClose,
        handleMemberVacationListModalOpen,
        handleMemberVacationListModalClose
    } = usePersonalScheduleFooter();

    return (
        <div className="personal-schedule-main-footer">
            <img
                title="휴가 추가"
                src={`${imagePrefix}/shared/create_vacation_schedule.png`}
                onClick={handleCreateVacationModalOpen}
            />
            <img
                title="휴가 리스트 조회"
                src={`${imagePrefix}/shared/find_vacation_schedule.png`}
                onClick={handleMemberVacationListModalOpen}
            />
            {isCreateVacationModalOpen && (
                <CreateVacationModal
                    handleClose={handleCreateVacationModalClose}
                />
            )}
            {isMemberVacationListModalOpen && (
                <PersonalVacationListModal
                    handleClose={handleMemberVacationListModalClose}
                />
            )}
        </div>
    );
};

export default PersonalScheduleFooter;
