// services/authService.js
import axiosInstance from "../../../utils/AxiosUtils";
import axios from "axios";

const axiosUnauthenticated = axios.create({
    baseURL: '/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const signup = async (signupData) => {
    const response
        = await axiosUnauthenticated.post('/signup', signupData);
    return response.data;
};

export const login = async (memberName, password) => {
    const response
        = await axiosUnauthenticated.post(`/login`, {
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
        = await axiosUnauthenticated.get(`/check-available-memberName`,{
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
