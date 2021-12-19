import { createAction } from "redux-actions";

const CHANGE_SELECT = "CHANGE_SELECT"

const INITIAL_STATE = {
    select: 0
}

// 카테고리 선택 변경 액션
const changeSelect = createAction(CHANGE_SELECT, (num) => ({num}));

// 리듀서 작성 & export
export default function Reducer(state=INITIAL_STATE, action){
    
    switch(action.type){
        case 'CHANGE_SELECT':
            return{
                ...state,
                select: action.payload.num
            }
        default:
            return {
                ...state
            }           
    }
  
}

// 액션 전체 목록 작성
const actionList = {
    changeSelect
}

// 액션 목록 export
export { actionList }