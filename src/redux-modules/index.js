import { combineReducers } from "redux";

import SelectReducer from './SelectReducer'
import StudyReducer from './StudyReducer'
import UserReducer from './UserReducer'

export default combineReducers({
    selectReducer : SelectReducer,
    studyReducer : StudyReducer,
    userReducer : UserReducer,
});