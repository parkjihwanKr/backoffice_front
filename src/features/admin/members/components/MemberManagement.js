import './MemberManagement.css';
import MemberManagementBody from "./body/MemberManagementBody";
import MemberManagementFooter from "./footer/MemberManagementFooter";
import MemberManagementHeader from "./header/MemberManagementHeader";
import { useState } from "react"; // 스타일 정의

const MemberManagement = () => {
    // 필터 상태
    const [filters, setFilters] = useState({
        position: null,
        department: null
    });

    // 페이지 관련 상태
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    // 필터가 변경되면 호출되는 함수
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters); // 필터 상태 업데이트
        setCurrentPage(0); // 필터가 변경되면 페이지를 첫 페이지로 리셋
    };

    // 페이지 변경 시 호출되는 함수
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // totalPages가 변경되면 업데이트
    const updateTotalPages = (newTotalPages) => {
        setTotalPages(newTotalPages);
    };

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