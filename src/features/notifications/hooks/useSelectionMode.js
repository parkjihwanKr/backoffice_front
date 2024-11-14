// hooks/useSelectionMode.js
import { useState } from 'react';

const useSelectionMode = () => {
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [selectedNotifications, setSelectedNotifications] = useState([]);
    const [hasShownSelectionModeHint, setHasShownSelectionModeHint] = useState(false);

    const toggleSelectionMode = () => {
        setIsSelectionMode(prev => !prev);
        setSelectedNotifications([]);
        if (!hasShownSelectionModeHint) {
            alert(" 체크 하신 뒤에, 다시 한 번 알림의 큰 톱니 바퀴를 누르셔서 '선택 삭제' 버튼을 눌러서 삭제 할 수 있습니다.");
            // setHasShownSelectionModeHint(true);
        }
    };

    const handleCheckboxChange = (notificationId) => {
        setSelectedNotifications(prev =>
            prev.includes(notificationId)
                ? prev.filter(id => id !== notificationId)
                : [...prev, notificationId]
        );
    };

    return {
        isSelectionMode,
        toggleSelectionMode,
        selectedNotifications,
        handleCheckboxChange,
        setIsSelectionMode
    };
};

export default useSelectionMode;
