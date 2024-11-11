import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCookie } from "../../../utils/CookieUtil";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [id, setId] = useState('');  // 사용자 ID
    const [name, setName] = useState('');  // 사용자 이름
    const [department, setDepartment] = useState('');  // 사용자 부서
    const [position, setPosition] = useState('');  // 사용자 역할
    const [loading, setLoading] = useState(true); // 로딩 상태 추가

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
                    console.log(data);

                    if (data.data) {
                        setIsAuthenticated(true);
                        setId(data.data.id);
                        setName(data.data.name); // 사용자 이름 설정
                        setDepartment(data.data.department); // 부서 설정
                        setPosition(data.data.position); // 역할 설정
                    } else {
                        console.error("Unexpected data structure!");
                        setIsAuthenticated(false);
                    }
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error('Failed to check authentication', error);
                setIsAuthenticated(false);
            } finally {
                setLoading(false); // 로딩 완료
            }
        };

        checkAuth();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // 로딩 상태를 표시할 수 있음
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, id, name, department, position }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
