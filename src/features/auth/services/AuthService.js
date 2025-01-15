// services/authService.js
import {axiosInstance, axiosUnAuthenticated} from "../../../utils/AxiosUtils";

export const signup = async (signupData) => {
    const response
        = await axiosUnAuthenticated.post('/signup', signupData);
    return response.data;
};

export const login = async (memberName, password) => {
    const response
        = await axiosUnAuthenticated.post(`/login`, {
            memberName : memberName,
            password : password});

    return response.data;
}

export const checkAuth = async () => {
    const response = await axiosInstance.get(`/check-auth`);
    return response.data.data;
}

export const checkUsernameAvailability = async (memberName) => {
    const response
        = await axiosUnAuthenticated.get(`/check-available-memberName`,{
            params : {
                memberName
            }
        });
    return response.data;
}

export const logout = async () => {
    const response = await axiosInstance.post(`/logout`);
    return response.data;
};
