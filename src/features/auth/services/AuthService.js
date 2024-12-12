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

    console.log(response.data);
    return response.data;
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
    try {
        const response = await fetch('/api/v1/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (response.ok) {
            console.log('Logout successful');
        } else {
            console.error('Logout failed');
        }

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/auth/login';
    } catch (error) {
        console.error("Error: " + error);
    }
};
