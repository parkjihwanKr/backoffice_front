import React from 'react';
import './Button.css';

const ConfirmButton = ({ onClick, text, auth }) => {
    return (
        <button
            className="button"
            onClick={onClick}
            style={{
                width: '100px',
                minWidth: auth ? '160px' : undefined,
            }}
        >
            {text}
        </button>
    );
};

export default ConfirmButton;
