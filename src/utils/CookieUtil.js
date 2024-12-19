// CookieUtil.js
export const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};

// 클라이언트에 남아 있는 쿠키 삭제
export const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

// 쿠키 설정하기, 해당 부분 삭제할 듯? -> 서버에서 관리하는 cookie와 다르게 설정될 여지가 있음
export const setCookie = (name, value, days = 1) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000); // days에 따른 만료일 설정
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/;`;
};