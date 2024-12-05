// AuditManagement.js
import React, { useState, useEffect } from 'react';
import AuditManagementHeader from './header/AuditManagementHeader';
import AuditManagementBody from './body/AuditManagementBody';
import { useAuditFilterList } from '../hooks/useAuditFilterList';
import PaginationFooter from "../../../../components/common/PaginationFooter";

const AuditManagement = () => {
    const { auditList, loading, error, totalPages, fetchFilteredAuditList } = useAuditFilterList();
    const [filters, setFilters] = useState({});
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        fetchFilteredAuditList(filters, currentPage); // 필터나 페이지 변경 시 데이터 로드
    }, [filters, currentPage]);

    // 필터를 설정할 때 페이지를 초기화
    const handleSetFilters = (newFilters) => {
        setFilters(newFilters);
        setCurrentPage(0); // 페이지 초기화
    };

    return (
        <div className="audit-management">
            <AuditManagementHeader
                setFilters={handleSetFilters}  // 업데이트된 handleSetFilters 전달
            />
            <AuditManagementBody
                auditList={auditList}
                loading={loading}
                error={error}
            />
            <PaginationFooter
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default AuditManagement;
