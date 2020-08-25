import { combineReducers } from 'redux';
import user from './authReducer'
import errorReducer from './errorReducer'
import profileReducer from './profileReducer'
import bookingReducer from './bookingReducer'

export default combineReducers({
    user,
    errors: errorReducer,
    profile: profileReducer,
    bookings: bookingReducer
})