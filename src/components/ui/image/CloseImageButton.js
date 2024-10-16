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
            style={{ height : "24px", width : "24px", position : "absolute", top : "20px", right : "10px"}}
        />
    );
}
export default CloseImageButton;