import React, { useState, useEffect } from "react";
import { fetchMemberFavoriteList } from "./service/FavoritesService";
import CloseImageButton from "../../components/ui/image/CloseImageButton";
import '../../components/ui/modal/Modal.css';

const FavoritesModal = ({ show, handleClose }) => {
    const [favorites, setFavorites] = useState([]);
    const [currentUrl, setCurrentUrl] = useState("");

    // 현재 URL 가져오기 및 서버 데이터 요청
    useEffect(() => {
        setCurrentUrl(window.location.href);
        console.log("Current URL: ", window.location.href);

        // 서버에서 즐겨찾기 가져오기
        const fetchFavorites = async () => {
            try {
                const favoriteList = await fetchMemberFavoriteList();
                setFavorites(favoriteList); // 서버에서 받은 데이터로 초기화
            } catch (error) {
                console.error("Failed to fetch favorites:", error);
            }
        };

        fetchFavorites();
    }, []);

    // 즐겨찾기 추가
    const handleAddFavorite = async () => {
        if (favorites.length >= 4) {
            alert("즐겨찾기는 최대 4개까지 등록할 수 있습니다.");
            return;
        }

        try {
            // const response = await axiosInstance.post(`/favorites`, { url: currentUrl });
            // const newFavorite = response.data; // 서버에서 반환된 즐겨찾기 데이터
            // setFavorites([...favorites, newFavorite]); // 새 데이터 추가
        } catch (error) {
            console.error("Failed to add favorite:", error);
        }
    };

    // 즐겨찾기 삭제
    const handleDeleteFavorite = async (id) => {
        try {
            // await axiosInstance.delete(`/favorites/${id}`);
            // const updatedFavorites = favorites.filter((favorite) => favorite.id !== id);
            // setFavorites(updatedFavorites);
        } catch (error) {
            console.error("Failed to delete favorite:", error);
        }
    };

    if (!show) return null;

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <h3>나의 즐겨찾기</h3>
                    <CloseImageButton handleClose={handleClose} />
                </div>
                <div className="custom-modal-body">
                    {favorites.length === 0 ? (
                        <p>즐겨찾기 목록이 없습니다.</p>
                    ) : (
                        <ul>
                            {favorites.map((favorite) => (
                                <li key={favorite.id} className="favorite-item">
                                    <a href={favorite.url} target="_blank" rel="noopener noreferrer">
                                        {favorite.url}
                                    </a>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDeleteFavorite(favorite.id)}
                                    >
                                        삭제
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="custom-modal-footer">
                    <button
                        onClick={handleAddFavorite}
                        disabled={favorites.length >= 4}
                        className="add-button"
                    >
                        현재 페이지 추가
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FavoritesModal;
