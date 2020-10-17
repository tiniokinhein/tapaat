import { combineReducers } from 'redux'
import historyReducer from './history/reducer'
import watchReducer from './watch/reducer'

const Reducers = combineReducers({
    history: historyReducer,
    watch: watchReducer
})

export default Reducers