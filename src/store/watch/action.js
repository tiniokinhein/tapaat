import {
    ADD_WATCH,
    REMOVE_WATCH,
    DELETE_ALL_WATCH
} from './actionType'

export const add_watch = watch => ({
    type: ADD_WATCH,
    payload: watch
})

export const remove_watch = watch => ({
    type: REMOVE_WATCH,
    payload: watch
})

export const delete_all_watch = watch => ({
    type: DELETE_ALL_WATCH,
    payload: watch
})