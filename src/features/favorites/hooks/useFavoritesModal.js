import { useState } from "react";

const useFavoritesModal = (favorites, addFavorite, editFavorite, removeFavorite) => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [favoriteToEdit, setFavoriteToEdit] = useState(null);
    const [favoriteToDelete, setFavoriteToDelete] = useState(null);

    const handleAddFavorite = () => {
        if (favorites.length >= 11) {
            alert("즐겨찾기는 최대 11개까지 등록할 수 있습니다.");
            return;
        }
        setShowCreateModal(true);
    };

    const handleConfirmAddFavorite = async (description) => {
        await addFavorite(window.location.href, description);
        setShowCreateModal(false);
    };

    const handleEditFavorite = (favorite) => {
        setFavoriteToEdit(favorite);
        setShowUpdateModal(true);
    };

    const handleConfirmEditFavorite = async (favoritesId, description) => {
        await editFavorite(favoritesId, description);
        setShowUpdateModal(false);
        setFavoriteToEdit(null);
    };

    const handleDeleteFavorite = (favorite) => {
        setFavoriteToDelete(favorite);
        setShowDeleteModal(true);
    };

    const handleConfirmDeleteFavorite = async () => {
        await removeFavorite(favoriteToDelete.favoritesId);
        setShowDeleteModal(false);
        setFavoriteToDelete(null);
    };

    return {
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
    };
};

export default useFavoritesModal;
