import React from 'react';
import './CloseButton.css'; // 스타일을 import

const ConfirmButton = ({ onClick }) => {
    console.log(onClick);
    return (
        <button className="confirm-button" onClick={onClick}>
            Confirm
        </button>
    );
};

export default ConfirmButton;
