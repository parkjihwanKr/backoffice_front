import { useState } from "react";

export const useDropdown = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const handleLinkClick = () => setIsDropdownOpen(false);

    return {
        isDropdownOpen,
        toggleDropdown,
        handleLinkClick,
    };
};
