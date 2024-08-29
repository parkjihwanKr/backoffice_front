import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../features/auth/components/AuthContext';

const DropDownMenu = () => {
    const { isAuthenticated, role } = useAuth();

    return (
        <div className="dropdown-content">
            {!isAuthenticated ? (
                <>
                    <Link to="/auth/signup" className="navLink">Signup</Link>
                    <Link to="/auth/login" className="navLink">Login</Link>
                </>
            ) : (
                <>
                    {role === 'admin' && <Link to="/notifications" className="navLink">Notifications</Link>}
                    <Link to="/auth/signup" className="navLink">Signup</Link>
                    <Link to="/auth/login" className="navLink">Login</Link>
                    <Link to="/boards" className="navLink">Boards</Link>
                    <Link to="/events" className="navLink">Events</Link>
                </>
            )}
        </div>
    );
};

export default DropDownMenu;
