import React, {useState} from "react";
import "./MemberDetails.css";
import "./UpdateMemberDetailsTable.css";
import {useNavigate} from "react-router-dom";
import ConfirmButton from "../../../../components/ui/buttons/ConfirmButton";

const UpdateMemberDetailsTable = ({ member, onEditMemberDetails }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: member.name || "",
        memberName: member.memberName || "",
        password: "",
        passwordConfirm: "",
        email: member.email || "",
        address: member.address || "",
        contact: member.contact || "",
        introduction: member.introduction || "",
    });

    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async () => {
        if (formData.password !== formData.passwordConfirm) {
            alert("비밀번호와 비밀번호 확인이 다르게 입력되었습니다.");
            return;
        }

        try {
            const updatedMember = await onEditMemberDetails(formData);
            if (updatedMember) {
                alert("멤버 정보가 성공적으로 업데이트되었습니다.");
            }
            navigate(`/members/${member.memberId}`);
        } catch (error) {
            console.error("Error updating member details:", error);
            alert("멤버 정보 업데이트 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="update-member-detail-table">
            <table className="member-details-table">
                <tbody>
                <tr>
                    <td><strong>아이디:</strong></td>
                    <td>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            placeholder="아이디 입력"
                            readOnly
                        />
                    </td>
                    <td><strong>이름:</strong></td>
                    <td>
                        <input
                            type="text"
                            value={formData.memberName}
                            onChange={(e) => handleChange("memberName", e.target.value)}
                            placeholder="이름 입력"
                        />
                    </td>
                </tr>
                <tr>
                    <td><strong>비밀번호:</strong></td>
                    <td>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => handleChange("password", e.target.value)}
                            placeholder="비밀번호 입력"
                        />
                    </td>
                    <td><strong>비밀번호 확인:</strong></td>
                    <td>
                        <input
                            type="password"
                            value={formData.passwordConfirm}
                            onChange={(e) => handleChange("passwordConfirm", e.target.value)}
                            placeholder="비밀번호 확인"
                        />
                    </td>
                </tr>
                <tr>
                    <td><strong>이메일:</strong></td>
                    <td>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            placeholder="이메일 입력"
                        />
                    </td>
                    <td><strong>연락처:</strong></td>
                    <td>
                        <input
                            type="text"
                            value={formData.contact}
                            onChange={(e) => handleChange("contact", e.target.value)}
                            placeholder="연락처 입력"
                        />
                    </td>
                </tr>
                <tr>
                    <td><strong>주소:</strong></td>
                    <td className="address">
                        <input
                            type="text"
                            value={formData.address}
                            onChange={(e) => handleChange("address", e.target.value)}
                            placeholder="주소 입력"
                            className="address"
                        />
                    </td>
                </tr>
                <tr className= "member-details-table-row">
                    <td colSpan="4" className="member-details-introduction">
                        <div className="member-details-introduction-title">
                            자기 소개
                        </div>
                        <textarea
                            value={formData.introduction}
                            onChange={(e) => handleChange("introduction", e.target.value)}
                            placeholder="자기소개 입력"
                            rows="4"
                            className="member-details-introduction-content"
                        />
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="update-member-details-table-button">
                <ConfirmButton text={"변경"} onClick={handleSubmit}/>
            </div>
        </div>
    );
};

export default UpdateMemberDetailsTable;
