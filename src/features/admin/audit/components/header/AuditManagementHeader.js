import './AuditManagementHeader.css';
import '../../../shared/components/filter.css';
import React from 'react';
import useAuditFilterListForHeader from '../../hooks/useAuditFilterListForHeader'; // 새로 만든 훅 import
import FilterImageButton from "../../../../../components/ui/buttons/FilterImageButton";
import { AUDIT_LOG_LABELS } from '../../../../../utils/Constant';

const AuditManagementHeader = ({ setFilters, applyFilters }) => {
    const {
        memberList,
        showFilters,
        localFilters,
        setLocalFilters,
        handleFilterSubmit,
        resetFilters,
        toggleFilterDropdown,
    } = useAuditFilterListForHeader(setFilters, applyFilters); // 커스텀 훅 사용

    return (
        <div className="audit-management-header">
            <h2>감사 로그 관리 시스템</h2>
            <FilterImageButton onClick={toggleFilterDropdown} />

            {showFilters && (
                <div className="filters-dropdown">
                    <h3>필터 적용</h3>
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
