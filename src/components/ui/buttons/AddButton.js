import React from 'react';
import './Button.css';

const AddButton = ({ onClick, text }) => {
    return (
        <button className="button" onClick={onClick}
                style={{ maxWidth : '148px', height : '70%'}}>
            {text}
        </button>
    );
};

export default AddButton;
