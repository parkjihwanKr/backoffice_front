import React from 'react';
import './Button.css';

const CloseButton = ({ handleClose }) => {
    return (
        <button className="button" onClick={handleClose}
        style = {{backgroundColor : "gray", color : "white", width : "100px"}}>
            닫기
        </button>
    );
};

export default CloseButton;
