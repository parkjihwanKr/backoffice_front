import React from "react";
import "../../../../../../components/ui/modal/Modal.css";
import CloseImageButton from "../../../../../../components/ui/image/CloseImageButton";
import SubmitButton from "../../../../../../components/ui/buttons/SubmitButton";
import useCreateAttendance from "../../../hooks/useCreateAttendance";

const CreateAttendanceModal = ({ onClose, onSubmit }) => {
    const {
        memberList,
        memberId,
        setMemberId,
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
    } = useCreateAttendance(onSubmit, onClose);

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <h3>근태 기록 수동 생성</h3>
                    <CloseImageButton handleClose={onClose} />
                </div>
                <div className="custom-modal-body">
                    <div className="custom-modal-body-content">
                        <label className="custom-modal-body-content-label">멤버 이름:</label>
                        <select
                            value={memberName}
                            className="custom-modal-body-select"
                            onChange={(e) => {
                                const selectedMember = memberList.find(member => member.memberName === e.target.value);
                                setMemberName(e.target.value);
                                setMemberId(selectedMember ? selectedMember.memberId : ""); // 멤버 ID 설정
                            }}
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
                    <label className="custom-modal-body-content-label">시작일:</label>
                    <input
                        type="datetime-local"
                        value={customStartDate}
                        onChange={(e) => setCustomStartDate(e.target.value)}
                    />
                    <label className="custom-modal-body-content-label">마감일:</label>
                    <input
                        type="datetime-local"
                        value={customEndDate}
                        onChange={(e) => setCustomEndDate(e.target.value)}
                    />
                    <label className="custom-modal-body-content-label">설명:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="custom-modal-body-textarea"
                        placeholder="변경 사항을 입력하세요."
                    />
                </div>
                <div className="custom-modal-footer">
                    <SubmitButton onSubmit={handleCreateAttendance} text="생성" />
                </div>
            </div>
        </div>
    );
};

export default CreateAttendanceModal;
