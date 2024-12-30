import React, { useState, useRef } from "react";
import { getCookie } from "../../../../../utils/CookieUtil";
import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
import { useFetchMemberList } from "../../hooks/useFetchMemberList";
import { useModalAlignment } from "../../hooks/useModalAlignment";
import {
    departmentMapping,
    positionMapping,
    DEPARTMENTS,
    imagePrefix,
} from "../../../../../utils/Constant";
import { sendWebSocketBroadcastMessage, sendWebSocketMessage } from "../../../../../utils/WebSocketUtil";
import ConfirmButton from "../../../../../components/ui/buttons/ConfirmButton";

const CreateNotificationModal = ({ title, isOpen, onClose, onSubmit, departments = DEPARTMENTS }) => {
    const [message, setMessage] = useState("");
    const [selectedDepts, setSelectedDepts] = useState([]);
    const [excludedUsers, setExcludedUsers] = useState([]);
    const [deptDropdownVisible, setDeptDropdownVisible] = useState(false);
    const [userDropdownVisible, setUserDropdownVisible] = useState(false);

    const accessToken = getCookie("accessToken");

    const modalOverlayRef = useRef(null);
    const modalContentRef = useRef(null);

    const memberList = useFetchMemberList(isOpen);
    useModalAlignment(isOpen, modalOverlayRef, modalContentRef);

    const handleSend = () => {
        const payload = { message };

        if (title === "전체 알림 발송") {
            sendWebSocketBroadcastMessage("/app/admins/notifications", payload, accessToken)
                .then(() => {
                    onSubmit(message);
                    setMessage("");
                })
                .catch(error => console.error("Failed to send broadcast message:", error));
        } else if (title === "특정 인원 알림 발송") {
            const filteredPayload = {
                message,
                excludedMemberIdList: excludedUsers.map(user => user.memberId),
                excludedMemberDepartment: selectedDepts.map(dept => departmentMapping[dept]),
            };

            console.log("Filtered Payload:", filteredPayload);

            sendWebSocketMessage("/app/admins/notifications/filtered", filteredPayload, accessToken)
                .then(() => {
                    onSubmit(message, excludedUsers, selectedDepts);
                    setMessage("");
                })
                .catch(error => console.error("Failed to send filtered notifications:", error));
        }
    };

    const toggleDeptSelection = (dept) => {
        setSelectedDepts((prev) =>
            prev.includes(dept) ? prev.filter(item => item !== dept) : [...prev, dept]
        );
    };

    const toggleUserSelection = (userName, userDepartment, userPosition, userId) => {
        setExcludedUsers((prev) => {
            const userExists = prev.find(user => user.memberId === userId);
            if (userExists) {
                return prev.filter(user => user.memberId !== userId);
            } else {
                return [...prev, { memberId: userId, name: userName, department: userDepartment, position: userPosition }];
            }
        });
    };

    const handleDeptDropdownAction = (action) => {
        setDeptDropdownVisible(false);
        if (action === "selectAll") setSelectedDepts(departments);
        else if (action === "clearAll") setSelectedDepts([]);
    };

    const handleUserDropdownAction = (action) => {
        setUserDropdownVisible(false);
        if (action === "selectAll") {
            const selectableUsers = memberList.filter(member => !selectedDepts.includes(member.department));
            setExcludedUsers(selectableUsers.map(user => ({
                memberId: user.memberId,
                name: user.memberName,
                department: user.department,
                position: user.position,
            })));
        } else if (action === "clearAll") {
            setExcludedUsers([]);
        }
    };

    const getMappedDepartment = (dept) => Object.keys(departmentMapping).find(key => departmentMapping[key] === dept) || dept;
    const getMappedPosition = (position) => Object.keys(positionMapping).find(key => positionMapping[key] === position) || position;

    return (
        <div ref={modalOverlayRef} className="create-notification-modal-overlay">
            <div ref={modalContentRef} className="create-notification-modal-content">
                <div className="custom-modal-header">
                    <h3>{title}</h3>
                    <CloseImageButton handleClose={onClose} />
                </div>

                {title === "특정 인원 알림 발송" && (
                    <div className="selection-row">
                        <div>
                            <h5>
                                제외할 부서 선택
                                <img
                                    src={`${imagePrefix}/shared/settings.png`}
                                    alt="Settings"
                                    className="dept-settings-icon"
                                    onClick={() => setDeptDropdownVisible(!deptDropdownVisible)}
                                />
                            </h5>
                            {deptDropdownVisible && (
                                <div className="dept-settings-dropdown-menu">
                                    <button onClick={() => handleDeptDropdownAction("selectAll")}>전체 선택</button>
                                    <button onClick={() => handleDeptDropdownAction("clearAll")}>전체 선택 해제</button>
                                </div>
                            )}
                            <div className="checkbox-list">
                                {departments.map((dept) => (
                                    <div
                                        key={dept}
                                        className={`checkbox-item ${selectedDepts.includes(dept) ? "selected" : ""}`}
                                        onClick={() => toggleDeptSelection(dept)}
                                    >
                                        {getMappedDepartment(dept)}
                                        {selectedDepts.includes(dept) && <span className="checkmark">✔</span>}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h5>
                                제외할 사용자 선택
                                <img
                                    src={`${imagePrefix}/shared/settings.png`}
                                    alt="Settings"
                                    className="user-settings-icon"
                                    onClick={() => setUserDropdownVisible(!userDropdownVisible)}
                                />
                            </h5>
                            {userDropdownVisible && (
                                <div className="user-settings-dropdown-menu">
                                    <button onClick={() => handleUserDropdownAction("selectAll")}>전체 선택</button>
                                    <button onClick={() => handleUserDropdownAction("clearAll")}>전체 선택 해제</button>
                                </div>
                            )}
                            <div className="checkbox-list">
                                {memberList
                                    .filter((member) => !selectedDepts.includes(member.department))
                                    .map((user) => (
                                        <div
                                            key={user.memberId}
                                            className={`checkbox-item ${excludedUsers.some(selected => selected.memberId === user.memberId) ? "selected" : ""}`}
                                            onClick={() =>
                                                toggleUserSelection(user.memberName, user.department, user.position, user.memberId)
                                            }
                                        >
                                            <div className="user-name">{user.memberName}</div>
                                            <div className="user-details">
                                                ({getMappedDepartment(user.department)}, {getMappedPosition(user.position)})
                                            </div>
                                            {excludedUsers.some(selected => selected.memberId === user.memberId) && (
                                                <span className="checkmark">✔</span>
                                            )}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                )}

                {title === "특정 인원 알림 발송" && (
                    <div className="selected-lists-container">
                        <div className="selected-departments-list">
                            <h3>제외할 부서:</h3>
                            <ul>
                                {selectedDepts.map((dept, index) => (
                                    <li key={index}>{getMappedDepartment(dept)}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="selected-users-list">
                            <h3>제외할 사용자:</h3>
                            <ul>
                                {excludedUsers.map((user, index) => (
                                    <li key={index}>
                                        {user.name} ({getMappedDepartment(user.department)}, {getMappedPosition(user.position)})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                <textarea
                    className="message-input"
                    placeholder="알림 내용을 입력하세요"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                <div className="create-notification-modal-buttons">
                    <ConfirmButton onClick={handleSend} text={"발송"}/>
                </div>
            </div>
        </div>
    );
};

export default CreateNotificationModal;
