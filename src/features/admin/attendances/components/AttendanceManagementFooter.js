import React from "react";
import "../../../../components/common/PaginationFooter.css";
import useAttendancePagination from "../hooks/useAttendancePagination";

const AttendanceManagementFooter = ({ currentPage, totalPages, onPageChange, isFebruaryWith28Days }) => {
    const { pageNumbers, adjustedTotalPages }
        = useAttendancePagination(currentPage, totalPages, isFebruaryWith28Days);

    return (
        <div className="custom-pagination">
            <nav>
                <ul className="custom-pagination-ul">
                    {/* "이전" 버튼 */}
                    <li className={`custom-page-item ${currentPage === 0 ? "disabled" : ""}`}>
                        <button
                            className="page-link"
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 0}
                        >
                            이전
                        </button>
                    </li>

                    {/* 페이지 번호 */}
                    {pageNumbers.map((pageNumber) => (
                        <li
                            key={pageNumber}
                            className={`custom-page-item ${pageNumber === currentPage ? "active" : ""}`}
                        >
                            <button
                                onClick={() => onPageChange(pageNumber)}
                                className="page-link"
                            >
                                {pageNumber + 1}
                            </button>
                        </li>
                    ))}

                    {/* "다음" 버튼 */}
                    <li
                        className={`custom-page-item ${currentPage === adjustedTotalPages - 1 ? "disabled" : ""}`}
                    >
                        <button
                            className="page-link"
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === adjustedTotalPages - 1}
                        >
                            다음
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default AttendanceManagementFooter;
