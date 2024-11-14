import React from 'react';
import './Button.css';

const CloseButton = ({ handleClose }) => {
    return (
        <button className="button" onClick={handleClose}>
            Close
        </button>
    );
};

export default CloseButton;
