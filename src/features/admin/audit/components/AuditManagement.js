// AuditManagement.js
import React, { useState, useEffect } from 'react';
import AuditManagementHeader from './header/AuditManagementHeader';
import AuditManagementBody from './body/AuditManagementBody';
import AuditManagementFooter from "./footer/AuditManagementFooter";
import { useAuditFilterList } from '../hooks/useAuditFilterList';

const AuditManagement = () => {
    const { auditList, loading, error, totalPages, fetchFilteredAuditList } = useAuditFilterList();
    const [filters, setFilters] = useState({});
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        fetchFilteredAuditList(filters, currentPage); // 필터나 페이지 변경 시 데이터 로드
    }, [filters, currentPage]);

    return (
        <div className="audit-management">
            <AuditManagementHeader
                setFilters={setFilters}
            />
            <AuditManagementBody
                auditList={auditList}
                loading={loading}
                error={error}
            />
            <AuditManagementFooter
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default AuditManagement;
