import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useAuth} from '../../features/auth/components/AuthContext';
import UserInfoModal from '../ui/modal/UserInfoModal';
import LogoutModal from '../ui/modal/LogoutModal';
import './DropDownMenu.css';
import {imagePrefix} from "../../utils/Constant";
import NotificationListModal from "../../features/notifications/components/modal/NotificationListModal";

const DropDownMenu = () => {
    const { isAuthenticated, name, department, position } = useAuth();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false);
    const [showNotificationListModal, setNotificationListModal] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/v1/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (response.ok) {
                console.log('Logout successful');
            } else {
                console.error('Logout failed');
            }

            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/auth/login';
        } catch (error) {
            console.error("Error: " + error);
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleShowLogoutModal = () => setShowLogoutModal(true);
    const handleCloseLogoutModal = () => setShowLogoutModal(false);

    const handleShowUserModal = () => setShowUserModal(true);
    const handleCloseUserModal = () => setShowUserModal(false);

    const handleShowNotificationListModal = () => setNotificationListModal(true);
    const handleCloseNotificationListModal = () => setNotificationListModal(false);

    return (
        <>
            <div className="drop-down-right">
                <img src={`${imagePrefix}/shared/is_notified_false.png`}
                     alt="notification-list"
                     className="notification-icon"
                    onClick={handleShowNotificationListModal}/>
                <img src={`${imagePrefix}/shared/user.png`}
                    onClick={handleShowUserModal}
                    className="user-info"/>

                <div className="dropdown">
                    <button className="dropdown-toggle" onClick={toggleDropdown}>
                        Menu
                    </button>
                    {isDropdownOpen && (
                        <ul className="dropdown-menu">
                            {!isAuthenticated ? (
                                <>
                                    <li><Link to="/auth/signup">Signup</Link></li>
                                    <li><Link to="/auth/login">Login</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/notifications">Notifications</Link></li>
                                    <li onClick={handleShowLogoutModal}>Logout</li>
                                    <li><Link to="/boards">Boards</Link></li>
                                    <li><Link to="/events">Events</Link></li>

                                    {/* 관리자 권한이 있는 경우에만 Admin 페이지 링크 표시 */}
                                    {(position === 'MANAGER' || position === 'CEO') && (
                                        <li><Link to="/admins">Admin Page</Link></li>
                                    )}
                                </>
                            )}
                        </ul>
                    )}
                </div>
            </div>

            {/* 사용자 정보 모달 */}
            <UserInfoModal
                show={showUserModal}
                handleClose={handleCloseUserModal}
                name={name}
                department={department}
                position={position}
            />

            {/* 로그아웃 모달 */}
            <LogoutModal
                show={showLogoutModal}
                handleClose={handleCloseLogoutModal}
                handleLogout={handleLogout}
            />
            {/* 개인 알림 리스트 모달*/}
            <NotificationListModal
                show={showNotificationListModal}
                handleClose={handleCloseNotificationListModal}
            />
        </>
    );
};

export default DropDownMenu;
