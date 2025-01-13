import React from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/AuthService";
import useSignup from "../hooks/useSignup";
import useValidation from "../hooks/useValidation";
import useUsernameAvailability from "../hooks/useUsernameAvailability";
import "../shared/Auth.css";
import ConfirmButton from "../../../components/ui/buttons/ConfirmButton";
import {alertError, alertSuccess} from "../../../utils/ErrorUtils";

const SignupForm = () => {
    const navigate = useNavigate();
    const [formData, handleChange] = useSignup({
        memberName: "",
        password: "",
        passwordConfirm: "",
        name: "",
        email: "",
        address: "",
        contact: "",
    });
    const { validateForm } = useValidation();
    const { isChecking, handleUsernameCheck } = useUsernameAvailability();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validateForm(formData);
        if (validationError) {
            alert(validationError);
            return;
        }
        try {
            await signup(formData);
            alertSuccess("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
            navigate("/auth/login");
        } catch (error) {
            alertError(error);
        }
    };

    const checkUsername = async () => {
        const isAvailable = await handleUsernameCheck(formData.memberName);
        if (isAvailable) {
            alertSuccess("사용 가능한 아이디입니다.");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-page-header">회원 가입</div>
            <div className="auth-page-body">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="memberName">아이디 :</label>
                        <input
                            type="text"
                            id="memberName"
                            name="memberName"
                            value={formData.memberName}
                            onChange={handleChange}
                            placeholder="8자리 이상 16자리 이하 소문자 알파벳 또는 숫자"
                            className="input-index"
                        />
                        <button
                            type="button"
                            className="speech-balloon"
                            onClick={checkUsername}
                            disabled={isChecking}
                        >
                            {isChecking ? "확인 중..." : "중복 확인"}
                        </button>
                    </div>
                    <div>
                        <label htmlFor="password">비밀번호 :</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="8자리 이상 16자리 이하 비밀번호를 입력해주세요."
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="passwordConfirm">비밀번호 확인 :</label>
                        <input
                            type="password"
                            id="passwordConfirm"
                            name="passwordConfirm"
                            placeholder="8자리 이상 16자리 이하 비밀번호를 입력해주세요."
                            value={formData.passwordConfirm}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="name">이름 :</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="실명을 입력해주세요."
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="address">주소 :</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            placeholder="경기도 **시 **구 **동 상세 주소"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">이메일 :</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="yourId@naver.com || gmail.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="contact">연락처 :</label>
                        <input
                            type="text"
                            id="contact"
                            name="contact"
                            placeholder="010-****-****"
                            value={formData.contact}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <ConfirmButton onClick={handleSubmit} text="회원 가입" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;
