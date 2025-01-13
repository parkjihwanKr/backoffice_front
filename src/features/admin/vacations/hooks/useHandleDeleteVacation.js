import {deleteVacation} from "../services/VacationManagementService";
import {alertError, alertSuccess} from "../../../../utils/ErrorUtils";

export const useHandleDeleteVacation = (loadVacations) => {
    const handleDeleteVacation = async (vacationId, reason) => {
        try {
            await deleteVacation(vacationId, reason); // reason 포함
            alertSuccess("휴가가 성공적으로 삭제되었습니다.");
            loadVacations(); // 데이터 새로고침
        } catch (error) {
            console.error(error);
            alertError(error);
        }
    };

    return { handleDeleteVacation };
};
