import React, { createContext, useContext, useEffect, useState } from 'react';
import { checkAuth } from "../services/AuthService";
import {deleteCookie} from "../../../utils/CookieUtil";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [position, setPosition] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const response = await checkAuth(); // 서버 인증 확인

                if (response) {
                    const { id, name, department, position } = response;

                    setIsAuthenticated(true);
                    setId(id);
                    setName(name);
                    setDepartment(department);
                    setPosition(position);

                    // LocalStorage에 저장
                    localStorage.setItem('isAuthenticated', JSON.stringify(true));
                    localStorage.setItem('id', id);
                    localStorage.setItem('name', name);
                    localStorage.setItem('department', department);
                    localStorage.setItem('position', position);
                }
            } catch (error) {
                console.error("인증 실패 : ", error);
                setIsAuthenticated(false);
                // localStorage.setItem('isAuthenticated', JSON.stringify(false));
            } finally {
                setLoading(false); // 로딩 완료
            }
        };

        // LocalStorage의 값이 있으면 초기 상태 설정
        const storedAuth = JSON.parse(localStorage.getItem('isAuthenticated'));
        if (storedAuth) {
            setIsAuthenticated(storedAuth);
        }

        initializeAuth(); // 한 번만 실행
    }, []); // 의존성 배열에서 isAuthenticated를 제거

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, id, name, department, position }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
