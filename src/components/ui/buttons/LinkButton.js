import React from "react";
import './Button.css';

const LinkButton = ({ goToLink, text }) => {
    return (
        <button className="button" onClick={goToLink}>
            {text}
        </button>
    );
};

export default LinkButton;