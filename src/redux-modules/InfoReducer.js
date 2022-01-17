import { createAction } from "redux-actions";

const CHANGE_SELECT = "CHANGE_SELECT";
const CHANGE_POPUP = "CHANGE_POPUP";
const GET_POPUP_INFO = "GET_POPUP_INFO";

const INITIAL_STATE = {
    select: 0,
    popupinfo: {
        "active": false,
        "type": "info",
        "message": ""
    }
}

// 카테고리 선택 변경 액션
const changeSelect = createAction(CHANGE_SELECT, (num) => ({num}));
const changePopup = createAction(CHANGE_POPUP, (info) => ({info}));

// 리듀서 작성 & export
export default function Reducer(state=INITIAL_STATE, action){
    
    switch(action.type){
        case 'CHANGE_SELECT':
            return {
                ...state,
                select: action.payload.num
            }
        case 'CHANGE_POPUP':
            return {
                ...state,
                popupinfo: action.payload.info
            }
        default:
            return {
                ...state
            }           
    }
  
}

// 액션 전체 목록 작성
const InfoactionList = {
    changeSelect,
    changePopup
}

// 액션 목록 export
export { InfoactionList }