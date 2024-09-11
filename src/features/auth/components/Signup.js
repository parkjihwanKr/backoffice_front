import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

// 상수 변수명 대문자?
// Hooks 규칙 useState(), useEffect... 상단에 위치할 것
const SignupForm = () => {
    // 페이지 초기 상태
    const [formData, setFormData] = useState({
        memberName: '',         // back-end membername(id)
        password: '',
        passwordConfirm: '',
        name:'',        // back-end name(실명)
        email:'',
        address:'',
        contact:''
    });
    const navigate = useNavigate();
    // name : value에 해당하는 값에 대해서 업데이트 처리
    // ...fromData는 현재 폼에 저장되어져있는 값을 그대로 가져옴
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name] : value
        });
    };

    // submit signup form
    const handleSubmit = async (e) => {
        e.preventDefault();
        // 서버로 formData 전송
        console.log("From data submit server...!", formData);
        try {
            const response = await fetch("http://localhost:8080/api/v1/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const result = await response.text();
                console.log(result); // "User registered successfully"
                navigate('/auth/login');
            } else {
                console.error("Failed to register user");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="memberName">MemberName:</label>
                <input
                    type="text"
                    id="memberName"
                    name="memberName"
                    value={formData.memberName}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="password">PasswordConfirm:</label>
                <input
                    type="password"
                    id="passwordConfirm"
                    name="passwordConfirm"
                    value={formData.passwordConfirm}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="address">Address:</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="contact">Contact:</label>
                <input
                    type="contact"
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignupForm;
