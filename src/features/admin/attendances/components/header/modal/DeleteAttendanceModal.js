import React, { useState } from "react";
import '../../../../../../components/ui/modal/Modal.css';
import CloseImageButton from "../../../../../../components/ui/image/CloseImageButton";
import AddButton from "../../../../../../components/ui/buttons/AddButton";
import DeleteButton from "../../../../../../components/ui/buttons/DeleteButton";
import SubmitButton from "../../../../../../components/ui/buttons/SubmitButton";
import { deleteAttendanceManually } from "../../../services/AttendanceManagementService";
import {alertError} from "../../../../../../utils/ErrorUtils";

const DeleteAttendanceModal = ({ onClose, onDeleteSuccess }) => {
    const [attendanceIdList, setAttendanceIdList] = useState([]);
    const [currentInput, setCurrentInput] = useState("");

    const handleAddId = () => {
        const trimmedInput = currentInput.trim();

        if (!trimmedInput) {
            alert("입력란이 비어 있습니다. 숫자를 입력하세요.");
            return;
        }

        // 입력값을 ','로 나누어 배열로 변환 후 숫자로 파싱
        const inputArray = trimmedInput
            .split(",")
            .map((id) => id.trim())
            .filter((id) => id !== "") // 빈 문자열 제거
            .map(Number); // 숫자로 변환

        // 유효하지 않은 값 검증
        const invalidInputs = inputArray.filter((id) => isNaN(id));
        if (invalidInputs.length > 0) {
            alert(`잘못된 입력이 있습니다: ${invalidInputs.join(", ")}\n숫자만 입력해주세요.`);
            return;
        }

        // 방어 코드 추가: attendanceIdList가 undefined일 경우 빈 배열로 초기화
        const currentList = attendanceIdList || [];

        // 중복된 값 확인
        const newIds = inputArray.filter((id) => !currentList.includes(id));
        const duplicateIds = inputArray.filter((id) => currentList.includes(id));

        if (duplicateIds.length > 0) {
            alert(`중복된 ID가 있습니다: ${duplicateIds.join(", ")}`);
        }

        if (newIds.length === 0) {
            alert("추가할 ID가 없습니다. 모든 입력값이 중복되었거나 잘못되었습니다.");
            return;
        }

        // 유효한 ID 추가
        setAttendanceIdList((prev) => [...(prev || []), ...newIds]);
        setCurrentInput(""); // 입력 필드 초기화
    };

    const handleDeleteAttendanceList = async () => {
        try {
            await deleteAttendanceManually(attendanceIdList);
            alert("삭제가 완료되었습니다.");

            // 성공 시 삭제된 ID 전달
            if (onDeleteSuccess) {
                onDeleteSuccess(attendanceIdList);
            }

            setAttendanceIdList([]);
            onClose();
        } catch (error) {
            alertError(error);
        }
    };

    const handleResetList = () => {
        setAttendanceIdList([]); // 리스트 초기화
    };

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <h3>근태 기록 수동 삭제</h3>
                    <CloseImageButton handleClose={onClose} />
                </div>
                <div className="custom-modal-body">
                    <div className="add-id-container-wrapper">
                        <label className="add-id-list">근태 ID 추가:</label>
                        <div className="add-id-container">
                            <input
                                type="text"
                                placeholder="근태 ID 입력"
                                value={currentInput}
                                onChange={(e) => setCurrentInput(e.target.value)}
                            />
                        </div>
                        <div className="add-button-container">
                            <AddButton
                                onClick={handleAddId}
                                text={"추가"}
                                disabled={!currentInput.trim()}
                            />
                        </div>
                    </div>
                    <div className="id-list-container">
                        {attendanceIdList.length > 0 ? (
                            <>
                                <div className="id-list-container-header">
                                    삭제할 근태 아이디 리스트
                                </div>
                                <p>{attendanceIdList.join(", ")}</p>
                                <div className="button-wrapper">
                                    <SubmitButton onSubmit={handleResetList} text={"리셋"} />
                                </div>
                            </>
                        ) : (
                            <p>추가된 ID가 없습니다.</p>
                        )}
                    </div>
                </div>
                <div className="custom-modal-footer">
                    <DeleteButton
                        onSubmit={handleDeleteAttendanceList}
                        disabled={attendanceIdList.length === 0}
                    />
                </div>
            </div>
        </div>
    );
};

export default DeleteAttendanceModal;
