import { Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/components/AuthContext';

const PrivateRoute = ({ component: Component, allowedDepartments = [], allowedPositions = [], ...rest }) => {
    const { department, position } = useAuth();

    // CEO는 부서 상관없이 접근 허용
    const hasAccess =
        position === 'CEO' ||
        ((allowedDepartments.length === 0 || allowedDepartments.includes(department)) &&
            (allowedPositions.length === 0 || allowedPositions.includes(position)));

    return hasAccess ? (
        <Component {...rest} />
    ) : (
        <Navigate to="/" replace />
    );
};

export default PrivateRoute;
