// import { combineReducers } from 'redux'
import { combineReducers } from 'redux-immutablejs';
import currentUser from './authentication'

export default combineReducers({ currentUser })
