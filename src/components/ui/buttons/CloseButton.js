import React from 'react';
import './Button.css';

const CloseButton = ({ handleClose }) => {
    return (
        <button className="button" onClick={handleClose}>
            닫기
        </button>
    );
};

export default CloseButton;
