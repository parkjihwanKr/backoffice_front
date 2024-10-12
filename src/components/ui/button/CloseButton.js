import React from 'react';
import './CloseButton.css';
import {imagePrefix} from "../../../utils/Constant"; // 스타일을 import

const CloseButton = ({ handleClose }) => {
    return (
        <button className="close-button" onClick={handleClose}>
            Close
        </button>
    );
};

export default CloseButton;
