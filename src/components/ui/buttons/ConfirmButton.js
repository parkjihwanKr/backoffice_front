import React from 'react';
import './Button.css';

const ConfirmButton = ({ onClick }) => {
    console.log(onClick);
    return (
        <button className="button" onClick={onClick}>
            확인
        </button>
    );
};

export default ConfirmButton;
