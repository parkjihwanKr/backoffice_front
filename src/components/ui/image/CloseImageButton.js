import React from "react";
import {imagePrefix} from "../../../utils/Constant";
import './CloseImageButton.css'

const CloseImageButton = ({handleClose}) => {
    return (
        <img
            src={`${imagePrefix}/shared/close.png`}
            alt="close"
            className="close-button"
            onClick={handleClose}
        />
    );
}
export default CloseImageButton;