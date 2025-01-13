import { useState } from "react";
import { fetchMemberAttendance } from "../../../services/MembersService";
import { HOLIDAYS } from "../../../../../utils/Holidays";
import {alertError} from "../../../../../utils/ErrorUtils";

const useMemberAttendance = (currentYear, currentMonth, attendances = []) => {
    const [selectedAttendance, setSelectedAttendance] = useState(null);
    const [modalData, setModalData] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const openModal = async (attendanceId, year, month, day) => {
        try {
            const attendanceData = await fetchMemberAttendance(attendanceId);
            setModalData(attendanceData);
            setSelectedAttendance(attendanceId);
            setSelectedDate({ year, month, day });
            setModalOpen(true);
        } catch (error) {
            alertError(error);
        }
    };

    const closeModal = () => {
        setModalOpen(false);
        setModalData(null);
        setSelectedAttendance(null);
        setSelectedDate(null);
    };

    const getDayClass = (day) => {
        const date = new Date(currentYear, currentMonth - 1, day);
        const dayOfWeek = date.getDay();

        const holidayKey = `${currentMonth}-${day}`;
        const isHoliday = HOLIDAYS[holidayKey];

        if (isHoliday) return "holiday";
        if (dayOfWeek === 0) return "sunday";
        if (dayOfWeek === 6) return "saturday";

        return "";
    };

    const attendanceMap = attendances.reduce((map, attendance) => {
        const createdDate = attendance.createdAt
            ? new Date(attendance.createdAt).getDate()
            : null;
        if (createdDate) {
            if (!map[createdDate]) map[createdDate] = [];
            map[createdDate].push(attendance);
        }
        return map;
    }, {});

    return {
        selectedAttendance,
        modalData,
        isModalOpen,
        selectedDate,
        openModal,
        closeModal,
        getDayClass,
        attendanceMap,
    };
};

export default useMemberAttendance;
