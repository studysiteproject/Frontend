import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { PopupConfirm } from "../components/util/Popup";
import { ActiveConfirmPopup, ActivePopup, UnActivePopup } from "../redux-modules/module/InfoManage";

function SettingsPage() {

    const dispatch = useDispatch();

    const [ok, setok] = useState(()=>()=>{alert("OK!")})
    const [no, setno] = useState(()=>()=>{alert("NO!")})

    useEffect(()=>{
        setok(()=>()=>{alert("CHANGE!")})
        dispatch(ActiveConfirmPopup("info", "테스트 성공!"));
        
    },[])

    return(<PopupConfirm ok={ok} no={no}/>);

}

export default SettingsPage