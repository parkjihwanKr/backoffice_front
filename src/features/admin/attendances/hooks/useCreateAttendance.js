// hooks/useCreateAttendance.js
import {useEffect, useState} from "react";
import {fetchMemberList} from "../../members/services/MemberManagementService";
import {createAttendance} from "../services/AttendanceManagementService";
import DateUtils from "../../../../utils/DateUtils";
import {alertError, alertSuccess} from "../../../../utils/ErrorUtils";

const useCreateAttendance = (onSubmit, onClose) => {
    const [memberList, setMemberList] = useState([]);
    const [memberName, setMemberName] = useState("");
    const [attendanceStatus, setAttendanceStatus] = useState("");
    const [customStartDate, setCustomStartDate] = useState("");
    const [customEndDate, setCustomEndDate] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        const todayISOString = DateUtils.getTodayAsISOString();
        setCustomStartDate(`${todayISOString.substring(0, 11)}09:00`);
        setCustomEndDate(`${todayISOString.substring(0, 11)}18:00`);
    }, []);

    useEffect(() => {
        const loadMemberList = async () => {
            try {
                const members = await fetchMemberList();
                setMemberList(members);
            } catch (error) {
                console.error("멤버 목록 가져오기 오류:", error);
            }
        };
        loadMemberList();
    }, []);

    const handleCreateAttendance = async () => {
        if (!memberName || !attendanceStatus || !customStartDate || !customEndDate) {
            alert("모든 필수 필드를 입력해주세요.");
            return;
        }

        const data = {
            memberName,
            attendanceStatus,
            startDate: customStartDate,
            endDate: customEndDate,
            description,
        };

        try {
            const response = await createAttendance(data);
            alertSuccess("근태 기록이 성공적으로 생성되었습니다.");
            onSubmit(response);
            onClose();
        } catch (error) {
            alertError(error);
        }
    };

    return {
        memberList,
        memberName,
        setMemberName,
        attendanceStatus,
        setAttendanceStatus,
        customStartDate,
        setCustomStartDate,
        customEndDate,
        setCustomEndDate,
        description,
        setDescription,
        handleCreateAttendance,
    };
};

export default useCreateAttendance;
