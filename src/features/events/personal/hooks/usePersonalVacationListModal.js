// usePersonalVacationListModal.js
import { useEffect, useState } from "react";
import { getMemberVacationList } from "../services/PersonalScheduleService";
import { adjustModalAlignment, addModalAlignmentListener } from "../../../../utils/ModalUtils";

const usePersonalVacationListModal = (id) => {
    const [vacationList, setVacationList] = useState([]);
    const [remainingVacationDays, setRemainingVacationDays] = useState(0);
    const [selectedVacation, setSelectedVacation] = useState(null);
    const [hoveredVacationId, setHoveredVacationId] = useState(null);
    const [isUpdateVacationModalOpen, setUpdateVacationModalOpen] = useState(false);
    const [isDeleteVacationModalOpen, setDeleteVacationModalOpen] = useState(false);

    useEffect(() => {
        const fetchVacationList = async () => {
            try {
                const response = await getMemberVacationList(id);
                setVacationList(response.vacationList || []);
                setRemainingVacationDays(response.remainingVacationDays);
            } catch (error) {
                console.error("Error fetching vacation list:", error);
            }
        };

        fetchVacationList();
    }, [id]);

    useEffect(() => {
        if (vacationList.length > 0) {
            const modalOverlay = document.querySelector(".vacationList-modal-overlay");
            const modalContent = document.querySelector(".vacationList-vacation-modal-content");

            adjustModalAlignment(modalOverlay, modalContent);

            const cleanup = addModalAlignmentListener(modalOverlay, modalContent);

            return cleanup;
        }
    }, [vacationList]);

    const handleUpdateVacationModalOpen = (selectedVacation) => {
        setSelectedVacation(selectedVacation);
        setUpdateVacationModalOpen(true);
    };

    const handleUpdateVacationModalClose = () => {
        setUpdateVacationModalOpen(false);
    };

    const handleDeleteVacationModalOpen = (selectedVacation) => {
        setSelectedVacation(selectedVacation);
        setDeleteVacationModalOpen(true);
    };

    const handleDeleteVacationModalClose = () => {
        setDeleteVacationModalOpen(false);
    };

    return {
        vacationList,
        remainingVacationDays,
        selectedVacation,
        hoveredVacationId,
        setHoveredVacationId,
        isUpdateVacationModalOpen,
        handleUpdateVacationModalOpen,
        handleUpdateVacationModalClose,
        isDeleteVacationModalOpen,
        handleDeleteVacationModalOpen,
        handleDeleteVacationModalClose
    };
};

export default usePersonalVacationListModal;