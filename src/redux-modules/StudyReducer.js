import { createAction } from 'redux-actions';

const SET_LIST = "SET_LIST"

const INITIAL_STATE = {
    studylist : []
}

// 스터디 목록 얻어오기 액션
const SetList = createAction(SET_LIST, (data)=>({data}))
  
export default function Reducer(state=INITIAL_STATE, action){

    switch(action.type){
        
        case SET_LIST:
            return {
                ...state,
                studylist: action.payload.data
            }
        default:
            return {
                ...state
            }           
    }
  
}

const StudyActionList = {
    SetList
}
export { StudyActionList }