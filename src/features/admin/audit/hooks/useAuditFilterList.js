// useAuditFilterList.js
import { useState } from 'react';
import { fetchAuditList} from "../services/AuditManagementService";

export const useAuditFilterList = (initialFilters = {}) => {
    const [auditList, setAuditList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(0);

    const fetchFilteredAuditList = async (filters = initialFilters, page = 0) => {
        setLoading(true);
        setError(null);

        try {
            const { data, totalPages } = await fetchAuditList(filters, page);
            setAuditList(data); // auditList 업데이트
            setTotalPages(totalPages); // totalPages 업데이트
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { auditList, loading, error, totalPages, fetchFilteredAuditList };
};
