import { useState } from "react";
import { departmentMapping, positionMapping, roleMapping } from "../../../../utils/Constant";
import { updateAttribute } from "../services/MemberManagementService";

const useUpdateAttribute = (member, onSave, onClose) => {
    // 초기 상태에서 영문 값 -> 한국어 값으로 변환
    const [newDepartment, setNewDepartment] = useState(
        Object.keys(departmentMapping).find(key => departmentMapping[key] === member.department) || member.department
    );
    const [newPosition, setNewPosition] = useState(
        Object.keys(positionMapping).find(key => positionMapping[key] === member.position) || member.position
    );
    const [newRole, setNewRole] = useState(
        Object.keys(roleMapping).find(key => roleMapping[key] === member.role) || member.role
    );
    const [newFile, setNewFile] = useState(null);

    // 각 선택한 값들을 서버의 Enum 값에 맞게 변환
    const mappedDepartment = departmentMapping[newDepartment] || newDepartment;
    const mappedPosition = positionMapping[newPosition] || newPosition;
    const mappedRole = roleMapping[newRole] || newRole;

    // 변경 사항 저장
    const handleSaveChanges = async () => {
        const isDepartmentChanged = mappedDepartment !== member.department;
        const isPositionChanged = mappedPosition !== member.position;
        const isRoleChanged = mappedRole !== member.role;
        const isFileChanged = !!newFile;

        if (!isDepartmentChanged && !isPositionChanged && !isRoleChanged && !isFileChanged) {
            onClose();
            return;
        }

        const updatedData = {
            memberName: member.memberName,
            department: isDepartmentChanged ? mappedDepartment : member.department,
            position: isPositionChanged ? mappedPosition : member.position,
            role: isRoleChanged ? mappedRole : member.role,
            fileName: newFile ? newFile.name : member.fileName,
        };

        const formData = new FormData();
        formData.append("data", JSON.stringify(updatedData));
        if (newFile) {
            formData.append("file", newFile);
        }

        try {
            await updateAttribute(formData, member.memberId);
            onSave({ ...member, ...updatedData });
        } catch (error) {
            alert(error.response.data.data + " : "+error.response.data.message);
        }
    };

    return {
        newDepartment, setNewDepartment,
        newPosition, setNewPosition,
        newRole, setNewRole,
        newFile, setNewFile,
        handleSaveChanges
    };
};

export default useUpdateAttribute;
