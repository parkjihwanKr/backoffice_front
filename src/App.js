// App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Link, Navigate, Route, Routes} from 'react-router-dom';
import Signup from './features/auth/components/Signup';
import Login from "./features/auth/components/Login";
import Logout from "./features/auth/components/Logout";
import PrivateRoute from "./routes/PrivateRoute";
import Boards from './features/boards/shared/components/Boards';
import Notifications from './features/notifications/components/Notifications';
import Events from './features/events/shared/Events';
import CompanySchedule from './features/events/company/components/CompanySchedule';
import DepartmentSchedule from './features/events/department/components/DepartmentSchedule';
import DepartmentBoards from './features/boards/department/components/DepartmentBoard';
import CreateBoard from "./features/boards/general/components/CreateBoard";
import DropDownMenu from "./components/ui/modal/DropDownMenu";
import AllBoards from "./features/boards/general/components/AllBoard";
import BoardDetails from "./features/boards/general/components/boardDetails/BoardDetails";

import './assets/styles/App.css';

// Font Awesome imports
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {AuthProvider} from './features/auth/components/AuthContext';
import {faHome} from '@fortawesome/free-solid-svg-icons';
import HomePage from "./pages/HomePage";
import DepartmentBoardDetail from "./features/boards/department/components/boardDetails/DepartmentBoardDetails";
import CreateDepartmentBoard from "./features/boards/department/components/CreateDepartmentBoard";
import NoSchedulePage from "./features/events/department/components/NoSchedule";
import PersonalSchedule from "./features/events/personal/components/PersonalSchedule";

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
                        <Route path="/all-boards" element={<PrivateRoute component={AllBoards} />} />
                        <Route path="/create-board" element={<PrivateRoute component={CreateBoard} />} />
                        <Route path="/all-boards/:boardId" element={<PrivateRoute component={BoardDetails} />} />
                        <Route path="/department-boards/:department"
                               element={<PrivateRoute component={DepartmentBoards} />} />
                        <Route path="/departments/:departmentName/boards/:boardId"
                               element={<PrivateRoute component = {DepartmentBoardDetail} />} />
                        <Route path="/create-department-board/:department"
                               element={<PrivateRoute component={CreateDepartmentBoard} />} />
                        <Route path="/department-schedule/:department"
                               element={<PrivateRoute component={DepartmentSchedule} />} />
                        <Route path="/personal-schedule"
                                element={<PrivateRoute component={PersonalSchedule} />}/>
                        <Route path="/no-schedules"
                               element={<PrivateRoute component={NoSchedulePage} />} />
                        {/* 시작 페이지가 "/"지만 로그인 하지 않으면 login 페이지로 */}
                        <Route path="*" element={<Navigate to="/auth/login" replace />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
