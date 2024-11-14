// services/authService.js

export const logout = async () => {
    try {
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
        }

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/auth/login';
    } catch (error) {
        console.error("Error: " + error);
    }
};
