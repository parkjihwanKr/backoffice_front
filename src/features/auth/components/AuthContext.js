import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCookie } from "../../../utils/CookieUtil";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [userName, setUserName] = useState(''); // userName 상태 추가
    const [department, setDepartment] = useState(''); // 부서 상태 추가
    const [role, setRole] = useState(''); // 역할 상태 추가

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

                    // 서버에서 받은 data의 구조에 맞게 처리
                    if (data.data) {
                        setIsAuthenticated(true);
                        setUserName(data.data.memberName); // 사용자 이름 설정
                        setDepartment(data.data.department); // 부서 설정
                        setRole(data.data.position); // 역할 설정
                    } else {
                        console.error("Unexpected data structure!");
                    }
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
        <AuthContext.Provider value={{ isAuthenticated, userName, department, role }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
