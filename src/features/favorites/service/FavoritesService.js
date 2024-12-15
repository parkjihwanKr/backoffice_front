import axiosInstance from "../../../utils/AxiosUtils";

export const fetchMemberFavoriteList = async () => {
    const response
        = await axiosInstance.get(`/favorites`, {});
    console.log(response.data);
    return response.data;
}

export const createMemberFavorites = async () => {
    const response = await axiosInstance.post(`/favorites`, {

    });
    console.log(response.data);
    return response.data;
}

export const deleteMemberFavorites = async (favoritesId) => {
    const response
        = await axiosInstance.delete(`/favorites/${favoritesId}`);
    console.log(response.data);
}