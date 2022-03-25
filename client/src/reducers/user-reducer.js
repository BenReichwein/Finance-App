/* eslint-disable import/no-anonymous-default-export */
import {
    USER_INFO
} from '../actions/types'

export default (state = {userId: null,username: null}, action) => {
    switch (action.type) {
        case USER_INFO:
            return action.payload;
        default:
            return state;
    }
}