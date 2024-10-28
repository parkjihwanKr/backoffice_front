/* FinanceManagement.js*/
import './FinanceManagement.css';
import FinanceManagementHeader from "./header/FinanceManagementHeader";
import FinanceManagementBody from "./body/FinanceManagementBody";
import FinanceManagementFooter from "./footer/FinanceManagementFooter";
import useFilters from "../../shared/hooks/useFilters";
import usePagination from "../../shared/hooks/usePagination";

const FinanceManagement = () => {
    // 필터 상태 관리
    const { filters, handleFilterChange } = useFilters();

    // 페이지 상태 관리
    const { currentPage, totalPages, handlePageChange, updateTotalPages } = usePagination();

    return(
        <div>
            <FinanceManagementHeader
                onFilterChange={handleFilterChange}
            />
            <FinanceManagementBody/>
            <FinanceManagementFooter
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
}
export default  FinanceManagement;