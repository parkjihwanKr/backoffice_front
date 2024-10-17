// hooks/useModal.js
import { useState } from 'react';

export const useModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVacation, setSelectedVacation] = useState(null);

    const openModal = (vacation) => {
        setSelectedVacation(vacation);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedVacation(null);
    };

    return {
        isModalOpen,
        selectedVacation,
        openModal,
        closeModal,
    };
};
