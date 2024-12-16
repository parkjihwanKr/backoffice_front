import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCookie } from "../../../utils/CookieUtil";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // 해당 요청을 API 요청을 단 한 번만 하고자 함 -> 인증 및 서버에서 자주 가져올 정보를 한 번에 처리
    // ** id, name, department, position
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const storedAuth = localStorage.getItem('isAuthenticated');
        return storedAuth ? JSON.parse(storedAuth) : null;
    });

    const [id, setId] = useState(() => {
        return localStorage.getItem('id') || '';
    });

    const [name, setName] = useState(() => {
        return localStorage.getItem('name') || '';
    });

    const [department, setDepartment] = useState(() => {
        return localStorage.getItem('department') || '';
    });

    const [position, setPosition] = useState(() => {
        return localStorage.getItem('position') || '';
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const accessToken = getCookie('accessToken');
                const response = await fetch('/api/v1/check-auth', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();

                    if (data.data) {
                        // 인증 상태 업데이트 및 로컬 스토리지에 저장
                        setIsAuthenticated(true);
                        setId(data.data.id);
                        setName(data.data.name);
                        setDepartment(data.data.department);
                        setPosition(data.data.position);

                        localStorage.setItem('isAuthenticated', JSON.stringify(true));
                        localStorage.setItem('id', data.data.id);
                        localStorage.setItem('name', data.data.name);
                        localStorage.setItem('department', data.data.department);
                        localStorage.setItem('position', data.data.position);
                    } else {
                        setIsAuthenticated(false);
                        localStorage.removeItem('isAuthenticated');
                    }
                } else {
                    setIsAuthenticated(false);
                    localStorage.removeItem('isAuthenticated');
                }
            } catch (error) {
                console.error('Failed to check authentication', error);
                setIsAuthenticated(false);
                localStorage.removeItem('isAuthenticated');
            } finally {
                setLoading(false);
            }
        };

        // 초기 로드 시 인증 상태 확인
        if (!localStorage.getItem('isAuthenticated')) {
            checkAuth();
        } else {
            setLoading(false);
        }
    }, []);

    // 로딩 상태 표시
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
