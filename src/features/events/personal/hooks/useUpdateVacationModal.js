
// useUpdateVacationModal.js
import { useEffect, useState } from 'react';
import { updateVacationSchedule } from '../services/PersonalScheduleService';

const useUpdateVacationModal = (selectedVacation, handleClose) => {
    const [vacationTitle, setVacationTitle] = useState('');
    const [vacationType, setVacationType] = useState('');
    const [vacationStartDate, setVacationStartDate] = useState('');
    const [vacationEndDate, setVacationEndDate] = useState('');
    const [urgent, setUrgent] = useState(false);
    const [urgentReason, setUrgentReason] = useState('');
    const [showWarningModal, setShowWarningModal] = useState(false);

    useEffect(() => {
        if (selectedVacation) {
            setVacationTitle(selectedVacation.title || '');
            setVacationType('');
            setVacationStartDate('');
            setVacationEndDate('');
            setUrgent(selectedVacation.urgent || false);
            setUrgentReason(selectedVacation.urgentReason || '');
        }
    }, [selectedVacation]);

    const handleUrgentToggle = () => {
        setUrgent((prevState) => !prevState);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formatDateWithoutTimezone = (date) => {
            const formattedDate = new Date(date).toISOString();
            return formattedDate.slice(0, 19); // Remove timezone (YYYY-MM-DDTHH:mm:ss)
        };

        const formattedStartDate = formatDateWithoutTimezone(vacationStartDate);
        const formattedEndDate = formatDateWithoutTimezone(vacationEndDate);

        const updatedVacationData = {
            title: vacationTitle,
            vacationType: vacationType,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            urgent: urgent,
            urgentReason: urgentReason,
        };

        try {
            await updateVacationSchedule(
                selectedVacation.vacationId, updatedVacationData);
            handleClose(); // Close modal after successful update
        } catch (error) {
            console.error("Error updating vacation:", error);
        }
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
        urgent,
        handleUrgentToggle,
        urgentReason,
        setUrgentReason,
        showWarningModal,
        setShowWarningModal,
        handleSubmit
    };
};

export default useUpdateVacationModal;