// hooks/useModalVisibility.js
import { useState } from 'react';

export const useModalVisibility = () => {
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const openUpdateModal = () => setIsUpdateModalOpen(true);
    const closeUpdateModal = () => setIsUpdateModalOpen(false);

    const openDeleteModal = () => setIsDeleteModalOpen(true);
    const closeDeleteModal = () => setIsDeleteModalOpen(false);

    return {
        isUpdateModalOpen,
        isDeleteModalOpen,
        openUpdateModal,
        closeUpdateModal,
        openDeleteModal,
        closeDeleteModal,
    };
};
