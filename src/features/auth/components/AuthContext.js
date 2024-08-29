import React, { createContext, useState, useEffect, useContext } from 'react';
import {getCookie} from "../../../utils/CookieUtil";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = getCookie('accessToken');
                console.log(token);
                const response = await fetch('/api/v1/check-auth', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Authorization 헤더에 JWT 토큰 추가
                    },
                    credentials: 'include' // 쿠키를 포함하여 요청
                });

                if (response.ok) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error('Failed to check authentication', error);
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
