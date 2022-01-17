import { combineReducers } from "redux";

import InfoReducer from './InfoReducer'
import StudyReducer from './StudyReducer'
import UserReducer from './UserReducer'

export default combineReducers({
    infoReducer : InfoReducer,
    studyReducer : StudyReducer,
    userReducer : UserReducer,
});