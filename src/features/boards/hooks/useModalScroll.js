import { useEffect } from "react";

const useModalScroll = (isModalOpen) => {
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflowY = "hidden"; // 모달 열림 시 스크롤 비활성화
        } else {
            document.body.style.overflowY = "auto"; // 모달 닫힘 시 스크롤 복원
        }

        return () => {
            document.body.style.overflowY = "auto"; // 컴포넌트 언마운트 시 복원
        };
    }, [isModalOpen]);
};

export default useModalScroll;
