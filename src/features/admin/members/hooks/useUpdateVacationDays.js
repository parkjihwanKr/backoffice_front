import { useState } from "react";
import { updateRemainingVacationDays } from "../services/MemberManagementService";

const useUpdateVacationDays = (member, onSave, onClose) => {
    const [newVacationDays, setNewVacationDays] = useState(member.remainingVacationDays);

    // 변경 사항 저장
    const handleSaveChanges = async () => {
        try {
            await updateRemainingVacationDays(member.memberId, newVacationDays);
            const updatedMember = {
                ...member,
                remainingVacationDays: newVacationDays,
            };
            onSave(updatedMember);
        } catch (error) {
            console.error('Error updating vacation days:', error);
        }
    };

    return {
        newVacationDays, setNewVacationDays,
        handleSaveChanges
    };
};

export default useUpdateVacationDays;
