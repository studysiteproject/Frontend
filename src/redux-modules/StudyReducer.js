import { createAction } from 'redux-actions';

const SET_LIST = "SET_LIST"
const CHANGE_FAVORITE = "CHANGE_FAVORITE"

const INITIAL_STATE = {
    studylist : []
}

// 스터디 목록 얻어오기 액션
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

        default:
            return {
                ...state
            }           
    }
  
}

const StudyActionList = {
    SetList,
    ChangeFavorite
}
export { StudyActionList }