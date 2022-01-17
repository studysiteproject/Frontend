import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../../scss/base/Popup.scss';

// OK 버튼이 존재하지 않는 Popup
export function Popup(props){

    const popup_info = useSelector((state) => state.infoReducer.popupinfo)

    if(popup_info.popup_type == "default"){
        return (
            <div className='popup'>
                <div className={`popup-in-${popup_info.message_type}`}>
                    <text className='Font-Md Bold'>{popup_info.message}</text>                
                </div>
            </div>
        )
    }
    else{return(<></>)}
  
}

// OK 버튼이 존재하는 Popup
export function PopupConfirm(props){

    const popup_info = useSelector((state) => state.infoReducer.popupinfo)

    if(popup_info.popup_type == "confirm"){
        return (
            <div className='popup'>
                <div className={`popup-in-${popup_info.message_type}`}>
                    <text className='Font-Md Bold'>{popup_info.message}</text>
                    <button className='Button-Md' onClick={()=>{props.ok()}}>확인</button>
                    <button className='Button-Md' onClick={()=>{props.no()}}>취소</button>
                </div>
            </div>
        )
    }
    else{return(<></>)}

}