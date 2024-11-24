import { useEffect } from "react";

const useModalScroll = (isModalOpen) => {
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflowY = "hidden"; // 스크롤 비활성화
        } else {
            document.body.style.overflowY = "unset"; // 스크롤 복원
        }

        return () => {
            document.body.style.overflowY = "unset"; // 컴포넌트 언마운트 시 초기화
        };
    }, [isModalOpen]);
};

export default useModalScroll;
