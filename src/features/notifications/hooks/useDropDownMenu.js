// hooks/useDropdownMenu.js
import { useState } from 'react';

const useDropdownMenu = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

    return { isDropdownOpen, toggleDropdown };
};

export default useDropdownMenu;
