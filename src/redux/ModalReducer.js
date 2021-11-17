const INITIAL_STATE = {
    select: 0
}
  
function Reducer(state=INITIAL_STATE, action){
    
    switch(action.type){

        case 'CHANGE_SELECT':
            return{
                ...state,
                select: action.payload.category
            }
        default:
            return {
                ...state
            }
                
    }
  
}

export default Reducer