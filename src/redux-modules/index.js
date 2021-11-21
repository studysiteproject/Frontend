import { combineReducers } from "redux";

import SelectReducer from './SelectReducer'
import StudyReducer from './StudyReducer'

export default combineReducers({
    selectReducer : SelectReducer,
    studyReducer : StudyReducer
});