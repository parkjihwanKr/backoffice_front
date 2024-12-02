import React, { useEffect, useState } from "react";
import "../../../../../components/ui/modal/Modal.css";
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
import SubmitButton from "../../../../../components/ui/buttons/SubmitButton";
import { fetchMemberList } from "../../../members/services/MemberManagementService";
import { createAttendanceManually } from "../../services/AttendanceManagementService";

const CreateAttendanceModal = ({ onClose, onSubmit }) => {
    const [memberList, setMemberList] = useState([]);
    const [memberName, setMemberName] = useState("");
    const [attendanceStatus, setAttendanceStatus] = useState("");
    const [checkIn, setCheckIn] = useState(""); // 출근 시간
    const [checkOut, setCheckOut] = useState(""); // 퇴근 시간
    const [description, setDescription] = useState("");

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

    // 폼 제출 핸들러
    const handleCreateAttendanceManually = async () => {
        if (!memberName || !attendanceStatus || !checkIn || !checkOut) {
            alert("모든 필수 필드를 입력해주세요.");
            return;
        }

        const data = {
            memberName,
            attendanceStatus,
            checkInTime: checkInWithSeconds,
            checkOutTime: checkOutWithSeconds,
            description,
        };

        try {
            const response = await createAttendanceManually(data);
            alert("근태 기록이 성공적으로 생성되었습니다.");
            onSubmit(response); // UI 업데이트를 위해 부모 컴포넌트에 전달
            onClose(); // 모달 닫기
        } catch (error) {
            console.error("근태 기록 생성 실패:", error);
            alert(`근태 기록 생성 실패: ${error.response?.data?.message || error.message}`);
        }
    };

    const withSeconds = (time) => {
        if (time.includes(":") && !time.includes("T")) {
            return `${time}:00`; // 초가 없는 경우 기본값으로 ":00" 추가
        }
        return time;
    };

    // 사용 예시
    const checkInWithSeconds = withSeconds(checkIn);
    const checkOutWithSeconds = withSeconds(checkOut);

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <h3>근태 기록 수동 생성</h3>
                    <CloseImageButton handleClose={onClose} />
                </div>
                <div className="custom-modal-body">
                    <div className="custom-modal-body-index">
                        <label>멤버 이름:</label>
                        <select
                            value={memberName}
                            onChange={(e) => setMemberName(e.target.value)}
                        >
                            <option value="">멤버 선택</option>
                            {memberList.map((member) => (
                                <option key={member.memberId} value={member.memberName}>
                                    {member.memberName} ({member.department} - {member.position})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="custom-modal-body-index">
                        <label>근태 상태:</label>
                        <select
                            value={attendanceStatus}
                            onChange={(e) => setAttendanceStatus(e.target.value)}
                        >
                            <option value="">선택하세요</option>
                            <option value="ON_TIME">정시 출근</option>
                            <option value="LATE">지각</option>
                            <option value="ABSENT">결근</option>
                            <option value="VACATION">휴가</option>
                            <option value="OUT_OF_OFFICE">외근</option>
                        </select>
                    </div>
                    <div className="custom-modal-body-index">
                        <label>출근 시간:</label>
                        <input
                            type="datetime-local"
                            placeholder="YYYY-MM-DD HH:mm 형식으로 입력"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                        />
                    </div>
                    <div className="custom-modal-body-index">
                        <label>퇴근 시간:</label>
                        <input
                            type="datetime-local"
                            placeholder="YYYY-MM-DD HH:mm 형식으로 입력"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                        />
                    </div>

                    <div className="custom-modal-body-index">
                        <label>설명:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="설명 입력 (선택 사항)"
                        />
                    </div>
                </div>
                <div className="custom-modal-footer">
                    <SubmitButton onSubmit={handleCreateAttendanceManually} text="생성" />
                </div>
            </div>
        </div>
    );
};

export default CreateAttendanceModal;
