import './MemberManagement.css';
import MemberManagementBody from "./body/MemberManagementBody";
import MemberManagementFooter from "./footer/MemberManagementFooter";
import MemberManagementHeader from "./header/MemberManagementHeader";
import useFilters from "../../shared/hooks/useFilters";
import usePagination from "../../shared/hooks/usePagination";

const MemberManagement = () => {
    // 필터 상태 관리
    const { filters, handleFilterChange } = useFilters();

    // 페이지 상태 관리
    const { currentPage, totalPages, handlePageChange, updateTotalPages } = usePagination();

    return (
        <div className="member-management">
            <MemberManagementHeader onFilterChange={handleFilterChange} />
            <MemberManagementBody
                filters={filters}
                currentPage={currentPage}
                updateTotalPages={updateTotalPages}
            />
            <MemberManagementFooter
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default MemberManagement;
