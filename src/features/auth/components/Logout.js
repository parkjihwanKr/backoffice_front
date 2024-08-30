// Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

/*
Authorization : Bearer jwtToken을 헤더로 만들어서 보내는 것이 아닌
credentials : included를 통해 cookies의 정보를 server HttpServletRequest를 통해 보내고
해당 정보를 통해 Logout을 진행할 수 있게 변경
*/

const Logout = () => {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');
    console.log("accessToken : "+accessToken);
    const handleLogout = async () => {
        // accessToken이 없는 경우 처리
        if (!accessToken) {
            console.error('로그아웃할 수 없습니다. Access Token이 없습니다.');
            // 로그인 페이지로 리디렉션 또는 다른 처리를 할 수 있습니다.
            navigate('/auth/login');
            return;
        }

        try {
            // 서버에 로그아웃 요청을 보낼 필요가 있다면 아래 코드를 활성화합니다.
            const response = await fetch('/api/v1/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (response.ok) {
                console.log('Logout successful');
            } else {
                console.error('Logout failed');
                return;
            }

            // 클라이언트 측 토큰 삭제
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');

            // 로그아웃 후 로그인 페이지로 이동
            navigate('/auth/login');

            window.location.reload();
        } catch (error) {
            console.error('An error occurred during logout:', error);
        }
    };

    return (
        <div>
            <h2>Are you sure you want to log out?</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;
