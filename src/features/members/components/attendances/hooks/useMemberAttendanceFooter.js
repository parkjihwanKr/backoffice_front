import { useState } from "react";

const useMemberAttendanceFooter = () => {
    const [isCheckInModalOpen, setCheckInModalOpen] = useState(false);
    const [isCheckOutModalOpen, setCheckOutModalOpen] = useState(false);

    const openCheckInModal = () => setCheckInModalOpen(true);
    const closeCheckInModal = () => setCheckInModalOpen(false);

    const openCheckOutModal = () => setCheckOutModalOpen(true);
    const closeCheckOutModal = () => setCheckOutModalOpen(false);

    return {
        isCheckInModalOpen,
        isCheckOutModalOpen,
        openCheckInModal,
        closeCheckInModal,
        openCheckOutModal,
        closeCheckOutModal,
    };
};

export default useMemberAttendanceFooter;
