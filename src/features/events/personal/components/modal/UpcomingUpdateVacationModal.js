import React from "react";
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
import useUpcomingVacationModal from "../../hooks/useUpcomingUpdateVacationModal";

const UpcomingUpdateVacationPeriodModal = ({ show, handleClose }) => {
    const { startDate, endDate, loading } = useUpcomingVacationModal(show);
    if (!show) return null;

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <h3>휴가 정정 기간</h3>
                    <CloseImageButton handleClose={handleClose} />
                </div>
                <div className="custom-modal-body">
                    {loading ? (
                        <p>로딩 중...</p>
                    ) : (
                        <>
                            <p>
                                <strong>시작일:</strong> {startDate || "정보 없음"}
                            </p>
                            <p>
                                <strong>종료일:</strong> {endDate || "정보 없음"}
                            </p>
                        </>
                    )}
                </div>
                <div className="custom-modal-footer">
                    ☆ 해당 기간은 둘째주 월요일부터 셋째주 금요일입니다. <br/>
                    ☆ 해당 기간은 관리자에 의해 변경될 수 있습니다.(알림)
                </div>
            </div>
        </div>
    );
};

export default UpcomingUpdateVacationPeriodModal;
