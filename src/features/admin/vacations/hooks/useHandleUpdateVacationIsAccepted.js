import { updateVacationIsAccepted } from '../services/VacationManagementService';

export const useHandleUpdateVacationIsAccepted = (loadVacations) => {
    const handleUpdateVacationIsAccepted = async (vacationId) => {
        try {
            await updateVacationIsAccepted(vacationId);
            loadVacations(); // 상태 변경 후 데이터 다시 로드
        } catch (error) {
            console.error('휴가 승인/미승인 처리 중 오류 발생:', error);
        }
    };

    return { handleUpdateVacationIsAccepted };
};
