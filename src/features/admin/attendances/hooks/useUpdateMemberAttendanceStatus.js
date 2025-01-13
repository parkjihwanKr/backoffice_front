// useUpdateMemberAttendanceStatus.js
import { useState, useCallback } from "react";
import { updateAttendanceStatusForAdmin } from "../services/AttendanceManagementService";
import {alertError} from "../../../../utils/ErrorUtils";

const useUpdateMemberAttendanceStatus = (attendance, onSubmit, onClose) => {
    const [attendanceStatus, setAttendanceStatus] = useState(attendance.attendanceStatus);
    const [description, setDescription] = useState(attendance.description || "");

    const handleAttendanceStatusChange = useCallback((status) => {
        setAttendanceStatus(status);
    }, []);

    const handleDescriptionChange = useCallback((desc) => {
        setDescription(desc);
    }, []);

    const handleSubmit = useCallback(async () => {
        try {
            const updatedAttendance = await updateAttendanceStatusForAdmin(
                attendance.memberId,
                attendance.attendanceId,
                attendanceStatus,
                description
            );

            updatedAttendance.attendanceStatus = attendanceStatus; // 업데이트된 상태 반영
            updatedAttendance.description = description; // 설명 추가 반영

            onSubmit(updatedAttendance); // 부모 컴포넌트로 결과 전달
        } catch (error) {
            alertError(error);
        } finally {
            onClose(); // 모달 닫기
        }
    }, [attendance, attendanceStatus, description, onSubmit, onClose]);

    const handleCautionModal = useCallback(() => {
        alert("준비중...");
    }, []);

    return {
        attendanceStatus,
        description,
        handleAttendanceStatusChange,
        handleDescriptionChange,
        handleSubmit,
        handleCautionModal,
    };
};

export default useUpdateMemberAttendanceStatus;
