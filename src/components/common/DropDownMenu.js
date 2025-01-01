import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useAuth} from "../../features/auth/context/AuthContext";
import UserInfoModal from "../ui/modal/UserInfoModal";
import LogoutModal from "../ui/modal/LogoutModal";
import NotificationListModal from "../../features/notifications/components/modal/NotificationListModal";
import FavoritesModal from "../../features/favorites/FavoritesModal";
import UpdateCheckInTimeModal from "../../features/members/components/attendances/modal/UpdateCheckInTimeModal";
import UpdateCheckOutTimeModal from "../../features/members/components/attendances/modal/UpdateCheckOutTimeModal";
import {useLogout} from "./hooks/useLogout";
import {useNotifications} from "./hooks/useNotifications";
import {useAttendanceModal} from "./hooks/useAttendanceModal";
import {useDropdown} from "./hooks/useDropDown";
import {useFavoritesModal} from "./hooks/useFavoritesModal";
import './DropDownMenu.css';
import {imagePrefix} from "../../utils/Constant";
import {useUserInfoModal} from "./hooks/useUserInfoModal";
import {getMemberProfileImage} from "../../features/members/services/MembersService";
import {alertError} from "../../utils/ErrorUtils";

const DropDownMenu = () => {
    const { id, isAuthenticated, name, department, position } = useAuth();
    const [profileImageUrl, setProfileImageUrl]
        = useState(`${imagePrefix}/shared/user_info.png`);

    const {
        showUserInfoModal,
        handleShowUserModal,
        handleCloseUserModal,
    } = useUserInfoModal();
    const {
        showLogoutModal,
        handleLogout,
        handleShowLogoutModal,
        handleCloseLogoutModal,
    } = useLogout();
    const {
        isNotified,
        showNotificationListModal,
        handleNotificationClick,
        handleCloseNotificationListModal,
    } = useNotifications();
    const {
        activeModal,
        todayAttendanceId,
        handleAttendanceModal,
        handleCloseAttendanceModal,
    } = useAttendanceModal(id);
    const { isDropdownOpen, toggleDropdown, handleLinkClick } = useDropdown();
    const {
        showFavoritesModal,
        handleShowFavoritesModal,
        handleCloseFavoritesModal,
    } = useFavoritesModal();

    useEffect(() => {
        fetchMemberProfileImage();
    }, []);

    const fetchMemberProfileImage = async () => {
        try {
            const response = await getMemberProfileImage(id);
            setProfileImageUrl(response.profileImageUrl);
        }catch (error) {
            alertError(error);
        }
    }

    return (
        <>
            <div className="custom-navbar-right">
                <img
                    src={`${imagePrefix}/shared/go_to_website.png`}
                    alt="바로 가기"
                    className="website-icon"
                    onClick={handleShowFavoritesModal}
                />
                <img
                    src={`${imagePrefix}/shared/check-out-time.png`}
                    alt="출/퇴근 신청"
                    className="website-icon"
                    onClick={handleAttendanceModal}
                />
                <img
                    src={`${imagePrefix}/shared/${isNotified ? "is_notified_true.png" : "is_notified_false.png"}`}
                    alt="notification-list"
                    className="nav-bar-icon"
                    onClick={handleNotificationClick}
                />
                <img
                    src={profileImageUrl || `${imagePrefix}/shared/user_info.png`}
                    alt="User Info"
                    className={`user-info ${profileImageUrl && profileImageUrl !== `${imagePrefix}/shared/user_info.png` ? 'custom-border' : ''}`}
                    onClick={handleShowUserModal}
                />
                <div className="custom-dropdown">
                    <button className="custom-dropdown-toggle" onClick={toggleDropdown}>
                        Menu
                    </button>
                    {isDropdownOpen && (
                        <ul className="custom-dropdown-menu">
                            {!isAuthenticated ? (
                                <>
                                    <li>
                                        <Link to="/auth/signup" onClick={handleLinkClick}>
                                            회원 가입
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/auth/login" onClick={handleLinkClick}>
                                            로그인
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li onClick={handleShowLogoutModal}>로그 아웃</li>
                                    <li>
                                        <Link to="/boards" onClick={handleLinkClick}>
                                            게시판
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/events" onClick={handleLinkClick}>
                                            일정
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={`/members/${id}/attendance`} onClick={handleLinkClick}>
                                            개인 근태 기록
                                        </Link>
                                    </li>
                                    {(position === "MANAGER" || position === "CEO") && (
                                        <li>
                                            <Link to="/admins" onClick={handleLinkClick}>
                                                관리자 페이지
                                            </Link>
                                        </li>
                                    )}
                                </>
                            )}
                        </ul>
                    )}
                </div>
            </div>

            <UserInfoModal
                show={showUserInfoModal}
                handleClose={handleCloseUserModal}
                name={name}
                department={department}
                position={position}
                memberId={id}
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

            <FavoritesModal
                show={showFavoritesModal}
                handleClose={handleCloseFavoritesModal}
            />

            {activeModal === "checkIn" && (
                <UpdateCheckInTimeModal
                    show={true}
                    attendanceId={todayAttendanceId}
                    onClose={handleCloseAttendanceModal}
                />
            )}
            {activeModal === "checkOut" && (
                <UpdateCheckOutTimeModal
                    show={true}
                    attendanceId={todayAttendanceId}
                    onClose={handleCloseAttendanceModal}
                />
            )}
        </>
    );
};

export default DropDownMenu;
