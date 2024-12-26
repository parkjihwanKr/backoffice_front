import React from "react";
import './MainFooter.css';

const MainFooter = () => {
    return (
        <footer className="custom-footer">
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
