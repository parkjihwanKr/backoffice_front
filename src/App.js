import React, {useEffect} from 'react';
import {BrowserRouter as Router, Link, Navigate, Route, Routes} from 'react-router-dom';
import Signup from './features/auth/components/Signup';
import Login from "./features/auth/components/Login";
import PrivateRoute from "./routes/PrivateRoute";
import Boards from './features/boards/components/Boards';
import Notifications from './features/notifications/components/Notifications';
import Events from './features/events/shared/Events';
import DepartmentSchedule from './features/events/department/components/DepartmentSchedule';
import DepartmentBoards from './features/boards/components/DepartmentBoard';
import CreateBoard from "./features/boards/components/CreateBoard";
import DropDownMenu from "./components/common/DropDownMenu";
import BoardDetails from "./features/boards/components/boardDetails/BoardDetails";

import './assets/styles/App.css';
import {AuthProvider} from './features/auth/context/AuthContext';
import {NotificationProvider} from "./features/notifications/context/NotificationContext";

import MainPage from "./pages/shared/MainPage";
import PersonalSchedule from "./features/events/personal/components/PersonalSchedule";
import Admin from "./features/admin/shared/components/Admin";
import MemberManagement from "./features/admin/members/components/MemberManagement";
import VacationManagement from "./features/admin/vacations/components/VacationManagement";
import NotificationManagement from "./features/admin/notifications/components/NotificationManagement";
import AuditManagement from "./features/admin/audit/components/AuditManagement";
import MemberDetails from "./features/members/components/details/MemberDetails";
import HomeImageButton from "./components/ui/image/HomeImageButton";
import BoardList from "./features/boards/components/BoardList";
import AttendanceManagement from "./features/admin/attendances/components/AttendanceManagement";
import DailyAttendanceManagement from "./features/admin/attendances/components/body/daily/DailyAttendanceManagement";
import UpdateMemberDetails from "./features/members/components/details/UpdateMemberDetails";
import MemberAttendance from "./features/members/components/attendances/MemberAttendance";
import {FavoritesProvider} from "./features/favorites/context/FavoritesProvider";
import MainFooter from "./pages/shared/MainFooter";

function App() {

    useEffect(() => {
        document.title = "Baegobiseu";
    }, []);

    return (
        <AuthProvider>
            <NotificationProvider>
                <FavoritesProvider>
                    <Router>
                        <div className="body">
                            <nav className="custom-navbar">
                                <Link to="/" className="custom-navLink">
                                    <HomeImageButton/>
                                </Link>

                                <DropDownMenu/>
                            </nav>

                            <Routes>
                                {/* JWT 보호가 필요 없는 페이지 */}
                                <Route path="/auth/signup" element={<Signup/>}/>
                                <Route path="/auth/login" element={<Login/>}/>

                                {/* JWT 보호가 필요한 페이지 */}
                                <Route path="/*"
                                       element={<PrivateRoute component={MainPage}/>}/>

                                <Route path="/boards/*"
                                       element={<PrivateRoute component={Boards}/>}/>
                                <Route path="/notifications"
                                       element={<PrivateRoute component={Notifications}/>}/>
                                <Route path="/events"
                                       element={<PrivateRoute component={Events}/>}/>
                                <Route path="/all-boards"
                                       element={<PrivateRoute component={BoardList}/>}/>
                                <Route path="/create-board"
                                       element={<PrivateRoute component={CreateBoard}/>}/>
                                <Route path="/create-department-board/:department"
                                       element={<PrivateRoute component={CreateBoard}/>}/>
                                <Route path="/all-boards/:boardId"
                                       element={<PrivateRoute component={BoardDetails}/>}/>
                                <Route path="/department-boards/:department"
                                       element={<PrivateRoute component={DepartmentBoards}/>}/>
                                <Route path="/departments/:departmentName/boards/:boardId"
                                       element={<PrivateRoute component={BoardDetails}/>}/>
                                <Route path="/department-schedule/:department"
                                       element={<PrivateRoute component={DepartmentSchedule}/>}/>
                                <Route path="/personal-schedule"
                                       element={<PrivateRoute component={PersonalSchedule}/>}/>
                                <Route path="/admins"
                                       element={<PrivateRoute component={Admin}/>}/>

                                {/* 인사 관리 페이지: HR/MANAGER 또는 CEO만 접근 가능 */}
                                <Route path="/admins/member-management"
                                       element={<PrivateRoute component={MemberManagement}
                                                              allowedDepartments={['HR']}
                                                              allowedPositions={['MANAGER', 'CEO']}
                                       />}/>

                                <Route path="/members/:memberId" element={
                                    <PrivateRoute component={MemberDetails}/>}/>

                                <Route path="/members/:memberId/update" element={
                                    <PrivateRoute component={UpdateMemberDetails}/>}/>

                                <Route path="/members/:memberId/attendance" element={
                                    <PrivateRoute component={MemberAttendance}/>}/>

                                {/* 근태 관리 페이지: HR/MANAGER 또는 CEO만 접근 가능 */}
                                <Route path="/admins/attendance-management"
                                       element={<PrivateRoute component={AttendanceManagement}
                                                              allowedDepartments={['HR']}
                                                              allowedPositions={['MANAGER', 'CEO']}
                                       />}/>
                                <Route path="/admins/daily-attendance-management"
                                       element={<PrivateRoute component={DailyAttendanceManagement}
                                                              allowedDepartments={['HR']}
                                                              allowedPositions={['MANAGER', 'CEO']}
                                       />}/>
                                {/* 휴가 관리 페이지: HR/MANAGER 또는 CEO만 접근 가능 */}
                                <Route path="/admins/vacation-management"
                                       element={<PrivateRoute component={VacationManagement}
                                                              allowedDepartments={['HR']}
                                                              allowedPositions={['MANAGER', 'CEO']}
                                       />}/>

                                {/* 사내 알림 페이지: MANAGER 또는 CEO만 접근 가능 */}
                                <Route path="/admins/notification-management"
                                       element={<PrivateRoute component={NotificationManagement}
                                                              allowedPositions={['MANAGER', 'CEO']}
                                       />}/>

                                {/* 회계 감사 페이지: AUDIT/MANAGER 또는 CEO만 접근 가능 */}
                                <Route path="/admins/audit-management"
                                       element={<PrivateRoute component={AuditManagement}
                                                              allowedDepartments={['AUDIT']}
                                                              allowedPositions={['MANAGER', 'CEO']}
                                       />}/>

                                {/* 시작 페이지가 "/"지만 로그인 하지 않으면 login 페이지로 */}
                                <Route path="*" element={<Navigate to="/auth/login" replace/>}/>
                            </Routes>
                            <MainFooter>
                                {/*Main Footer container...*/}
                            </MainFooter>
                        </div>
                    </Router>
                </FavoritesProvider>
            </NotificationProvider>
        </AuthProvider>
    );
}

export default App;
