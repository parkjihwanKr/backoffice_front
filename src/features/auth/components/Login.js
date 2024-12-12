import React, { useState } from "react";
import "../shared/Auth.css";
import {Link, useNavigate} from "react-router-dom";
import { login } from "../services/AuthService";

const Login = () => {
    const [memberName, setMemberName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(memberName, password);

            if (response) {
                navigate(`/`);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert("아이디 또는 비밀번호가 올바르지 않습니다.");
            } else {
                alert("로그인 중 문제가 발생했습니다. 다시 시도해주세요.");
            }
        }
    };

    return (
        <div className="login-page">
            <div className="auth-page-header">
                <h2>로그인</h2>
            </div>
            <div className="auth-page-body">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="memberName">아이디 : </label>
                        <input
                            type="text"
                            id="memberName"
                            value={memberName}
                            onChange={(e) => setMemberName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">비밀번호 : </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="auth-page-button">
                        <button type="submit">로그인</button>
                        <Link to="/auth/signup">
                            <button type="button" className="secondary-button">
                                회원 가입
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
