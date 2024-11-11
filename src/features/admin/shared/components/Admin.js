import { Link } from "react-router-dom";
import { useAuth } from '../../../auth/context/AuthContext';
import './Admin.css'; // 새로운 스타일을 추가합니다.

const Admin = () => {
    const { department, position } = useAuth();

    // HR/MANAGER 또는 CEO만 접근 가능한 조건
    const isHrManagerOrCeo
        = (department === 'HR' && position === 'MANAGER') || position === 'CEO';

    const isFinanceManagerOrCEO
        = (department === 'FINANCE' && position === 'MANAGER') || position === 'CEO';

    const isAuditManagerOrCEO
        = (department === 'AUDIT' && position === 'MANAGER') || position === 'CEO';

    console.log('department:', department, 'position:', position);
    console.log(isHrManagerOrCeo);
    return (
        <div className="admin-container">
            <h3> 관리자 페이지 </h3>
            {/* 인사 관리 페이지: HR, MANAGER, CEO만 접근 가능 */}
            <div className="admin-container-index">
                {isHrManagerOrCeo && (
                    <Link to="/admins/member-management">
                        <button>인사 관리 페이지</button>
                    </Link>
                )}

                {/* 휴가 관리 페이지: HR, MANAGER, CEO만 접근 가능 */}
                {isHrManagerOrCeo && (
                    <Link to="/admins/vacation-management">
                        <button>휴가 관리 페이지</button>
                    </Link>
                )}

                {/* 회사 재정 관리 페이지 */}
                {isFinanceManagerOrCEO && (
                    <Link to="/admins/finance-management">
                        <button>회사 재정 관리 페이지</button>
                    </Link>
                )}

                {/* 회계 감사 페이지 */}
                {isAuditManagerOrCEO && (
                    <Link to="/admins/audit-management">
                        <button>회계 감사 페이지</button>
                    </Link>
                )}

                {/* 사내 알림 페이지: MANAGER와 CEO 접근 가능 */}
                {(position === 'MANAGER' || position === 'CEO') && (
                    <Link to="/admins/notification-management">
                        <button>사내 알림 페이지</button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Admin;
