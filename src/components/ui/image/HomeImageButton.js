import React from "react";
import {imagePrefix} from "../../../utils/Constant";
import './CloseImageButton.css'

const HomeImageButton = () => {
    return (
        <img src={`${imagePrefix}/shared/BackOffice.png`} alt="likes"
             style={{ height : "70px", width : "100px", position : "absolute", bottom : "0px", left : "5px"}}/>
    );
}
export default HomeImageButton;