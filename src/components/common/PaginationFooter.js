import React from "react";
import "./PaginationFooter.css";

const PaginationFooter = ({ currentPage, totalPages, onPageChange }) => {

    // 현재 페이지를 기준으로 시작 페이지와 끝 페이지 설정
    const startPage = Math.max(0, currentPage - 2); // 최소 0 페이지
    const endPage = Math.min(totalPages - 1, currentPage + 2); // 최대 totalPages - 1 페이지

    // startPage와 endPage를 기준으로 페이지 배열 생성
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="custom-pagination">
            <nav>
                <ul className="custom-pagination-ul">
                    <li className={`custom-page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 0}>
                            이전
                        </button>
                    </li>
                    {pageNumbers.map((pageNumber) => (
                        <li key={pageNumber} className={`custom-page-item ${pageNumber === currentPage ? 'active' : ''}`}>
                            <button
                                onClick={() => onPageChange(pageNumber)}
                                className="page-link"
                            >
                                {pageNumber + 1}
                            </button>
                        </li>
                    ))}
                    <li className={`custom-page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}>
                            다음
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default PaginationFooter;
