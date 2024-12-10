import React from 'react';
import './Button.css';

const ConfirmButton = ({ onClick, text }) => {
    return (
        <button className="button" onClick={onClick}
        style={{ width : '100px'}}>
            {text}
        </button>
    );
};

export default ConfirmButton;
