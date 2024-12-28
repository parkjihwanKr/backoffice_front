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
import FavoritesModal from "../../features/favorites/FavoritesModal";
import { deleteCookie } from "../../utils/CookieUtil";
import UpdateCheckInTimeModal from "../../features/members/components/attendances/UpdateCheckInTimeModal";
import UpdateCheckOutTimeModal from "../../features/members/components/attendances/UpdateCheckOutTimeModal";
import {checkTodayAttendance} from "../../features/members/services/MembersService";
import DateUtils from "../../utils/DateUtils";

const DropDownMenu = () => {
    const { id, isAuthenticated, name, department, position } = useAuth();
    const { isNotified, setIsNotified } = useNotification();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false);
    const [showNotificationListModal, setNotificationListModal] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showFavoritesModal, setShowFavoritesModal] = useState(false);
    const [activeModal, setActiveModal] = useState(null); // "checkIn" or "checkOut" or null
    const [todayAttendanceId, setTodayAttendanceId] = useState(null);

    useEffect(() => {
        console.log("알림 상태 업데이트 : ", isNotified);
    }, [isNotified]);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Failed to logout:", error);
        }
        localStorage.clear();
        localStorage.setItem("isAuthenticated", JSON.stringify(false));
        deleteCookie('refreshToken');
        window.location.href = '/auth/login';
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

    const handleShowFavoritesModal = () => setShowFavoritesModal(true);
    const handleCloseFavoritesModal = () => setShowFavoritesModal(false);

    const handleNotificationClick = () => {
        handleShowNotificationListModal();
        setIsNotified(false);
    };

    const handleLinkClick = () => {
        setIsDropdownOpen(false);
    };

    const handleAttendanceModal = () => {
        const currentHour = new Date().getHours();
        const currentMinute = new Date().getMinutes();

        console.log(currentHour + " / " + currentMinute);

        // 출근 시간 조건: 08:30 ~ 10:00
        const isCheckInTime =
            (currentHour === 8 && currentMinute >= 30) ||
            (currentHour === 9) ||
            (currentHour === 10 && currentMinute === 0);

        // 퇴근 시간 조건: 12:00 ~ 19:00
        const isCheckOutTime =
            (currentHour >= 12 && currentHour < 19) ||
            (currentHour === 19 && currentMinute === 0);

        if (isCheckInTime) {
            setActiveModal("checkIn"); // 출근 모달 열기
            if(todayAttendanceId === null){
                checkTodayAttendances(id, DateUtils.getToday());
            }
        } else if (isCheckOutTime) {
            setActiveModal("checkOut"); // 퇴근 모달 열기
            if(todayAttendanceId === null){
                checkTodayAttendances(id, DateUtils.getToday());
            }
        } else {
            alert("출근 시간 : 08:30 ~ 10:00" +
                " / 퇴근 시간 : 17:30 ~ 19:00 " +
                " / 예외적으로 조퇴의 경우 12시부터 퇴근 가능");
        }
    };

    const handleCloseAttendanceModal = () => {
        setActiveModal(null); // 모든 모달 닫기
    };

    const updateAttendanceInState = () => {
        console.log("success updateAttendancesInState at navbar");
    };

    const checkTodayAttendances = async ( memberId, today) => {
        try{
            const response = await checkTodayAttendance(memberId, today);
            setTodayAttendanceId(response.attendanceId);
        }catch (error) {
            console.error(error);
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
                    src={`${imagePrefix}/shared/${isNotified ? 'is_notified_true.png' : 'is_notified_false.png'}`}
                    alt="notification-list"
                    className="nav-bar-icon"
                    onClick={handleNotificationClick}
                />
                <img src={`${imagePrefix}/shared/user_info.png`}
                     onClick={handleShowUserModal}
                     className="user-info" />

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

                                    {(position === 'MANAGER' || position === 'CEO') && (
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
                show={showUserModal}
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
                handleClose={handleCloseFavoritesModal} />

            {/* 출근 시간 변경 모달 */}
            {activeModal === "checkIn" && (
                <UpdateCheckInTimeModal
                    show={true}
                    attendanceId={todayAttendanceId}
                    onClose={handleCloseAttendanceModal}
                    updateAttendanceInState={updateAttendanceInState}
                />
            )}

            {/* 퇴근 시간 변경 모달 */}
            {activeModal === "checkOut" && (
                <UpdateCheckOutTimeModal
                    show={true}
                    attendanceId={todayAttendanceId}
                    onClose={handleCloseAttendanceModal}
                    updateAttendanceInState={updateAttendanceInState}
                />
            )}
        </>
    );
};

export default DropDownMenu;
