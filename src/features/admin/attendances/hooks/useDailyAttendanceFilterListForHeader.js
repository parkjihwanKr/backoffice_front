// useDailyAttendanceFilterListForHeader.js

import { useState, useEffect } from 'react';
import { fetchMemberList } from "../../members/services/MemberManagementService";

const useDailyAttendanceFilterListForHeader = (setFilters, applyFilters) => {

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

    const handleFilterSubmit = () => {
        const formattedFilters = {
            ...localFilters,
            page: 1,
        };

        setFilters(formattedFilters);
        if (applyFilters) applyFilters();
    };

    const resetFilters = () => {
        const initialFilters
            = { department: null, memberName: null, year: null, month: null, page: 1 };
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

export default useDailyAttendanceFilterListForHeader;
