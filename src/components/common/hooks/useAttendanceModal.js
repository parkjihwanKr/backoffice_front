import { useState } from "react";
import "../../../utils/DateUtils";
import { checkTodayAttendance } from "../../../features/members/services/MembersService";
import DateUtils from "../../../utils/DateUtils";

export const useAttendanceModal = (userId) => {
    const [activeModal, setActiveModal] = useState(null);
    const [todayAttendanceId, setTodayAttendanceId] = useState(null);

    const handleAttendanceModal = async () => {
        const currentHour = new Date().getHours();
        const currentMinute = new Date().getMinutes();

        const isCheckInTime =
            (currentHour === 8 && currentMinute >= 30) ||
            (currentHour === 9) ||
            (currentHour === 10 && currentMinute === 0);

        const isCheckOutTime =
            (currentHour >= 12 && currentHour < 19) ||
            (currentHour === 19 && currentMinute === 0);

        if (isCheckInTime) {
            setActiveModal("checkIn");
            if (!todayAttendanceId) {
                await fetchTodayAttendance(userId);
            }
        } else if (isCheckOutTime) {
            setActiveModal("checkOut");
            if (!todayAttendanceId) {
                await fetchTodayAttendance(userId);
            }
        } else {
            alert(
                "출근 시간 : 08:30 ~ 10:00 / 퇴근 시간 : 17:30 ~ 19:00 / 예외적으로 조퇴의 경우 12시부터 퇴근 가능"
            );
        }
    };

    const fetchTodayAttendance = async (memberId) => {
        try {
            const today = DateUtils.getToday();
            const response = await checkTodayAttendance(memberId, today);
            setTodayAttendanceId(response.attendanceId);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCloseAttendanceModal = () => {
        setActiveModal(null);
    };

    return {
        activeModal,
        todayAttendanceId,
        handleAttendanceModal,
        handleCloseAttendanceModal,
    };
};
