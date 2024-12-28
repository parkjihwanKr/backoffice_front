import { useState } from "react";
import { logout } from "../../../features/auth/services/AuthService";
import { deleteCookie } from "../../../utils/CookieUtil";

export const useLogout = () => {
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Failed to logout:", error);
        }
        localStorage.clear();
        localStorage.setItem("isAuthenticated", JSON.stringify(false));
        deleteCookie("refreshToken");
        window.location.href = "/auth/login";
    };

    const handleShowLogoutModal = () => setShowLogoutModal(true);
    const handleCloseLogoutModal = () => setShowLogoutModal(false);

    return {
        showLogoutModal,
        handleLogout,
        handleShowLogoutModal,
        handleCloseLogoutModal,
    };
};
