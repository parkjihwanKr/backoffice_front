import React from 'react';
import './CloseButton.css'; // 스타일을 import

const CloseButton = ({ onClick }) => {
    return (
        <button className="close-button" onClick={onClick}>
            Close
        </button>
    );
};

export default CloseButton;
