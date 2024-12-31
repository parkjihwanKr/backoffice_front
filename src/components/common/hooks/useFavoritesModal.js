import { useState } from "react";

export const useFavoritesModal = () => {
    const [showFavoritesModal, setShowFavoritesModal] = useState(false);

    // 즐겨찾기 모달 열기
    const handleShowFavoritesModal = () => {
        setShowFavoritesModal(true);
    };

    // 즐겨찾기 모달 닫기
    const handleCloseFavoritesModal = () => {
        setShowFavoritesModal(false);
    };

    return {
        showFavoritesModal,
        handleShowFavoritesModal,
        handleCloseFavoritesModal,
    };
};
