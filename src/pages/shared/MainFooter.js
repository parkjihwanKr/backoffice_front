import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './MainFooter.css';

const MainFooter = () => {
    const [isFixed, setIsFixed] = useState(false);
    const location = useLocation();

    const checkOverflowY = () => {
        // DOM 요소들의 크기를 기반으로 스크롤 여부 계산
        const html = document.documentElement;
        const isScrollable = html.scrollHeight > html.clientHeight;

        // 스크롤이 없으면 fixed로 설정
        setIsFixed(!isScrollable);
    };

    useEffect(() => {
        // 페이지 이동 시 DOM 업데이트 이후 실행
        const timeout = setTimeout(checkOverflowY, 100);
        return () => clearTimeout(timeout);
    }, [location]); // location 변경 시 재실행

    useEffect(() => {
        // DOM 변경 감지
        const observer = new MutationObserver(() => {
            checkOverflowY();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        window.addEventListener("resize", checkOverflowY); // 리사이즈 감지
        return () => {
            observer.disconnect();
            window.removeEventListener("resize", checkOverflowY); // 리스너 제거
        };
    }, []);

    return (
        <footer className={`custom-footer ${isFixed ? "fixed-footer" : "default-footer"}`}>
            <div className="footer-content">
                <div className="footer-icon-credits">
                    <div className="footer-copyright">
                        <p>© 2024 BackOffice. All rights reserved.</p>
                    </div>
                    <div className="footer-links">
                        <a href="/" className="footer-link">Privacy Policy</a>
                        <a href="/" className="footer-link">Terms of Service</a>
                    </div>
                    <div className="footer-icons">
                        <p>
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                                alt="Flaticon Logo"
                                className="icon-credit-img"
                            />
                            Icons by <a href="https://www.flaticon.com/" target="_blank" rel="noopener noreferrer"
                                        className="icon-credit-link">Flaticon</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default MainFooter;
