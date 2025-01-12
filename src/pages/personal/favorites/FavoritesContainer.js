import React from "react";
import { useFavorites } from "../../../features/favorites/context/FavoritesProvider";
import { imagePrefix } from "../../../utils/Constant";

const FavoritesContainer = () => {
    const { favorites } = useFavorites();
    const handleNavigateToFavorite = (url) => {
        if (url) {
            window.location.href = url;
        } else {
            alert("올바른 URL이 없습니다.");
        }
    };

    return (
        <div className="favorites-container">
            <div className="favorites-row">
                <div className="favorites-container-header">즐겨 찾기</div>
                <div className="favorites-container-body">
                    {favorites.length > 0 ? (
                        <div className="favorites-grid">
                            {favorites.map((favorite) => (
                                <div
                                    key={favorite.favoritesId}
                                    className="personal-favorites-item"
                                    onClick={() => handleNavigateToFavorite(favorite.favoritesUrl)}
                                >
                                    <img
                                        src={`${imagePrefix}/shared/go_to.png`}
                                        alt="즐겨찾기"
                                    />
                                    <p>{favorite.description || `즐겨찾기 ${favorite.favoritesId}`}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="not-exist-data">즐겨찾기 목록이 없습니다.</p>
                    )}
                </div>
                <div className="favorites-container-footer">
                    ★ 즐겨찾기 생성, 수정, 삭제는 위의 상단바에서 진행 가능합니다.
                </div>
            </div>
        </div>
    );
};

export default FavoritesContainer;
