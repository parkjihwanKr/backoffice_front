import { useState } from "react";

const useAuditManagementModal = () => {
    const [selectedAudit, setSelectedAudit] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (audit) => {
        setSelectedAudit(audit);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedAudit(null);
        setIsModalOpen(false);
    };

    return {
        selectedAudit,
        isModalOpen,
        openModal,
        closeModal,
    };
};

export default useAuditManagementModal;
