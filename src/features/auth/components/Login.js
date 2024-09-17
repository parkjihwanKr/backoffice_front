// Login.js
import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [memberName, setMemberName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ memberName, password }),
                // 쿠키를 포함하여 요청
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
                // 페이지 리로드
                window.location.reload();
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <div>
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="memberName">Member Name:</label>
                    <input
                        type="text"
                        id="memberName"
                        value={memberName}
                        onChange={(e) => setMemberName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
