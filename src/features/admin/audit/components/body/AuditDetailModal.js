// AuditDetailModal.js
import React from "react";
import "./AuditDetailModal.css";
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
import useModalScroll from "../../../../boards/shared/hooks/useModalScroll";

const AuditDetailModal = ({ isOpen, handleClose, audit }) => {
    useModalScroll(isOpen);

    if (!isOpen) return null;

    return (
        <div className="audit-details-modal-overlay">
            <div className="audit-details-modal"
                 onClick={(e) => e.stopPropagation()}>
                <div className="audit-details-modal-header">
                    <h2>감사 상세 정보</h2>
                </div>
                <CloseImageButton handleClose={handleClose}/>
                {audit ? (
                    <div className="audit-details-modal-body">
                        <p><strong>이름:</strong> {audit.memberName} ({audit.department}, {audit.position})</p>
                        <p><strong>타입:</strong> {audit.auditLogType}</p>
                        <div>
                            <p><strong>메세지:</strong> {audit.details}</p>
                        </div>
                        <p><strong>발생일:</strong> {new Date(audit.createdAt).toLocaleDateString()}</p>
                    </div>
                ) : (
                    <p>데이터가 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default AuditDetailModal;
