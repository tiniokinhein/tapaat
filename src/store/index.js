import {
    createStore,
    compose,
    applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'
import Reducers from './reducers'


export default initialState => {
    initialState = JSON.parse(window.localStorage.getItem('state')) || initialState
    const middleware = [thunk]
    const store = createStore(
        Reducers,
        initialState,
        compose(applyMiddleware(...middleware))
    )

    store.subscribe(() => {
        const state = store.getState()
        const persist = {
            // history: state.history,
            watch: state.watch
        }
        window.localStorage.setItem('state', JSON.stringify(persist))
    })

    return store
}