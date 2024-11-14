import { useEffect } from "react";
import { adjustModalAlignment, addModalAlignmentListener } from "../../../../utils/ModalUtils";

export const useModalAlignment = (isOpen, modalOverlayRef, modalContentRef) => {
    useEffect(() => {
        if (isOpen) {
            const modalOverlay = modalOverlayRef.current;
            const modalContent = modalContentRef.current;

            adjustModalAlignment(modalOverlay, modalContent);
            return addModalAlignmentListener(modalOverlay, modalContent);
        }
    }, [isOpen, modalOverlayRef, modalContentRef]);
};
