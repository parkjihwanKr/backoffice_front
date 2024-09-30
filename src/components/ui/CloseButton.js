import React from 'react';
import './CloseButton.css'; // 스타일을 import

const CloseButton = ({ handleClose }) => {
    return (
        <button className="close-button" onClick={handleClose}>
            Close
        </button>
    );
};

export default CloseButton;
