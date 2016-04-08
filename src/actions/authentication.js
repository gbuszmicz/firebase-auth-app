'use strict';

// import { removeUser } from '../store/asyncStorage'
// import { AsyncStorage } from 'react-native'
// import React from 'react-native'

// ---- Actions
// An action is a plain object that represents an intention to change the state. 
// Actions are the only way to get data into the store.
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST'
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE'

// ---- Action creators
// An action creator is, quite simply, a function that creates an action.
// Calling an action creator only produces an action, but does not dispatch it.
// You need to call the store’s dispatch function to actually cause the mutation.
// -- Login
export function loginRequest(user) {
  return { 
    type: LOGIN_REQUEST,
    user 
  }
}
export function loginSuccess(user) {
  return { 
    type: LOGIN_SUCCESS, 
    user 
  }
}
export function loginFailure(errorMessage) {
  return { 
    type: LOGIN_FAILURE, 
    errorMessage 
  }
}
// -- Logout
export function logoutRequest() {
  return { 
    type: LOGOUT_REQUEST
  }
}
export function logoutSuccess() {
  return { 
    type: LOGOUT_SUCCESS
  }
}

export function logoutFailure(errorMessage) {
  return { 
    type: LOGOUT_FAILURE, 
    errorMessage 
  }
}
// -- Register
export function registerRequest() {
  return { 
    type: REGISTER_REQUEST
  }
}
export function registerSuccess() {
  return { 
    type: REGISTER_SUCCESS
  }
}
export function registerFailure(errorMessage) {
  return { 
    type: REGISTER_FAILURE, 
    errorMessage 
  }
}
// -- Load user from token
export function loadUserRequest() {
  return { 
    type: LOAD_USER_REQUEST
  }
}
export function loadUserFailure() {
  return { 
    type: LOAD_USER_FAILURE 
  }
}

// Logs the user out
// export function logoutUser() {
//   return dispatch => {
//     dispatch(logoutRequest())
//     // removeUser().then(dispatch(logoutSuccess()))
//   }
// }