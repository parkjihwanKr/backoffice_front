/*SubmitButton.js*/
import React from 'react';
import "./Button.css";

const SubmitButton= ({ onSubmit, text }) => {
    return (
        <button className="button" onClick={onSubmit}
        style={{ width : "100px"}}>
            {text}
        </button>
    );
};
export default SubmitButton;
