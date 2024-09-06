import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Navigate, Route, Routes, Link } from 'react-router-dom';
import Signup from './features/auth/components/Signup';
import Login from "./features/auth/components/Login";
import Logout from "./features/auth/components/Logout";
import PrivateRoute from "./routes/PrivateRoute";
import Boards from './features/boards/shared/components/Boards';
import Notifications from './features/notifications/components/Notifications';
import Events from './features/events/components/Events';
import DepartmentBoards from './features/boards/department/components/DepartmentBoard';
import CreateBoard from "./features/boards/general/components/CreateBoard";
import { AuthProvider } from './features/auth/components/AuthContext';
import DropDownMenu from "./components/ui/DropDownMenu";
import './assets/styles/App.css';

// Font Awesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import HomePage from "./pages/HomePage";
import AllBoards from "./features/boards/general/components/AllBoard";
import Board from "./features/boards/general/components/BoardDetails";
import BoardDetails from "./features/boards/general/components/BoardDetails";

function App() {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <nav className="navbar">
                        <Link to="/" className="navLink">
                            <FontAwesomeIcon icon={faHome} />
                        </Link>

                        <DropDownMenu />
                    </nav>

                    <Routes>
                        {/* JWT 보호가 필요 없는 페이지 */}
                        <Route path="/auth/signup" element={<Signup />} />
                        <Route path="/auth/login" element={<Login />} />

                        {/* JWT 보호가 필요한 페이지 */}
                        <Route path="/auth/logout" element={<PrivateRoute component={Logout} />} />
                        <Route path="/" element={<PrivateRoute component={HomePage} />} />
                        <Route path="/boards/*" element={<PrivateRoute component={Boards} />} />
                        <Route path="/notifications" element={<PrivateRoute component={Notifications} />} />
                        <Route path="/events" element={<PrivateRoute component={Events} />} />
                        <Route path="/department-boards/:department" element={<PrivateRoute component={DepartmentBoards} />} />
                        <Route path="/all-boards" element={<PrivateRoute component={AllBoards} />} />
                        <Route path="/create-board" element={<PrivateRoute component={CreateBoard} />} />
                        <Route path="/all-boards/:boardId" element={<PrivateRoute component={BoardDetails} />} />
                        {/* 시작 페이지가 "/"지만 로그인 하지 않으면 login 페이지로 */}
                        <Route path="*" element={<Navigate to="/auth/login" replace />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
