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
                    <div className='popup-in-button'>
                        <button className='Button-Md' onClick={()=>{props.ok()}}>확인</button>
                        <button className='Button-Md' onClick={()=>{props.no()}}>취소</button>
                    </div>
                </div>
            </div>
        )
    }
    else{return(<></>)}

}

// OK 버튼이 존재하지 않는 Popup
export function PopupInfo(props){

    var Frame_style = {
        padding:'auto',
        overflow:'auto'
    }
    
    // 정해진 width 값이 존재하는 경우
    if (typeof props.padding !== 'undefined') {
        Frame_style['padding'] = props.padding;
    }

    return(
        <div className='popup-aline-center' style={Frame_style}>
            <div className='popup-info'>
                {props.children}
            </div>
        </div>
    )
  
}