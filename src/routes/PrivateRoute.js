import { Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/context/AuthContext';

const PrivateRoute = ({ component: Component, allowedDepartments = [], allowedPositions = [], ...rest }) => {
    const { isAuthenticated, department, position } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace />;
    }

    // CEO는 부서 상관없이 접근 허용
    const hasAccess =
        isAuthenticated
        && (position === 'CEO' ||
            ((allowedDepartments.length === 0 || allowedDepartments.includes(department))
                && (allowedPositions.length === 0 || allowedPositions.includes(position))));

    return hasAccess ? (
        <Component {...rest} />
    ) : (
        <Navigate to="/" replace />
    );
};

export default PrivateRoute;
