/*AuditManagement.js*/
import AuditManagementHeader from "./header/AuditManagementHeader";
import AuditManagementBody from "./body/AuditManagementBody";
import AuditManagementFooter from "./footer/AuditManagementFooter";

const AuditManagement = () => {
    return(
        <div className="audit-management">
            <AuditManagementHeader/>
            <AuditManagementBody/>
            <AuditManagementFooter/>
        </div>
    )
}
export default AuditManagement;