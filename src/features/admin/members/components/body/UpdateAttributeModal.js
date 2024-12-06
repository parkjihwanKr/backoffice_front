import CloseImageButton from "../../../../../components/ui/image/CloseImageButton";
import '../../../../../components/ui/modal/Modal.css';
import useUpdateAttribute from "../../hooks/useUpdateAttribute"; // custom hook 임포트
import { DEPARTMENTS, ROLES, POSITIONS } from "../../../../../utils/Constant";
import SubmitButton from "../../../../../components/ui/buttons/SubmitButton"; // Constant.js에서 임포트

const UpdateAttributeModal = ({ member, onClose, onSave }) => {
    const {
        newDepartment, setNewDepartment,
        newPosition, setNewPosition,
        newRole, setNewRole,
        newFile, setNewFile,
        handleSaveChanges
    } = useUpdateAttribute(member, onSave, onClose);

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <h3>{member.memberName}님 권한 변경</h3>
                    <CloseImageButton handleClose={onClose} />
                </div>
                <div className="custom-modal-body">
                    <div className="custom-modal-form-group">
                        <label htmlFor="department">부서:</label>
                        <select
                            id="department"
                            value={newDepartment}
                            onChange={(e) => setNewDepartment(e.target.value)}
                        >
                            {/* 부서 옵션 */}
                            {DEPARTMENTS.map((dept) => (
                                <option key={dept} value={dept}>
                                    {dept}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="custom-modal-form-group">
                        <label htmlFor="role">역할:</label>
                        <select
                            id="role"
                            value={newRole}
                            onChange={(e) => setNewRole(e.target.value)}
                        >
                            {/* 역할 옵션 */}
                            {ROLES.map((role) => (
                                <option key={role} value={role}>
                                    {role}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="custom-modal-form-group">
                        <label htmlFor="position">직위:</label>
                        <select
                            id="position"
                            value={newPosition}
                            onChange={(e) => setNewPosition(e.target.value)}
                        >
                            {/* 직위 옵션 */}
                            {POSITIONS.map((position) => (
                                <option key={position} value={position}>
                                    {position}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="custom-modal-form-group">
                        <label htmlFor="file">파일 업로드:</label>
                        <input
                            id="file"
                            type="file"
                            onChange={(e) => setNewFile(e.target.files[0])}
                        />
                    </div>
                    <div className="custom-modal-footer">
                        <SubmitButton onSubmit={handleSaveChanges} text={"제출"}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateAttributeModal;
