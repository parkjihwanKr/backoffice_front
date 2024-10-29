import './AuditManagementHeader.css';
import React, { useState, useEffect } from 'react';
import { fetchMemberList } from "../../../members/services/MemberManagementService";
import FilterImageButton from "../../../../../components/ui/buttons/FilterImageButton";
import { AUDIT_LOG_LABELS } from '../../../../../utils/Constant';

const AuditManagementHeader = ({ setFilters, applyFilters }) => {
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

    const formatDateTime = (date) => {
        return date ? date.toISOString().slice(0, 19) : null;  // "yyyy-MM-ddTHH:mm:ss" 형식으로 자름
    };

    const handleFilterSubmit = () => {
        const formattedFilters = {
            ...localFilters,
            startDate: localFilters.startDate ? formatDateTime(new Date(localFilters.startDate)) : null,
            endDate: localFilters.endDate ? formatDateTime(new Date(localFilters.endDate)) : null,
        };

        setFilters(formattedFilters);
        if (applyFilters) {
            applyFilters();
        }
    };

    const resetFilters = () => {
        const initialFilters = { memberName: null, auditType: null, startDate: null, endDate: null };
        setLocalFilters(initialFilters);
        setFilters(initialFilters);
        if (applyFilters) {
            applyFilters();
        }
    };

    const toggleFilterDropdown = () => setShowFilters(!showFilters);

    return (
        <div className="audit-management-header">
            <h2>회계 감사 시스템</h2>
            <FilterImageButton onClick={toggleFilterDropdown} />

            {showFilters && (
                <div className="filters-dropdown">
                    <select
                        value={localFilters.memberName || ''}
                        onChange={(e) => setLocalFilters({ ...localFilters, memberName: e.target.value || null })}
                    >
                        <option value="">전체 멤버</option>
                        {memberList.map((member) => (
                            <option key={member.memberId} value={member.memberName}>
                                {member.memberName}
                            </option>
                        ))}
                    </select>

                    <select
                        value={localFilters.auditType || ''}
                        onChange={(e) => setLocalFilters({ ...localFilters, auditType: e.target.value || null })}
                    >
                        <option value="">전체 감사 유형</option>
                        {Object.entries(AUDIT_LOG_LABELS).map(([key, label]) => (
                            <option key={key} value={key}>
                                {label}
                            </option>
                        ))}
                    </select>

                    <input
                        type="datetime-local"
                        placeholder="시작 날짜"
                        value={localFilters.startDate || ''}
                        onChange={(e) => setLocalFilters({ ...localFilters, startDate: e.target.value || null })}
                    />
                    <input
                        type="datetime-local"
                        placeholder="종료 날짜"
                        value={localFilters.endDate || ''}
                        onChange={(e) => setLocalFilters({ ...localFilters, endDate: e.target.value || null })}
                    />
                    <button onClick={handleFilterSubmit}>조회</button>
                    <button onClick={resetFilters}>전체 보기</button>
                </div>
            )}
        </div>
    );
};

export default AuditManagementHeader;
