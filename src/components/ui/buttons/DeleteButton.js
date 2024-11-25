import React from 'react';
import "./DeleteButton.css";

const DeleteButton= ({ onSubmit }) => {
    return (
        <button className="delete-button" onClick={onSubmit}>
            삭제
        </button>
    );
};
export default DeleteButton;
