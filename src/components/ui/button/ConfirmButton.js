import React from 'react';
import './ConfirmButton.css';

const ConfirmButton = ({ onClick }) => {
    console.log(onClick);
    return (
        <button className="confirm-button" onClick={onClick}>
            Confirm
        </button>
    );
};

export default ConfirmButton;
