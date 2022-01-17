import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../../scss/base/Popup.scss';


// OK 버튼이 존재하지 않는 Popup
export function Popup(){

    const popup_info = useSelector((state) => state.infoReducer.popupinfo)

    return (
        <div className='popup'>
            <div className={`popup-in-${popup_info.type}`}>
                <text className='Font-Md Bold'>{popup_info.message}</text>                
            </div>
        </div>
    )
}

// OK 버튼이 존재하는 Popup
export function PopupOK(props){

    const popup_info = useSelector((state) => state.infoReducer.popupinfo)

    return (
        <div className='popup'>
            <div className={`popup-in-${popup_info.type}`}>
                <text className='Font-Md Bold'>{popup_info.message}</text>
                <button className='Button-Md' onClick={()=>{props.setflag(false)}}>확인</button>
            </div>
        </div>
    )
}