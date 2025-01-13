import axiosInstance from "../../../utils/AxiosUtils";

export const fetchMemberFavoriteList = async () => {
    const response
        = await axiosInstance.get(`/favorites`, {});
    return response.data;
}

export const createMemberFavorites = async (url, description) => {
    const response = await axiosInstance.post(`/favorites`, {
        url : url,
        description : description,
    });
    return response.data;
}

export const updateMemberFavorites = async (favoritesId, description) => {
    const response = await axiosInstance.patch(`/favorites/${favoritesId}`, {
        description : description,
    });
    return response.data;
}

export const deleteMemberFavorites = async (favoritesId) => {
    const response
        = await axiosInstance.delete(`/favorites/${favoritesId}`);
}