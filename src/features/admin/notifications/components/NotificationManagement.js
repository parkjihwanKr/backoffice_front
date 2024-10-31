/*NotificationManagement.js*/
import NotificationManagementBody from "./body/NotificationManagementBody";
import NotificationManagementFooter from "./footer/NotificationManagementFooter";
import NotificationManagementHeader from "./header/NotificationManagementHeader";

const NotificationManagement = () => {
    return(
        <div className="notification-management">
            <NotificationManagementHeader/>
            <NotificationManagementBody/>
            <NotificationManagementFooter/>
        </div>
    )
}
export default NotificationManagement;