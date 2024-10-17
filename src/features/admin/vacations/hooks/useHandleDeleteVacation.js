import { deleteVacation } from '../services/VacationManagementService';

export const useHandleDeleteVacation = (loadVacations) => {
    const handleDeleteVacation = async (vacationId) => {
        try {
            await deleteVacation(vacationId);
            loadVacations(); // 삭제 후 데이터 다시 로드
        } catch (error) {
            console.error('휴가 삭제 중 오류 발생:', error);
        }
    };

    return { handleDeleteVacation };
};
