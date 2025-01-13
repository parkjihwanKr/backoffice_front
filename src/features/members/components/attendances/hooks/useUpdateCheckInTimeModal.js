import { useCallback } from "react";
import { updateCheckInTime } from "../../../services/MembersService";
import DateUtils from "../../../../../utils/DateUtils";
import {alertError} from "../../../../../utils/ErrorUtils";

const useUpdateCheckInTimeModal = (attendanceId, updateAttendanceInState, onClose) => {
    const handleSubmit = useCallback(async () => {
        const currentCheckInTime = DateUtils.formatDateTimeToISOString(new Date());
        try {
            const response = await updateCheckInTime(attendanceId, currentCheckInTime);
            updateAttendanceInState(response); // Update attendance state
            alert("출근 시간이 업데이트되었습니다.");
            onClose();
        } catch (error) {
            alertError(error);
        }
    }, [attendanceId, updateAttendanceInState, onClose]);

    return {
        handleSubmit,
    };
};

export default useUpdateCheckInTimeModal;
