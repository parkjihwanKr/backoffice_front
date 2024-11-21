// DropDownMenu.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../features/auth/context/AuthContext';
import { useNotification } from '../../features/notifications/context/NotificationContext';
import UserInfoModal from '../ui/modal/UserInfoModal';
import LogoutModal from '../ui/modal/LogoutModal';
import './DropDownMenu.css';
import { imagePrefix } from '../../utils/Constant';
import NotificationListModal from '../../features/notifications/components/modal/NotificationListModal';
import { logout } from "../../features/auth/services/AuthService";

const DropDownMenu = () => {
    const { isAuthenticated, name, department, position } = useAuth();
    const { isNotified, setIsNotified } = useNotification();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false);
    const [showNotificationListModal, setNotificationListModal] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        console.log("Notification icon state updated:", isNotified);
    }, [isNotified]);

    const handleLogout = async () => {
        logout();
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // 모달 핸들러 함수들
    const handleShowLogoutModal = () => setShowLogoutModal(true);
    const handleCloseLogoutModal = () => setShowLogoutModal(false);

    const handleShowUserModal = () => setShowUserModal(true);
    const handleCloseUserModal = () => setShowUserModal(false);

    const handleShowNotificationListModal = () => setNotificationListModal(true);
    const handleCloseNotificationListModal = () => setNotificationListModal(false);

    const handleNotificationClick = () => {
        handleShowNotificationListModal();
        setIsNotified(false); // 알림 아이콘 상태 초기화
    };

    return (
        <>
            <div className="drop-down-right">
                <img
                    src={`${imagePrefix}/shared/${isNotified
                        ? 'is_notified_true.png' : 'is_notified_false.png'}`}
                    alt="notification-list"
                    className="notification-icon"
                    onClick={handleNotificationClick} // 알림 클릭 핸들러
                />
                <img src={`${imagePrefix}/shared/user_info.png`}
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
                                    <li><Link to="/auth/signup">회원 가입</Link></li>
                                    <li><Link to="/auth/login">로그인</Link></li>
                                </>
                            ) : (
                                <>
                                    <li onClick={handleShowLogoutModal}>로그 아웃</li>
                                    <li><Link to="/boards">게시판</Link></li>
                                    <li><Link to="/events">일정</Link></li>

                                    {(position === 'MANAGER' || position === 'CEO') && (
                                        <li><Link to="/admins">관리자 페이지</Link></li>
                                    )}
                                </>
                            )}
                        </ul>
                    )}
                </div>
            </div>

            <UserInfoModal
                show={showUserModal}
                handleClose={handleCloseUserModal}
                name={name}
                department={department}
                position={position}
            />

            <LogoutModal
                show={showLogoutModal}
                handleClose={handleCloseLogoutModal}
                handleLogout={handleLogout}
            />

            <NotificationListModal
                show={showNotificationListModal}
                handleClose={handleCloseNotificationListModal}
            />
        </>
    );
};

export default DropDownMenu;
