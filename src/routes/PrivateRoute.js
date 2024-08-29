import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/components/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = useAuth();

    // 인증 여부 확인 중일 때 로딩 상태 표시
    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    // 인증 절차 성공 여부에 따른 결과값 반환
    return isAuthenticated ? (
        <Component {...rest} />
    ) : (
        <Navigate to="/auth/login" replace />
    );
}

export default PrivateRoute;
