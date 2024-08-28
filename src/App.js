import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes, Link} from 'react-router-dom';
import Signup from './auth/Signup';
import Login from "./auth/Login";
import PrivateRoute from "./auth/PrivateRoute";
import Boards from './Boards';
import Notifications from './Notifications';
import Events from './Events';
import './App.css';
import {AuthProvider} from './auth/AuthContext';

// font settings
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faHome} from '@fortawesome/free-solid-svg-icons';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <nav className="navbar">
                        <Link to="/auth/login" className="navLink">
                            <FontAwesomeIcon icon={faHome} />
                        </Link>

                        <div className="dropdown">
                            <button className="dropbtn">
                                <FontAwesomeIcon icon={faBars} />
                            </button>
                            <div className="dropdown-content">
                                <Link to="/auth/signup" className="navLink">Signup</Link>
                                <Link to="/auth/login" className="navLink">Login</Link>
                                <Link to="/boards" className="navLink">Boards</Link>
                                <Link to="/notifications" className="navLink">Notifications</Link>
                                <Link to="/events" className="navLink">Events</Link>
                            </div>
                        </div>
                    </nav>

                    <h1>Welcome to the Main Page</h1>

                    <Routes>
                        {/* 루트 경로를 /auth/login으로 리디렉션 */}
                        <Route path="/" element={<Navigate to="/auth/login" replace />} />

                        {/* 연결 페이지 설정 Jwt token 보호가 필요 없는 것 */}
                        <Route path="/auth/signup" element={<Signup />} />
                        <Route path="/auth/login" element={<Login />} />

                        {/* 연결 페이지 설정 Jwt token 보호가 필요한 것 */}
                        <Route path="/boards" element={<PrivateRoute component={Boards} />} />
                        <Route path="/notifications" element={<PrivateRoute component={Notifications} />} />
                        <Route path="/events" element={<PrivateRoute component={Events} />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
