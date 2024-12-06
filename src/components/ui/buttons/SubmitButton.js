import React from 'react';
import "./Button.css";

const SubmitButton= ({ onSubmit, text }) => {
    return (
        <button
            className="button"
            onClick={onSubmit}
            style={{
                minWidth: "100px",
                maxWidth: `calc(${text.length}ch + 100px)` // 텍스트 길이에 20px 추가
            }}
        >
            {text}
        </button>
    );
};
export default SubmitButton;
