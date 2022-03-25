import { combineReducers } from 'redux';
import profileReducer from './profile-reducer'
import userReducer from './user-reducer';

// In redux this is where we combine the states

export default combineReducers({
    profile: profileReducer,
    user: userReducer,
})