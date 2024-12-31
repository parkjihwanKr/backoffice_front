import React, { useEffect, useState } from "react";
import "../../../../../../components/ui/modal/Modal.css";
import CloseImageButton from "../../../../../../components/ui/image/CloseImageButton";
import SubmitButton from "../../../../../../components/ui/buttons/SubmitButton";
import { fetchMemberList } from "../../../../members/services/MemberManagementService";
import { createAttendance } from "../../../services/AttendanceManagementService";
import DateUtils from "../../../../../../utils/DateUtils";

const CreateAttendanceModal = ({ onClose, onSubmit }) => {
    const [memberList, setMemberList] = useState([]);
    const [memberName, setMemberName] = useState("");
    const [attendanceStatus, setAttendanceStatus] = useState("");
    const [customStartDate, setCustomStartDate] = useState(""); // 출근 시간
    const [customEndDate, setCustomEndDate] = useState(""); // 퇴근 시간
    const [description, setDescription] = useState("");

    // 오늘 날짜를 기반으로 기본값 생성
    useEffect(() => {
        const todayISOString = DateUtils.getTodayAsISOString(); // ISO 8601 형식으로 오늘 날짜 가져오기
        setCustomStartDate(`${todayISOString.substring(0, 11)}09:00`); // 기본값: 오전 9시
        setCustomEndDate(`${todayISOString.substring(0, 11)}18:00`); // 기본값: 오후 6시
    }, []); // 빈 배열로 설정

    // 상태 변경 후 로그 출력
    useEffect(() => {
        /*console.log("Updated customStartDate:", customStartDate);
        console.log("Updated customEndDate:", customEndDate);*/
    }, [customStartDate, customEndDate]);

    // 멤버 목록 로드
    useEffect(() => {
        const loadMemberList = async () => {
            try {
                const members = await fetchMemberList(); // API 호출로 멤버 목록 가져오기
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

        /*console.log("customStartDate (to be sent):", customStartDate); // 확인용 로그
        console.log("customEndDate (to be sent):", customEndDate); // 확인용 로그*/

        const data = {
            memberName,
            attendanceStatus,
            startDate: customStartDate,
            endDate: customEndDate,
            description,
        };

        try {
            const response = await createAttendance(data);
            alert("근태 기록이 성공적으로 생성되었습니다.");
            onSubmit(response); // 생성된 데이터 부모로 전달
            onClose(); // 모달 닫기
        } catch (error) {
            alert(`${error.response.data.data} : ${error.response.data.message}`);
        }
    };

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <h3>근태 기록 수동 생성</h3>
                    <CloseImageButton handleClose={onClose}/>
                </div>
                <div className="custom-modal-body">
                    <div className="custom-modal-body-content">
                        <label className="custom-modal-body-content-label">
                            멤버 이름 :
                        </label>
                        <select
                            value={memberName}
                            className="custom-modal-body-select"
                            onChange={(e) => setMemberName(e.target.value)}
                        >
                            <option value="">멤버 선택</option>
                            {memberList.map((member) => (
                                <option key={member.memberId} value={member.memberName}>
                                    {member.memberName} ({member.department} - {member.position})
                                </option>
                            ))}
                        </select>
                        <label className="custom-modal-body-content-label">근태 상태:</label>
                        <select
                            value={attendanceStatus}
                            className="custom-modal-body-select"
                            onChange={(e) => setAttendanceStatus(e.target.value)}
                        >
                            <option value="">선택하세요</option>
                            <option value="ON_TIME">정시 출근</option>
                            <option value="LATE">지각</option>
                            <option value="ABSENT">결근</option>
                            <option value="VACATION">휴가</option>
                            <option value="OUT_OF_OFFICE">외근</option>
                            <option value="HOLIDAY">휴일</option>
                        </select>
                    </div>
                    <label className="custom-modal-body-content-label">
                        시작일 :
                    </label>
                    <input
                        type="datetime-local"
                        placeholder="YYYY-MM-DD HH:mm 형식으로 입력"
                        value={customStartDate}
                        onChange={(e) => setCustomStartDate(e.target.value)} // 상태 업데이트
                    />
                    <label className="custom-modal-body-content-label">
                        마감일 :
                    </label>
                    <input
                        type="datetime-local"
                        placeholder="YYYY-MM-DD HH:mm 형식으로 입력"
                        value={customEndDate}
                        onChange={(e) => setCustomEndDate(e.target.value)} // 상태 업데이트
                    />

                    <label className="custom-modal-body-content-label">설명:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="custom-modal-body-textarea"
                        placeholder="밑의 상황이 아니라면 꼭 적어주세요!!
                            지각은 무조건 10시 출근 ~ 18시 퇴근으로 고정되어 있습니다.
                            조퇴는 무조건 09시 출근 ~ 13시 퇴근으로 고정되어 적용됩니다.
                            오늘 기록을 생성하셨다면 새로 고침 하셔야합니다.
                            오늘 이전의 근태 기록은 IT 부장에게 문의 하셔야 합니다."
                    />
                </div>
                <div className="custom-modal-footer">
                    <SubmitButton onSubmit={handleCreateAttendance} text="생성"/>
                </div>
            </div>
        </div>
    );
};

export default CreateAttendanceModal;
