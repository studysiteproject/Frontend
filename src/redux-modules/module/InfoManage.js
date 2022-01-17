import { InfoactionList } from "../InfoReducer";

export function ActivePopup(message_type, message){
    return function (dispatch){

        var Popup_Info = {
            "active": true,
            "message_type": message_type,
            "message": message,
            "popup_type": "default"
        }

        dispatch(InfoactionList.changePopup(Popup_Info));

    }
}

export function ActiveConfirmPopup(message_type, message){
    return function (dispatch){

        var Popup_Info = {
            "active": true,
            "message_type": message_type,
            "message": message,
            "popup_type": "confirm"
        }

        dispatch(InfoactionList.changePopup(Popup_Info));

    }
}

export function UnActivePopup(time=0){
    return function (dispatch){

        var Popup_Info = {
            "active": false,
            "message_type": "",
            "message": "",
            "popup_type": "default"
        }

        // 타이머 설정 시, 정해진 시간이 지난 후 팝업이 사라진다.
        if (time > 0){
            Popup_Info.active = false;
            setTimeout(()=>{dispatch(InfoactionList.changePopup(Popup_Info))}, time * 1000);
        }
        else{
            Popup_Info.active = false;
            dispatch(InfoactionList.changePopup(Popup_Info));
        }
    }
}
