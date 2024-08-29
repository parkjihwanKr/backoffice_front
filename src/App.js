import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes, Link } from 'react-router-dom';
import Signup from './features/auth/components/Signup';
import Login from "./features/auth/components/Login";
import PrivateRoute from "./routes/PrivateRoute";
import Boards from './features/boards/components/Boards';
import Notifications from './features/notifications/components/Notifications';
import Events from './features/events/components/Events';
import { AuthProvider } from './features/auth/components/AuthContext';
import DropDownMenu from "./components/ui/DropDownMenu";
import './assets/styles/App.css';

// Font Awesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome } from '@fortawesome/free-solid-svg-icons';
import HomePage from "./pages/HomePage";

function App() {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <nav className="navbar">
                        <Link to="/" className="navLink">
                            <FontAwesomeIcon icon={faHome} />
                        </Link>

                        <div className="dropdown">
                            <button className="dropbtn">
                                <FontAwesomeIcon icon={faBars} />
                            </button>
                            <DropDownMenu />
                        </div>
                    </nav>

                    <h1>Welcome to the Main Page</h1>

                    <Routes>
                        {/* JWT 보호가 필요 없는 페이지 */}
                        <Route path="/auth/signup" element={<Signup />} />
                        <Route path="/auth/login" element={<Login />} />

                        {/* JWT 보호가 필요한 페이지 */}
                        <Route path="/" element={<PrivateRoute component={HomePage} />} />
                        <Route path="/boards" element={<PrivateRoute component={Boards} />} />
                        <Route path="/notifications" element={<PrivateRoute component={Notifications} />} />
                        <Route path="/events" element={<PrivateRoute component={Events} />} />

                        {/* 시작 페이지가 "/"지만 로그인 하지 않으면 login 페이지로 */}
                        <Route path="*" element={<Navigate to="/auth/login" replace />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
