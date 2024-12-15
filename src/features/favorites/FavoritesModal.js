import React, { useState, useEffect } from "react";
import { fetchMemberFavoriteList, createMemberFavorites, deleteMemberFavorites } from "./service/FavoritesService";
import CloseImageButton from "../../components/ui/image/CloseImageButton";
import './FavoritesModal.css';
import '../../components/ui/modal/Modal.css';
import CreateFavoritesModal from "./CreateFavoritesModal";
import DeleteFavoritesModal from "./DeleteFavoritesModal";
import useModalScroll from "../boards/shared/hooks/useModalScroll";
import {imagePrefix} from "../../utils/Constant";
import SubmitButton from "../../components/ui/buttons/SubmitButton";

const FavoritesModal = ({ show, handleClose }) => {
    const [favorites, setFavorites] = useState([]);
    const [currentUrl, setCurrentUrl] = useState("");
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [favoriteToDelete, setFavoriteToDelete] = useState(null);

    useEffect(() => {
        // 현재 URL 가져오기 및 서버 데이터 요청
        setCurrentUrl(window.location.href);

        console.log(currentUrl);
        const fetchFavorites = async () => {
            try {
                const favoriteList = await fetchMemberFavoriteList();
                setFavorites(favoriteList);
            } catch (error) {
                console.error("Failed to fetch favorites:", error);
            }
        };

        fetchFavorites();
    }, []);

    // 즐겨찾기 추가
    const handleAddFavorite = () => {
        if (favorites.length >= 11) {
            alert("즐겨찾기는 최대 11개까지 등록할 수 있습니다.");
            return;
        }
        setShowCreateModal(true); // 즐겨찾기 생성 모달 열기
    };

    const handleConfirmAddFavorite = async (description) => {
        try {
            const newFavorite = await createMemberFavorites(currentUrl, description);
            setFavorites([...favorites, newFavorite]);
            setShowCreateModal(false);
        } catch (error) {
            alert(error.response.data.data+ " : "+error.response.data.message);
        }
    };

    // 즐겨찾기 삭제
    const handleDeleteFavorite = (favorite) => {
        setFavoriteToDelete(favorite);
        setShowDeleteModal(true); // 즐겨찾기 삭제 모달 열기
    };

    const handleConfirmDeleteFavorite = async () => {
        try {
            if (favoriteToDelete) {
                await deleteMemberFavorites(favoriteToDelete.favoritesId);
                setFavorites(favorites.filter((f) => f.id !== favoriteToDelete.id));
                setShowDeleteModal(false); // 모달 닫기
                setFavoriteToDelete(null); // 초기화
            }
        } catch (error) {
            console.error("Failed to delete favorite:", error);
        }
    };

    useModalScroll(show);
    if (!show) return null;

    return (
        <>
            <div className="custom-modal-overlay">
                <div className="custom-modal-content">
                    <div className="custom-modal-header">
                        <h3>나의 즐겨찾기</h3>
                        <CloseImageButton handleClose={handleClose} />
                    </div>
                    <div className="custom-modal-body" style={{ padding : "5px"}}>
                        {favorites.length === 0 ? (
                            <p>즐겨찾기 목록이 없습니다.</p>
                        ) : (
                            <ul className="no-bullets">
                                {favorites.map((oneFavorites) => (
                                    <li key={oneFavorites.favoritesId} className="favorite-item">
                                        <a href={oneFavorites.favoritesUrl} className="favorites-item-text">
                                            {oneFavorites.description}
                                        </a>
                                        <img
                                            src={`${imagePrefix}/shared/edit.png`}
                                            alt="Edit Favorite"
                                            className="edit-favorites"
                                            onClick={() => handleDeleteFavorite(oneFavorites.favoritesId)}
                                        />
                                        <img
                                            src={`${imagePrefix}/shared/delete_domain.png`}
                                            alt="Delete Favorite"
                                            className="delete-favorites"
                                            onClick={() => handleDeleteFavorite(oneFavorites)}
                                        />
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="custom-modal-footer">
                        <SubmitButton
                            onSubmit={handleAddFavorite}
                            disabled={favorites.length >= 11}
                            text={"현재 페이지 추가"}
                            />
                    </div>
                </div>
            </div>

            {showCreateModal && (
                <CreateFavoritesModal
                    currentUrl={currentUrl}
                    onClose={() => setShowCreateModal(false)}
                    onConfirm={handleConfirmAddFavorite}
                />
            )}

            {showDeleteModal && (
                <DeleteFavoritesModal
                    favorite={favoriteToDelete}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={handleConfirmDeleteFavorite}
                />
            )}
        </>
    );
};

export default FavoritesModal;
