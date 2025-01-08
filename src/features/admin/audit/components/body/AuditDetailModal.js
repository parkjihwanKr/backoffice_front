// AuditDetailModal.js
import React from "react";
import '../../../../../components/ui/modal/Modal.css';
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
import useModalScroll from "../../../../../hooks/useModalScroll";
import {getAuditLogTypeName} from "../../../../../utils/Constant";

const AuditDetailModal = ({ isOpen, handleClose, audit }) => {
    useModalScroll(isOpen);

    if (!isOpen) return null;

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content"
                 onClick={(e) => e.stopPropagation()}>
                <div className="custom-modal-header">
                    <h3>감사 상세 정보</h3>
                    <CloseImageButton handleClose={handleClose}/>
                </div>
                {audit ? (
                    <div className="custom-modal-body">
                        <p><strong>이름:</strong> {audit.memberName} ({audit.department}, {audit.position})</p>
                        <p><strong>발생일:</strong> {new Date(audit.createdAt).toLocaleDateString()}</p>
                        <p><strong>타입:</strong> {getAuditLogTypeName(audit.auditLogType)}</p>

                        <div className="custom-modal-body-description">
                            <p>{audit.details}</p>
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
