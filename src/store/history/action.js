import {
    ADD_HISTORY,
    REMOVE_HISTORY
} from './actionType'

export const add_history = history => ({
    type: ADD_HISTORY,
    payload: history
})

export const remove_history = history => ({
    type: REMOVE_HISTORY,
    payload: history
})