// ResetFiltersModal.js
import React from 'react';
import './ResetFiltersModal.css';
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";

const ResetFilterModal = ({ onClose, onConfirm }) => {
    return (
        <div className="reset-filter-modal-overlay">
            <div className="reset-filter-modal">
                <div className="reset-filter-modal-header">
                    <h3>전체 보기</h3>
                    <CloseImageButton handleClose={onClose}/>
                </div>
                <p>필터를 초기화하고 전체 휴가를 보시겠습니까?</p>
                <div className="reset-filter-modal-footer">
                    <button onClick={onConfirm}>확인</button>
                </div>
            </div>
        </div>
    );
};

export default ResetFilterModal;
