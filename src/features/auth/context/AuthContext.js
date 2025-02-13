import React, {createContext, useContext, useEffect, useState} from 'react';
import {checkAuth} from "../services/AuthService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [position, setPosition] = useState('');
    const [profileImageUrl, setProfileImageUrl] = useState('') ;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const response = await checkAuth(); // 서버 인증 확인

                if (response) {
                    const { id, name, department, position, profileImageUrl } = response;

                    setIsAuthenticated(true);
                    setId(id);
                    setName(name);
                    setDepartment(department);
                    setPosition(position);
                    setProfileImageUrl(profileImageUrl);

                    // LocalStorage에 저장
                    localStorage.setItem('isAuthenticated', JSON.stringify(true));
                    localStorage.setItem('id', id);
                    localStorage.setItem('name', name);
                    localStorage.setItem('department', department);
                    localStorage.setItem('position', position);
                    localStorage.setItem('profileImageUrl', profileImageUrl);
                }
            } catch (error) {
                console.error("인증 실패 : ", error);

                if (error.response && error.response.status === 403) {
                    const storedAuth = JSON.parse(localStorage.getItem('isAuthenticated'));
                    if (storedAuth) {
                        setIsAuthenticated(storedAuth);
                    }
                } else {
                    setIsAuthenticated(false);
                }
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
        <AuthContext.Provider value={{ isAuthenticated, id, name, department, position, profileImageUrl, setProfileImageUrl }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
