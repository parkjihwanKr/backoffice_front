// AuditDetailModal.js
import React from "react";
import '../../../../../components/ui/modal/Modal.css';
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
import useModalScroll from "../../../../../hooks/useModalScroll";
import { getAuditLogTypeName } from "../../../../../utils/Constant";

const AuditDetailModal = ({ isOpen, handleClose, audit }) => {
    useModalScroll(isOpen);

    if (!isOpen) return null;

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="custom-modal-header">
                    <h3>감사 상세 정보</h3>
                    <CloseImageButton handleClose={handleClose} />
                </div>
                {audit ? (
                    <div className="custom-modal-body">
                        <table className="custom-modal-table">
                            <tbody>
                            <tr>
                                <td className="custom-modal-table-column-1"><strong>이름</strong></td>
                                <td className="custom-modal-table-column-2">{audit.memberName} ({audit.department}, {audit.position})</td>
                            </tr>
                            <tr>
                                <td className="custom-modal-table-column-1"><strong>발생일</strong></td>
                                <td className="custom-modal-table-column-2">{new Date(audit.createdAt).toLocaleDateString()}</td>
                            </tr>
                            <tr>
                                <td className="custom-modal-table-column-1"><strong>감사 타입</strong></td>
                                <td className="custom-modal-table-column-2">{getAuditLogTypeName(audit.auditLogType)}</td>
                            </tr>
                            </tbody>
                        </table>
                        <div className="custom-modal-divider" />
                        <div className="custom-modal-body-description-title">
                            <strong>특이 사항</strong>
                        </div>
                        <div className="custom-modal-body-description">
                            {audit.details || "특이 사항 없음"}
                        </div>
                    </div>
                ) : (
                    <p>데이터가 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default AuditDetailModal;
