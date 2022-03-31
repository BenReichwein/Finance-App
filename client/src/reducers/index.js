import { combineReducers } from 'redux';
import profileReducer from './profileReducer'
import userReducer from './userReducer';

// In redux this is where we combine the states

export default combineReducers({
    profile: profileReducer,
    user: userReducer,
})