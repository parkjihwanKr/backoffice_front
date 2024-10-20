import React from 'react';
import './MemberManagementFooter.css';

const MemberManagementFooter = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="member-management-pagination">
            <nav>
                <ul className="member-management-pagination-ul">
                    <li className={`member-management-page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>
                            이전
                        </button>
                    </li>
                    {[...Array(totalPages)].map((_, i) => (
                        <li key={i} className={`member-management-page-item ${i === currentPage ? 'active' : ''}`}>
                            <button
                                onClick={() => onPageChange(i)}
                                className="page-link"
                            >
                                {i + 1}
                            </button>
                        </li>
                    ))}
                    <li className={`member-management-page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>
                            다음
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default MemberManagementFooter;
