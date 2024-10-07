import React from 'react';
import { imagePrefix } from "../../../utils/Constant";
const SubmitButton= ({ onSubmit }) => {
    return (
        <img
            title = "제출"
            src={`${imagePrefix}/shared/submit_modal.png`}
            alt="submit"
            className="submit-button"
            onClick={onSubmit}
        />
    );
};
export default SubmitButton;
