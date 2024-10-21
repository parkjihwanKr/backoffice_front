import React from 'react';
import './CloseButton.css';

const CloseButton = ({ handleClose }) => {
    return (
        <button className="close-button" onClick={handleClose}>
            Close
        </button>
    );
};

export default CloseButton;
