import {
    ADD_HISTORY,
    REMOVE_HISTORY
} from './actionType'

const initialState = []

export default function(state=initialState , action) {
    switch (action.type) {
        case ADD_HISTORY:
            let addArray = state.slice()
            addArray.splice(action.index, 0 , action.payload)
            return addArray

        case REMOVE_HISTORY:
            let removeArray = state.slice()
            removeArray.splice(action.index)
            return removeArray
    
        default:
            return state
    }
}