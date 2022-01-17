import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popup } from "../util/Popup"

function BasePage(){

    const popup_info = useSelector((state) => state.infoReducer.popupinfo);

    if (popup_info['active']){
        return (
            <Popup/>
        )
    }
    else {
        return(<></>);
    }
}

export default BasePage