import { useMemo } from "react";

const useMemberAttendanceDetails = (attendanceData, selectedDate) => {
    // Compute relevant date based on attendance data or the selected date
    const relevantDate = useMemo(() => {
        if (selectedDate) return selectedDate;

        if (attendanceData?.createdAt) {
            const createdAtDate = new Date(attendanceData.createdAt);
            return {
                year: createdAtDate.getFullYear(),
                month: createdAtDate.getMonth() + 1,
                day: createdAtDate.getDate(),
            };
        }

        return {
            year: "-",
            month: "-",
            day: "-",
        };
    }, [attendanceData, selectedDate]);

    return {
        relevantDate,
    };
};

export default useMemberAttendanceDetails;
