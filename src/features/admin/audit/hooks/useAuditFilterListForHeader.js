// useAuditFilterListForHeader.js
import { useState, useEffect } from 'react';
import { fetchMemberList } from "../../members/services/MemberManagementService";

const useAuditFilterListForHeader = (setFilters, applyFilters) => {
    const [memberList, setMemberList] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [localFilters, setLocalFilters] = useState({
        memberName: null,
        auditType: null,
        startDate: null,
        endDate: null,
    });

    useEffect(() => {
        const loadMemberList = async () => {
            try {
                const members = await fetchMemberList();
                setMemberList(members);
            } catch (error) {
                console.error("Error fetching member list:", error);
            }
        };

        loadMemberList();
    }, []);

    const formatDateTime = (date) => date ? date.toISOString().slice(0, 19) : null;

    const handleFilterSubmit = () => {
        const formattedFilters = {
            ...localFilters,
            startDate: localFilters.startDate ? formatDateTime(new Date(localFilters.startDate)) : null,
            endDate: localFilters.endDate ? formatDateTime(new Date(localFilters.endDate)) : null,
            page: 1, // 페이지 번호를 1로 초기화
        };

        setFilters(formattedFilters);
        if (applyFilters) applyFilters();
    };

    const resetFilters = () => {
        const initialFilters = { memberName: null, auditType: null, startDate: null, endDate: null, page: 1 };
        setLocalFilters(initialFilters);
        setFilters(initialFilters);
        if (applyFilters) applyFilters();
    };

    const toggleFilterDropdown = () => setShowFilters(!showFilters);

    return {
        memberList,
        showFilters,
        localFilters,
        setLocalFilters,
        handleFilterSubmit,
        resetFilters,
        toggleFilterDropdown,
    };
};

export default useAuditFilterListForHeader;
