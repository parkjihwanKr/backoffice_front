import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCookie } from "../../../utils/CookieUtil";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [userName, setUserName] = useState(''); // userName 상태 추가

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const accessToken = getCookie('accessToken');
                const response = await fetch('/api/v1/check-auth', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();
                    setIsAuthenticated(true);
                    setUserName(data.userName); // 서버에서 반환된 userName 설정
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
        <AuthContext.Provider value={{ isAuthenticated, userName }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
