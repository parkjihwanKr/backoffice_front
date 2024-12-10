import React, { useState } from "react";
import SubmitButton from "../../../../components/ui/buttons/SubmitButton";
import "./MemberDetails.css";
import "./UpdateMemberDetailsTable.css";

const UpdateMemberDetailsTable = ({ member, onSave }) => {
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

    const handleSubmit = () => {
        // 서버 전송 또는 부모 컴포넌트로 전달
        if (formData.password !== formData.passwordConfirm) {
            alert("Passwords do not match!");
            return;
        }
        onSave(formData); // 부모 컴포넌트나 서버로 데이터를 전송
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
                <tr>
                    <td><strong>자기소개:</strong></td>
                    <td>
                            <textarea
                                value={formData.introduction}
                                onChange={(e) => handleChange("introduction", e.target.value)}
                                placeholder="자기소개 입력"
                                rows="4"
                            />
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="update-actions">
                <SubmitButton text={"변경"} onClick={handleSubmit} />
            </div>
        </div>
    );
};

export default UpdateMemberDetailsTable;
