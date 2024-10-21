/*SubmitButton.js*/
import React from 'react';
import "./SubmitButton.css";
const SubmitButton= ({ onSubmit }) => {
    return (
        <button className="close-button" onClick={onSubmit}>
            Close
        </button>
    );
};
export default SubmitButton;
