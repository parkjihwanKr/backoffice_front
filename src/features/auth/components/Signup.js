import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {checkUsernameAvailability, signup} from "../services/AuthService";
import '../shared/Auth.css';
import ConfirmButton from "../../../components/ui/buttons/ConfirmButton";

const SignupForm = () => {
    const [formData, setFormData] = useState({
        memberName: '',
        password: '',
        passwordConfirm: '',
        name: '',
        email: '',
        address: '',
        contact: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{8,16}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const contactRegex = /^010-\d{4}-\d{4}$/;

        if (!passwordRegex.test(formData.password)) {
            alert("비밀번호는 8자 이상 16자 이하로 입력해주세요.");
            return false;
        }

        if (formData.password !== formData.passwordConfirm) {
            alert("비밀번호와 비밀번호 확인 부분의 양식이 일치하지 않습니다.");
            return false;
        }

        if (!emailRegex.test(formData.email)) {
            alert("유효한 이메일 형식을 입력해주세요. 예: example@domain.com");
            return false;
        }

        if (!contactRegex.test(formData.contact)) {
            alert("유효한 연락처 형식을 입력해주세요. 예: 010-1111-3333");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await signup(formData);
            alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
            navigate('/auth/login');
        } catch (error) {
            if (error.response && error.response.status === 500) {
                alert(`${error.response.status}: ${error.response.data.message}`);
                return;
            }
            alert("회원가입 중 문제가 발생했습니다. 다시 시도해주세요.");
        }
    };

    const handleUsernameCheck = async () => {
        try {
            const isAvailable = await checkUsernameAvailability(formData.memberName);
            if (isAvailable) {
                alert("사용 가능한 아이디입니다.");
            } else {
                alert("이미 사용 중인 아이디입니다.");
            }
        } catch (error) {
            if(error.status === 400){
                alert(error.response.data.data+" : "+error.response.data.message);
                return;
            }
            alert("아이디 확인 중 문제가 발생했습니다.");
            console.error(error);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-page-header">
                회원 가입
            </div>
            <div className="auth-page-body">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="memberName">아이디 : </label>
                        <input
                            type="text"
                            id="memberName"
                            name="memberName"
                            value={formData.memberName}
                            onChange={handleChange}
                            className="input-index"
                        />
                        <button type="button"
                                className="speech-balloon"
                                onClick={handleUsernameCheck}>
                            중복 확인
                        </button>
                    </div>
                    <div>
                        <label htmlFor="password">비밀번호 : </label>
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
                        <label htmlFor="passwordConfirm">비밀번호 확인 : </label>
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
                        <label htmlFor="name">이름 : </label>
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
                            className="input-index"
                            placeholder="ex) 경기도 **시 **구 **동 상세 주소"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">이메일 : </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="myId@domain.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="contact">연락처 : </label>
                        <input
                            type="text"
                            id="contact"
                            name="contact"
                            placeholder="ex) 010-1111-3333"
                            value={formData.contact}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{display: "flex", justifyContent: "flex-end"}}>
                        <ConfirmButton
                            onClick={handleSubmit}
                            text={"회원 가입"}
                            style={{
                                padding: "10px 20px", // 버튼 크기
                                backgroundColor: "cornflowerblue", // 버튼 배경색
                                color: "white", // 텍스트 색상
                                borderRadius: "5px", // 모서리 둥글게
                                border: "none", // 테두리 제거
                                cursor: "pointer", // 클릭 가능한 커서
                            }}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;
