// NotifcationManagement.js
import React, { useState, useEffect } from 'react';
import CreateNotificationModal from './CreateNotificationModal';
import { DEPARTMENTS } from '../../../../../utils/Constant';
import { fetchMemberList } from '../../../members/services/MemberManagementService';
import './NotificationManagementBody.css';

const NotificationManagementBody = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [message, setMessage] = useState("");
    const [onSubmit, setOnSubmit] = useState(() => () => {});
    const [members, setMembers] = useState([]);

    useEffect(() => {
        // 서버에서 사용자 목록을 불러와 설정
        const loadMembers = async () => {
            try {
                const memberList = await fetchMemberList();
                setMembers(memberList);
            } catch (error) {
                console.error("Error loading member list:", error);
            }
        };
        loadMembers();
    }, []);

    const handleOpenAllModal = () => {
        setModalTitle("전체 알림 발송");
        setOnSubmit(() => (msg) => alert(`전체 사용자에게 알림: ${msg}`));
        setIsModalOpen(true);
    };

    const handleOpenSpecificModal = () => {
        setModalTitle("특정 인원 알림 발송");
        setOnSubmit(() => (msg, excludedUser, selectedDept) => {
            alert(`부서: ${selectedDept}, 제외 사용자: ${excludedUser}를 제외하고 알림: ${msg}`);
            // 서버 전송 로직 추가 가능
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setMessage("");
    };

    return (
        <div className="notification-management-body">
            <button
                className="notification-management-body-all-submit-button"
                onClick={handleOpenAllModal}
            >
                전체 알림 발송
            </button>
            <button
                className="notification-management-body-submit-button"
                onClick={handleOpenSpecificModal}
            >
                특정 인원 알림 발송
            </button>

            {isModalOpen && (
                <CreateNotificationModal
                    title={modalTitle}
                    message={message}
                    setMessage={setMessage}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSubmit={onSubmit}
                    departments={DEPARTMENTS} // 상수에서 불러온 부서 리스트 전달
                    members={modalTitle === "특정 인원 알림 발송" ? members : []} // 특정 인원일 때만 members 사용
                />
            )}
        </div>
    );
};

export default NotificationManagementBody;
