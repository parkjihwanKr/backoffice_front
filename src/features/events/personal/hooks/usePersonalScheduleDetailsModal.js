// usePersonalScheduleDetails.js
import { useEffect, useState, useRef } from "react";
import { getPersonalDaySchedule } from "../services/PersonalScheduleService";
import { adjustModalAlignment, addModalAlignmentListener } from "../../../../utils/ModalUtils";

const usePersonalScheduleDetails = (show, selectedDate, memberId) => {
    const [isVacationModalOpen, setVacationModalOpen] = useState(false);
    const [editingVacation, setEditingVacation] = useState(null);
    const [deletingVacation, setDeletingVacation] = useState(null);
    const [dayEvents, setDayEvents] = useState([]);
    const [hoveredEventId, setHoveredEventId] = useState(null);

    const modalOverlayRef = useRef(null);
    const modalContentRef = useRef(null);

    useEffect(() => {
        const fetchDaySchedule = async () => {
            if (selectedDate && memberId) {
                const year = selectedDate.getFullYear();
                const month = selectedDate.getMonth();
                const day = selectedDate.getDate();

                try {
                    const data = await getPersonalDaySchedule(memberId, year, month, day);
                    setDayEvents(data);
                } catch (error) {
                    console.error("Error fetching day schedule:", error);
                }
            }
        };

        fetchDaySchedule();
    }, [selectedDate, memberId]);

    useEffect(() => {
        if (show) {
            const modalOverlay = modalOverlayRef.current;
            const modalContent = modalContentRef.current;

            adjustModalAlignment(modalOverlay, modalContent);

            const cleanup = addModalAlignmentListener(modalOverlay, modalContent);

            return cleanup;
        }
    }, [show]);

    const handleVacationModalOpen = () => {
        setVacationModalOpen(true);
    };

    const handleVacationModalClose = () => {
        setVacationModalOpen(false);
        setEditingVacation(null);
    };

    return {
        isVacationModalOpen,
        setVacationModalOpen,
        editingVacation,
        setEditingVacation,
        deletingVacation,
        setDeletingVacation,
        dayEvents,
        setDayEvents,
        hoveredEventId,
        setHoveredEventId,
        modalOverlayRef,
        modalContentRef,
        handleVacationModalOpen,
        handleVacationModalClose,
    };
};

export default usePersonalScheduleDetails;