import {useAuth} from "../../../features/auth/context/AuthContext";

const FavoritesContainer = () => {
    const {name} =useAuth();
    return (
        <div className="favorites-container">
            <div className="favorites-row">
                <div className="favorites-container-header"> '{name}'님의 즐겨 찾기</div>
                <div className="favorites-container-body">body</div>
                <div className="favorites-container-footer">footer</div>
            </div>
        </div>
    );
};

export default FavoritesContainer;
