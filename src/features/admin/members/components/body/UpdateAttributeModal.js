import { useState } from "react";
import { updateAttribute } from "../../services/MemberManagementService";
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
import { DEPARTMENTS, ROLES, POSITIONS, departmentMapping, roleMapping, positionMapping } from "../../../../../utils/Constant";
import './UpdateAttributeModal.css';

const UpdateAttributeModal = ({ member, onClose, onSave }) => {
    const [newDepartment, setNewDepartment] = useState(member.department);
    const [newPosition, setNewPosition] = useState(member.position);
    const [newRole, setNewRole] = useState(member.role);
    const [newFile, setNewFile] = useState(null); // 파일 업로드를 위한 상태 추가

    // 각 선택한 값들을 서버의 Enum 값에 맞게 변환
    const mappedDepartment = departmentMapping[newDepartment] || newDepartment;
    const mappedPosition = positionMapping[newPosition] || newPosition;
    const mappedRole = roleMapping[newRole] || newRole;

    // 변경 사항 저장
    const handleSaveChanges = async () => {
        // 변경된 값이 있는지 확인
        const isDepartmentChanged = mappedDepartment !== member.department;
        const isPositionChanged = mappedPosition !== member.position;
        const isRoleChanged = mappedRole !== member.role;
        const isFileChanged = !!newFile; // 파일이 선택된 경우 true

        // 변경 사항이 없는 경우 서버 요청을 하지 않음
        if (!isDepartmentChanged && !isPositionChanged && !isRoleChanged && !isFileChanged) {
            console.log("변경 사항이 없습니다.");
            onClose();
            return;
        }

        // 변경된 값들만 업데이트 데이터로 포함
        const updatedData = {
            memberName: member.memberName,
            department: isDepartmentChanged ? mappedDepartment : member.department, // 변경된 경우만 전송
            position: isPositionChanged ? mappedPosition : member.position,        // 변경된 경우만 전송
            role: isRoleChanged ? mappedRole : member.role,                        // 변경된 경우만 전송
            fileName: newFile ? newFile.name : member.fileName,                    // 파일이 있으면 파일명 포함
        };

        // 파일과 함께 데이터를 서버로 전송하는 로직
        const formData = new FormData();
        formData.append("data", JSON.stringify(updatedData)); // JSON 데이터를 문자열로 변환
        if (newFile) {
            formData.append("file", newFile); // 파일이 존재할 경우 추가
        }

        // 서버에 업데이트 요청
        try {
            await updateAttribute(formData, member.memberId); // 서버에 데이터 전송
            onSave({ ...member, ...updatedData }); // 업데이트된 정보를 onSave로 전달
        } catch (error) {
            console.error('Error updating member:', error);
        }
    };

    return (
        <div className="update-attribute-modal">
            <div className="update-attribute-modal-content">
                <div className="update-attribute-modal-header">
                    <h3>{member.memberName}님 권한 변경</h3>
                    <CloseImageButton handleClose={onClose} />
                </div>
                <div className="update-attribute-modal-body">
                    <div className="update-attribute-form-group">
                        <label htmlFor="department">부서:</label>
                        <select
                            id="department"
                            value={newDepartment}
                            onChange={(e) => setNewDepartment(e.target.value)}
                        >
                            {DEPARTMENTS.map((dept) => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </select>
                    </div>
                    <div className="update-attribute-form-group">
                        <label htmlFor="role">역할:</label>
                        <select
                            id="role"
                            value={newRole}
                            onChange={(e) => setNewRole(e.target.value)}
                        >
                            {ROLES.map((role) => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                        </select>
                    </div>
                    <div className="update-attribute-form-group">
                        <label htmlFor="position">직위:</label>
                        <select
                            id="position"
                            value={newPosition}
                            onChange={(e) => setNewPosition(e.target.value)}
                        >
                            {POSITIONS.map((position) => (
                                <option key={position} value={position}>{position}</option>
                            ))}
                        </select>
                    </div>
                    <div className="update-attribute-form-group">
                        <label htmlFor="file">파일 업로드:</label>
                        <input
                            id="file"
                            type="file"
                            onChange={(e) => setNewFile(e.target.files[0])}
                        />
                    </div>
                    <div className="update-attribute-modal-footer">
                        <button className="submit-button" onClick={handleSaveChanges}>제출</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateAttributeModal;
