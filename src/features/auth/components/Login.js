import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
    const [memberName, setMemberName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/v1/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ memberName, password }),
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Login successful:", data);
                window.location.reload();
            } else {
                console.error("Login failed");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <div className="login-page">
            <div className="login-page-header">
                <h2>Login Page</h2>
            </div>
            <div className="login-page-body">
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
                    <div className="login-page-button">
                        <button type="submit">로그인</button>
                        <Link to="/auth/signup">
                            <button type="button" className="secondary-button">회원 가입</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
