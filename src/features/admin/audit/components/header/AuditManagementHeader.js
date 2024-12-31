import './AuditManagementHeader.css';
import React from 'react';
import FilterDropDown from '../../../../../components/common/FilterDropDown'; // 공통 컴포넌트 사용
import useAuditFilterListForHeader from '../../hooks/useAuditFilterListForHeader';
import FilterImageButton from "../../../../../components/ui/buttons/FilterImageButton";
import {AUDIT_LOG_LABELS} from '../../../../../utils/Constant';

const AuditManagementHeader = ({ setFilters, applyFilters }) => {
    const {
        memberList,
        showFilters,
        localFilters,
        setLocalFilters,
        handleFilterSubmit,
        resetFilters,
        toggleFilterDropdown,
    } = useAuditFilterListForHeader(setFilters, applyFilters);

    const filterOptions = [
        {
            name: 'memberName',
            label: '멤버 이름',
            type: 'select',
            options: memberList.map((member) => ({
                value: member.memberName,
                label: member.memberName,
            })),
        },
        {
            name: 'auditType',
            label: '감사 유형',
            type: 'select',
            options: Object.entries(AUDIT_LOG_LABELS).map(([key, label]) => ({
                value: key,
                label: label,
            })),
        },
        {
            name: 'startDate',
            label: '시작 날짜',
            type: 'input',
            inputType: 'datetime-local',
            placeholder: '시작 날짜 입력',
        },
        {
            name: 'endDate',
            label: '종료 날짜',
            type: 'input',
            inputType: 'datetime-local',
            placeholder: '종료 날짜 입력',
        },
    ];

    return (
        <div className="audit-management-header">
            <h2>감사 로그 관리 시스템</h2>
            <FilterImageButton onClick={toggleFilterDropdown} />
            <FilterDropDown
                showFilters={showFilters}
                filters={localFilters}
                setFilters={setLocalFilters}
                filterOptions={filterOptions}
                setShowFilters={toggleFilterDropdown}
                onSubmit={handleFilterSubmit}
                onReset={resetFilters}
                toggleDropdown={toggleFilterDropdown}
            />
        </div>
    );
};

export default AuditManagementHeader;
