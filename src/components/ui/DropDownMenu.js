import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../features/auth/components/AuthContext';
import { Dropdown, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const DropDownMenu = () => {
    const { isAuthenticated, name, role } = useAuth();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false);

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

    const handleShowLogoutModal = () => setShowLogoutModal(true);
    const handleCloseLogoutModal = () => setShowLogoutModal(false);

    const handleShowUserModal = () => setShowUserModal(true);
    const handleCloseUserModal = () => setShowUserModal(false);

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', zIndex: 1100 }}>
                {/* 사용자 아이콘 */}
                <Button
                    variant="link"
                    onClick={handleShowUserModal}
                    style={{
                        backgroundColor: 'black', // 동그란 배경색
                        borderRadius: '50%', // 동그라미 모양
                        padding: '10px',
                        marginRight: '10px',
                        color: 'white', // 아이콘 색깔을 하얀색으로
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40px', // 동그라미의 너비와 높이
                        height: '40px',
                    }}
                >
                    <FontAwesomeIcon icon={faUser} size="lg" />
                </Button>

                {/* Dropdown 메뉴 */}
                <Dropdown>
                    <Dropdown.Toggle
                        id="dropdown-basic"
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 1)', // 불투명한 흰색 배경
                            color: 'black',
                            borderColor: 'white',
                        }}
                    >
                        Menu
                    </Dropdown.Toggle>

                    <Dropdown.Menu style={{ backgroundColor: 'rgba(255, 255, 255, 1)', borderColor: 'lightgray' }}>
                        {!isAuthenticated ? (
                            <>
                                <Dropdown.Item as={Link} to="/auth/signup">Signup</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/auth/login">Login</Dropdown.Item>
                            </>
                        ) : (
                            <>
                                <Dropdown.Item as={Link} to="/notifications">Notifications</Dropdown.Item>
                                <Dropdown.Item onClick={handleShowLogoutModal}>Logout</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/boards">Boards</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/events">Events</Dropdown.Item>
                            </>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            {/* 사용자 정보 모달 */}
            <Modal show={showUserModal} onHide={handleCloseUserModal}>
                <Modal.Header closeButton>
                    <Modal.Title>User Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{name ? `Logged in as ${name}` : 'Not logged in'}</p>
                    <p>Role: {role}</p>
                    {/* 추가적인 사용자 정보를 여기서 보여줄 수 있습니다 */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseUserModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* 로그아웃 모달 */}
            <Modal show={showLogoutModal} onHide={handleCloseLogoutModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to log out?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseLogoutModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleLogout}>
                        Logout
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DropDownMenu;
