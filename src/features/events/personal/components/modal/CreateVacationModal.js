import React from 'react';
import '../../../../../components/ui/modal/Modal.css';
import VacationWarningModal from './VacationWarningModal';
import {imagePrefix} from "../../../../../utils/Constant";
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
import ConfirmButton from "../../../../../components/ui/buttons/ConfirmButton";
import useCreateVacationModal from "../../hooks/useCreateVacationModal";

const CreateVacationModal = ({ handleClose, initialStartDate }) => {
    const {
        vacationTitle,
        setVacationTitle,
        vacationType,
        setVacationType,
        vacationStartDate,
        setVacationStartDate,
        vacationEndDate,
        setVacationEndDate,
        vacationReason,
        setVacationReason,
        urgent,
        showWarningModal,
        setShowWarningModal,
        handleUrgentToggle,
        handleSubmit,
        handleWarningModalOpen,
    } = useCreateVacationModal(initialStartDate, handleClose);

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <img
                        src={
                            urgent
                                ? `${imagePrefix}/shared/is_urgent_true.png`
                                : `${imagePrefix}/shared/is_urgent_false.png`
                        }
                        alt="urgent icon"
                        onClick={handleUrgentToggle}
                        title={urgent ? "긴급 상태 활성화" : "긴급 상태 비활성화"}
                        style={{ position : "absolute", left : "5%", top : "2%", width : "36px", height : "36px"}}
                    />
                    <h3>휴가 신청</h3>
                    <CloseImageButton handleClose={handleClose}/>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="custom-modal-body">
                        <div className="custom-modal-body-content">
                            <label className="custom-modal-body-content-label">
                                휴가 제목:
                            </label>
                            <input
                                type="text"
                                value={vacationTitle}
                                onChange={(e) => setVacationTitle(e.target.value)}
                                required
                            />
                            <label className="custom-modal-body-content-label">
                                휴가 종류 :
                            </label>
                            <select
                                value={vacationType}
                                onChange={(e) => setVacationType(e.target.value)}
                                className="custom-modal-body-select"
                                required
                            >
                                <option value="">휴가 종류를 선택해주세요!</option>
                                <option value="연가">연가</option>
                                <option value="병가">병가</option>
                                <option value="긴급한 휴가">긴급한 휴가</option>
                            </select>

                            <label className="custom-modal-body-content-label">
                                시작일:
                            </label>
                            <input
                                type="date"
                                value={vacationStartDate}
                                onChange={(e) => setVacationStartDate(e.target.value)}
                                required
                            />
                            <label className="custom-modal-body-content-label">
                                종료일:
                            </label>
                            <input
                                type="date"
                                value={vacationEndDate}
                                onChange={(e) => setVacationEndDate(e.target.value)}
                                required
                            />
                            <label className="custom-modal-body-content-label">
                                사유 :
                            </label>
                            <textarea
                                value={vacationReason}
                                onChange={(e) => setVacationReason(e.target.value)}
                                placeholder="연가를 제외한 종류를 선택했다면 왼쪽 상단의 이미지를 클릭하여 '긴급함' 이미지로 변경하고  사유를 작성해주세요."
                                className="custom-modal-body-textarea"
                            />
                        </div>
                    </div>
                    <div className="custom-modal-footer">
                        <ConfirmButton
                            onClick={handleWarningModalOpen}
                            text={"주의 사항"}/>
                        <ConfirmButton
                            onClick={handleSubmit}
                            text = {"제출"}/>
                    </div>
                </form>

                <VacationWarningModal
                    show={showWarningModal}
                    handleClose={() => setShowWarningModal(false)}
                />
            </div>
        </div>
    );
};

export default CreateVacationModal;
