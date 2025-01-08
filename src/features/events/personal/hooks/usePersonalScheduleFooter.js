// usePersonalScheduleFooter.js
import { useState } from 'react';

const usePersonalScheduleFooter = () => {
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

    return {
        isCreateVacationModalOpen,
        isMemberVacationListModalOpen,
        handleCreateVacationModalOpen,
        handleCreateVacationModalClose,
        handleMemberVacationListModalOpen,
        handleMemberVacationListModalClose
    };
};

export default usePersonalScheduleFooter;
