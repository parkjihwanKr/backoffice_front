// useCreateVacationModal.js
import { useState, useEffect } from "react";
import { createVacationSchedule } from "../services/PersonalScheduleService";

const useCreateVacationModal = (initialStartDate, handleClose) => {
    const [vacationTitle, setVacationTitle] = useState("");
    const [vacationType, setVacationType] = useState("");
    const [vacationStartDate, setVacationStartDate] = useState("");
    const [vacationEndDate, setVacationEndDate] = useState("");
    const [vacationReason, setVacationReason] = useState("");
    const [urgent, setUrgent] = useState(false);
    const [showWarningModal, setShowWarningModal] = useState(false);

    useEffect(() => {
        if (initialStartDate) {
            const localDate = new Date(
                initialStartDate.getTime() - initialStartDate.getTimezoneOffset() * 60000
            );
            const formattedStartDate = localDate.toISOString().split("T")[0];
            setVacationStartDate(formattedStartDate);
        }
    }, [initialStartDate]);

    const formatDateWithoutTimezone = (date) => {
        const formattedDate = new Date(date).toISOString();
        return formattedDate.slice(0, 19);
    };

    const handleUrgentToggle = () => {
        setUrgent((prevState) => !prevState);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!vacationTitle || !vacationType || !vacationStartDate || !vacationEndDate) {
            alert("Title, VacationType, startDate, endDate are required fields!");
            return;
        }

        const formattedStartDate = formatDateWithoutTimezone(vacationStartDate);
        const formattedEndDate = formatDateWithoutTimezone(vacationEndDate);

        const vacationData = {
            title: vacationTitle,
            vacationType: vacationType,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            urgentReason: vacationReason,
            urgent: urgent,
        };

        try {
            await createVacationSchedule(vacationData);
            handleClose();
        } catch (error) {
            console.error("휴가 생성 실패 :", error);
        }
    };

    const handleWarningModalOpen = (e) => {
        e.preventDefault();
        setShowWarningModal(true);
    };

    return {
        vacationTitle,
        setVacationTitle,
        vacationType,
        setVacationType,
        vacationStartDate,
        setVacationStartDate,
        vacationEndDate,
        setVacationEndDate,
        vacationReason,
        setVacationReason,
        urgent,
        setUrgent,
        showWarningModal,
        setShowWarningModal,
        handleUrgentToggle,
        handleSubmit,
        handleWarningModalOpen,
    };
};

export default useCreateVacationModal;