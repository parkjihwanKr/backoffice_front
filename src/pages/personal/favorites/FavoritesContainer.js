import { useAuth } from "../../../features/auth/context/AuthContext";
import { imagePrefix } from "../../../utils/Constant";

const FavoritesContainer = ({ personalFavorites = [] }) => {
    const { name } = useAuth();

    const handleNavigateToFavorite = (url) => {
        if (url) {
            window.open(url, "_blank", "noopener,noreferrer"); // 새 창으로 이동
        } else {
            alert("올바른 URL이 없습니다.");
        }
    };

    return (
        <div className="favorites-container">
            <div className="favorites-row">
                {/* Header Section */}
                <div className="favorites-container-header">
                    '{name}'님의 즐겨 찾기
                </div>

                {/* Body Section */}
                <div className="favorites-container-body">
                    {personalFavorites && personalFavorites.length > 0 ? (
                        <div className="favorites-grid">
                            {personalFavorites.map((onePersonalFavorites) => (
                                <div
                                    key={onePersonalFavorites.favoritesId}
                                    className="personal-favorites-item"
                                    onClick={() => handleNavigateToFavorite(onePersonalFavorites.favoritesUrl)} // 클릭 이벤트
                                    style={{ cursor: "pointer" }}
                                >
                                    <img
                                        src={`${imagePrefix}/shared/go_to.png`}
                                        alt="즐겨찾기"
                                    />
                                    <p>
                                        {onePersonalFavorites.description
                                            ? onePersonalFavorites.description
                                            : `즐겨찾기 ${onePersonalFavorites.favoritesId}`}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>해당 멤버는 즐겨 찾기 목록이 없습니다.</p>
                    )}
                </div>

                <div className="favorites-container-footer">
                    ★즐겨 찾기 상세보기 기능은 상단의 첫 번째 아이콘을 사용해주세요!
                </div>
            </div>
        </div>
    );
};

export default FavoritesContainer;
