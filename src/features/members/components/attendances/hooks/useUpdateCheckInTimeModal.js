import { useCallback } from "react";
import { updateCheckInTime } from "../../../services/MembersService";
import DateUtils from "../../../../../utils/DateUtils";

const useUpdateCheckInTimeModal = (attendanceId, updateAttendanceInState, onClose) => {
    const handleSubmit = useCallback(async () => {
        const currentCheckInTime = DateUtils.formatDateTimeToISOString(new Date());
        try {
            const response = await updateCheckInTime(attendanceId, currentCheckInTime);
            updateAttendanceInState(response); // Update attendance state
            alert("출근 시간이 업데이트되었습니다.");
            onClose();
        } catch (error) {
            alert(
                error.response?.data?.data
                    ? `${error.response.data.data} : ${error.response.data.message}`
                    : error.message
            );
        }
    }, [attendanceId, updateAttendanceInState, onClose]);

    return {
        handleSubmit,
    };
};

export default useUpdateCheckInTimeModal;
