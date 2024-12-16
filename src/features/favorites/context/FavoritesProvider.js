import React, { createContext, useContext, useState, useEffect } from "react";
import {
    fetchMemberFavoriteList,
    createMemberFavorites,
    deleteMemberFavorites,
    updateMemberFavorites } from "../service/FavoritesService";

const FavoritesContext = createContext();

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error("useFavorites must be used within a FavoritesProvider");
    }
    return context;
};

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const favoriteList = await fetchMemberFavoriteList();
                console.log("Fetched favorites:", favoriteList);
                setFavorites(favoriteList);
            } catch (error) {
                console.error("Failed to fetch favorites:", error);
            }
        };

        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        try {
            const favoriteList = await fetchMemberFavoriteList();
            setFavorites(favoriteList);
        } catch (error) {
            console.error("Failed to fetch favorites:", error);
        }
    };

    const addFavorite = async (url, description) => {
        try {
            const newFavorite = await createMemberFavorites(url, description);
            setFavorites((prev) => [...prev, newFavorite]);
        } catch (error) {
            console.error("Failed to add favorite:", error);
        }
    };

    const editFavorite = async (favoritesId, description) => {
        try {
            await updateMemberFavorites(favoritesId, description); // API 호출
            setFavorites((prevFavorites) =>
                prevFavorites.map((favorite) =>
                    favorite.favoritesId === favoritesId
                        ? { ...favorite, description } // 수정된 항목만 업데이트
                        : favorite
                )
            );
        } catch (error) {
            console.error("Failed to edit favorite:", error);
        }
    };

    const removeFavorite = async (favoritesId) => {
        try {
            await deleteMemberFavorites(favoritesId);
            setFavorites((prev) =>
                prev.filter((favorite) => favorite.favoritesId !== favoritesId)
            );
        } catch (error) {
            console.error("Failed to delete favorite:", error);
        }
    };

    useEffect(() => {
        loadFavorites();
    }, []);

    return (
        <FavoritesContext.Provider
            value={{ favorites, addFavorite, editFavorite, removeFavorite }}
        >
            {children}
        </FavoritesContext.Provider>
    );
};
