import { createAction } from 'redux-actions';

const INIT_ACTION = "INIT_ACTION";
const SET_LIST = "SET_LIST";
const CHANGE_FAVORITE = "CHANGE_FAVORITE";

const INITIAL_STATE = {
    studylist : []
}

// 스터디 목록 얻어오기 액션
const Initaction = createAction(INIT_ACTION);
const SetList = createAction(SET_LIST, (data)=>({data}));
const ChangeFavorite = createAction(CHANGE_FAVORITE, (id)=>({id}));
  
export default function Reducer(state=INITIAL_STATE, action){

    switch(action.type){
        
        case SET_LIST:
            return {
                ...state,
                studylist: action.payload.data
            }
            
        case CHANGE_FAVORITE:
            
            // 입력한 index의 item 얻어오기
            const index = state.studylist.findIndex(studylist => studylist.id == action.payload.id)    
            const newArray = [...state.studylist];

            newArray[index].isfavorite = !newArray[index].isfavorite

            return { 
                ...state, //copying the orignal state
                studylist: newArray, //reassingning todos to new array
            }
        
        case INIT_ACTION:
            return {
                ...state,
                studylist: INITIAL_STATE
            }

        default:
            return {
                ...state
            }           
    }
  
}

const StudyActionList = {
    Initaction,
    SetList,
    ChangeFavorite
}
export { StudyActionList }