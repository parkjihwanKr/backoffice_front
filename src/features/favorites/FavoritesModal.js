import React from "react";
import CloseImageButton from "../../components/ui/image/CloseImageButton";
import "./FavoritesModal.css";
import "../../components/ui/modal/Modal.css";
import CreateFavoritesModal from "./CreateFavoritesModal";
import DeleteFavoritesModal from "./DeleteFavoritesModal";
import UpdateFavoritesModal from "./UpdateFavoritesModal";
import { useFavorites } from "./context/FavoritesProvider";
import SubmitButton from "../../components/ui/buttons/SubmitButton";
import { imagePrefix } from "../../utils/Constant";
import useFavoritesModal from "./hooks/useFavoritesModal";

const FavoritesModal = ({ show, handleClose }) => {
    const { favorites, addFavorite, editFavorite, removeFavorite } = useFavorites();

    const {
        showCreateModal,
        showUpdateModal,
        showDeleteModal,
        favoriteToEdit,
        favoriteToDelete,
        setShowCreateModal,
        setShowUpdateModal,
        setShowDeleteModal,
        handleAddFavorite,
        handleConfirmAddFavorite,
        handleEditFavorite,
        handleConfirmEditFavorite,
        handleDeleteFavorite,
        handleConfirmDeleteFavorite,
    } = useFavoritesModal(favorites, addFavorite, editFavorite, removeFavorite);

    if (!show) return null;

    return (
        <>
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
                            <div className="favorite-list">
                                {favorites.map((oneFavorites) => (
                                    <div key={oneFavorites.favoritesId} className="favorite-item">
                                        <a
                                            href={oneFavorites.favoritesUrl}
                                            className="favorites-item-header"
                                        >
                                            {oneFavorites.description}
                                        </a>
                                        <div className="custom-modal-body-card-index">
                                            <img
                                                src={`${imagePrefix}/shared/edit.png`}
                                                alt="Edit Favorite"
                                                className="edit-favorites"
                                                onClick={() => handleEditFavorite(oneFavorites)}
                                            />
                                            <img
                                                src={`${imagePrefix}/shared/delete_domain.png`}
                                                alt="Delete Favorite"
                                                className="delete-favorites"
                                                onClick={() => handleDeleteFavorite(oneFavorites)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="custom-modal-body-text">
                            ※ 즐겨찾기는 개인당 10개가 최대 갯수입니다.
                        </div>
                    </div>
                    <div className="custom-modal-footer">
                        <SubmitButton onSubmit={handleAddFavorite} text={"현재 페이지 추가"} />
                    </div>
                </div>
            </div>

            {showCreateModal && (
                <CreateFavoritesModal
                    onClose={() => setShowCreateModal(false)}
                    onConfirm={handleConfirmAddFavorite}
                />
            )}

            {showUpdateModal && (
                <UpdateFavoritesModal
                    favorites={favoriteToEdit}
                    onClose={() => setShowUpdateModal(false)}
                    onUpdate={handleConfirmEditFavorite}
                />
            )}

            {showDeleteModal && (
                <DeleteFavoritesModal
                    favorite={favoriteToDelete}
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={handleConfirmDeleteFavorite}
                />
            )}
        </>
    );
};

export default FavoritesModal;
