import { InfoactionList } from "../InfoReducer";

export function ActivePopup(type, message){
    return function (dispatch){

        var Popup_Info = {
            "active": true,
            "type": type,
            "message": message
        }

        dispatch(InfoactionList.changePopup(Popup_Info));

    }
}
export function UnActivePopup(time=0){
    return function (dispatch){

        var Popup_Info = {
            "active": false,
            "type": "",
            "message": ""
        }

        // 타이머 설정 시, 정해진 시간이 지난 후 팝업이 사라진다.
        if (time > 0){
            Popup_Info.active = false;
            setTimeout(()=>{dispatch(InfoactionList.changePopup(Popup_Info))}, time * 1000);
        }
    }
}
