import React from "react";

const AuditManagementFooter = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="management-pagination">
            <nav>
                <ul className="management-pagination-ul">
                    <li className={`management-page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 0}>
                            이전
                        </button>
                    </li>
                    {[...Array(totalPages)].map((_, i) => (
                        <li key={i} className={`management-page-item ${i === currentPage ? 'active' : ''}`}>
                            <button
                                onClick={() => onPageChange(i)}
                                className="page-link"
                            >
                                {i + 1}
                            </button>
                        </li>
                    ))}
                    <li className={`management-page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}>
                            다음
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default AuditManagementFooter;
