// AuditDetailModal.js
import React from "react";
import "./AuditDetailModal.css";
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";

const AuditDetailModal = ({ isOpen, onRequestClose, audit }) => {
    if (!isOpen) return null;

    return (
        <div className="custom-modal-overlay" onClick={onRequestClose}>
            <div className="custom-modal" onClick={(e) => e.stopPropagation()}>
                <h2>감사 상세 정보</h2>
                <CloseImageButton handleClose={onRequestClose} />
                {audit ? (
                    <div className="modal-content">
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
