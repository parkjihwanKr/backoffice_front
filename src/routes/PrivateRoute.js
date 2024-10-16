import {Navigate} from 'react-router-dom';
import {useAuth} from '../features/auth/components/AuthContext';

const PrivateRoute = ({ component: Component, allowedDepartments, allowedPositions, ...rest }) => {
    const { department, position } = useAuth();

    // 사용자가 허용된 부서와 직급에 속해 있는지 확인
    const hasAccess =
        (!allowedDepartments || allowedDepartments.includes(department)) &&
        (!allowedPositions || allowedPositions.includes(position));

    return hasAccess ? (
        <Component />
    ) : (
        <Navigate to="/" replace />
    );
};

export default PrivateRoute;
