import React from "react";
import { imagePrefix } from "../../../../../utils/Constant";
import "./AuditManagementBody.css";
import AuditDetailModal from "./AuditDetailModal";
import useAuditManagementModal from "../../hooks/useAuditManagentModal";

const AuditManagementBody = ({ auditList, loading, error }) => {
    const {
        selectedAudit,
        isModalOpen,
        openModal,
        closeModal,
    } = useAuditManagementModal();

    return (
        <div className="audit-management-body">
            <table className="audit-table">
                {!(loading || error || auditList.length === 0) && (
                    <thead>
                    <tr>
                        <th>부서</th>
                        <th>직책</th>
                        <th>이름</th>
                        <th>타입</th>
                        <th>메세지</th>
                        <th>발생일</th>
                        <th>상세보기</th>
                    </tr>
                    </thead>
                )}
                <tbody>
                {loading ? (
                    <tr>
                        <td colSpan="7">Loading...</td>
                    </tr>
                ) : error ? (
                    <tr>
                        <td colSpan="7">Error fetching data</td>
                    </tr>
                ) : auditList.length === 0 ? (
                    <tr>
                        <td colSpan="7">해당 데이터가 없습니다.</td>
                    </tr>
                ) : (
                    auditList.map((audit) => (
                        <tr key={audit.auditLogId}>
                            <td>{audit.department}</td>
                            <td>{audit.position}</td>
                            <td>{audit.memberName}</td>
                            <td>{audit.auditLogType}</td>
                            <td>{audit.details}</td>
                            <td>{new Date(audit.createdAt).toLocaleDateString()}</td>
                            <td>
                                <img
                                    className="audit-management-details"
                                    src={`${imagePrefix}/shared/find.png`}
                                    alt="상세보기"
                                    onClick={() => openModal(audit)}
                                />
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>

            {/* 상세 정보 모달 */}
            <AuditDetailModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                audit={selectedAudit}
            />
        </div>
    );
};

export default AuditManagementBody;
