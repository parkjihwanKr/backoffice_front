import { useState } from "react";

export const useUserInfoModal = () => {
    const [showUserInfoModal, setShowUserInfoModal] = useState(false);

    const handleShowUserModal = () => setShowUserInfoModal(true);
    const handleCloseUserModal = () => setShowUserInfoModal(false);

    return {
        showUserInfoModal,
        handleShowUserModal,
        handleCloseUserModal,
    };
};
