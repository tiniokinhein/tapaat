import {
    ADD_WATCH,
    REMOVE_WATCH,
    DELETE_ALL_WATCH
} from './actionType'

const initialState = {
    watch: []
}

export default function(state=initialState , action) {
    switch (action.type) {
        case ADD_WATCH:
            return {
                ...state,
                watch_to_add: Object.assign({} , action.payload)
            }

        case REMOVE_WATCH:
            return {
                ...state,
                watch_to_remove: Object.assign({} , action.payload)
            }

        case DELETE_ALL_WATCH:
            return {
                ...state,
                watch_to_all_delete: Object.assign({} , action.payload)
            }
    
        default:
            return state
    }
}
