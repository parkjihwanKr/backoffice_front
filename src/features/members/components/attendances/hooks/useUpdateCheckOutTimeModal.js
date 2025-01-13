import { useState } from "react";
import { updateCheckOutTime } from "../../../services/MembersService";
import DateUtils from "../../../../../utils/DateUtils";
import {alertError, alertSuccess} from "../../../../../utils/ErrorUtils";

const useUpdateCheckOutTimeModal = (attendanceId, updateAttendanceInState, onClose) => {
    const [description, setDescription] = useState(""); // 설명 입력값

    const handleSubmit = async () => {
        const currentCheckOutTime = DateUtils.formatDateTimeToISOString(new Date());
        try {
            const response = await updateCheckOutTime(attendanceId, currentCheckOutTime, description);

            // 드롭 다운
            if(updateAttendanceInState !== undefined){
                updateAttendanceInState(response); // 상태 업데이트
            }
            // 드롭 다운이 아닌 멤버 근태 기록에서 변경하는 경우
            alertSuccess("퇴근 시간이 업데이트 되었습니다.");
            onClose();
        } catch (error) {
            alertError(error);
        }
    };

    return {
        description,
        setDescription,
        handleSubmit,
    };
};

export default useUpdateCheckOutTimeModal;
