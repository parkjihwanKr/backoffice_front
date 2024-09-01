import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../features/auth/components/AuthContext';
import { Dropdown, Modal, Button } from 'react-bootstrap';

const DropDownMenu = () => {
    const { isAuthenticated, userName, role } = useAuth();  // userName을 추가로 가져옴
    const [showModal, setShowModal] = useState(false);

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

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                    Menu
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {!isAuthenticated ? (
                        <>
                            <Dropdown.Item as={Link} to="/auth/signup">Signup</Dropdown.Item>
                            <Dropdown.Item as={Link} to="/auth/login">Login</Dropdown.Item>
                        </>
                    ) : (
                        <>
                            {userName && (
                                <Dropdown.Item className="text-muted">
                                    안녕하세요? {userName}씨
                                </Dropdown.Item>
                            )}
                            {role === 'admin' && <Dropdown.Item as={Link} to="/notifications">Notifications</Dropdown.Item>}
                            <Dropdown.Item onClick={handleShowModal}>Logout</Dropdown.Item>
                            <Dropdown.Item as={Link} to="/boards">Boards</Dropdown.Item>
                            <Dropdown.Item as={Link} to="/events">Events</Dropdown.Item>
                        </>
                    )}
                </Dropdown.Menu>
            </Dropdown>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to log out?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
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
