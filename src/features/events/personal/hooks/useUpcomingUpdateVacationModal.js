// useUpcomingVacationModal.js
import { useState, useEffect } from "react";
import { getUpcomingUpdateVacationPeriod } from "../services/PersonalScheduleService";
import { alertError } from "../../../../utils/ErrorUtils";

const useUpcomingVacationModal = (show) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (show) {
            const fetchVacationPeriod = async () => {
                try {
                    setLoading(true); // 로딩 시작
                    const data = await getUpcomingUpdateVacationPeriod();
                    setStartDate(data.startDate);
                    setEndDate(data.endDate);
                } catch (error) {
                    alertError(error);
                } finally {
                    setLoading(false); // 로딩 종료
                }
            };

            fetchVacationPeriod();
        }
    }, [show]);

    return { startDate, endDate, loading };
};

export default useUpcomingVacationModal;