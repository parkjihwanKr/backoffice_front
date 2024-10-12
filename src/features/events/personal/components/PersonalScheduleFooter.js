import React, { useState } from 'react';
import { imagePrefix } from '../../../../utils/Constant';
import './PersonalScheduleFooter.css';
import CreateVacationModal from './details/CreateVacationModal';
import PersonalVacationListModal from "./PersonalVacationListModal";

const PersonalScheduleFooter = () => {
    const [isCreateVacationModalOpen, setCreateVacationModalOpen] = useState(false);
    const [isMemberVacationListModalOpen, setMemberVacationListModalOpen] = useState(false);
    const handleCreateVacationModalOpen = () => {
        setCreateVacationModalOpen(true);
    };

    const handleCreateVacationModalClose = () => {
        setCreateVacationModalOpen(false);
    };

    const handleMemberVacationListModalOpen = () => {
        setMemberVacationListModalOpen(true);
    };

    const handleMemberVacationListModalClose = () => {
        setMemberVacationListModalOpen(false);
    };

    return (
        <div className="personal-schedule-main-footer">
            <img
                title="휴가 추가"
                src={`${imagePrefix}/shared/create_vacation_schedule.png`}
                onClick={handleCreateVacationModalOpen}  // 클릭 시 모달 열기
            />
            <img
                title="휴가 리스트 조회"
                src={`${imagePrefix}/shared/find_vacation_schedule.png`}
                onClick={handleMemberVacationListModalOpen}  // 클릭 시 모달 열기
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
