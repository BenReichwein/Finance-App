import { combineReducers } from 'redux';
import profileReducer from './profile-reducer'
import authReducer from './auth-reducer'

// In redux this is where we combine the states

export default combineReducers({
    profile: profileReducer,
    auth: authReducer,
})