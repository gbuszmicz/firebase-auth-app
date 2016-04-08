
import { Map, fromJS } from 'immutable';
import { 
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, 
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE,
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
  LOAD_USER_REQUEST, LOAD_USER_FAILURE
} from '../actions/authentication'

// User state tree in Redux
// "currentUser": {
//   "isAuthenticated": true,
//   "isFetching": false,
//   "loginWithErrors": false,
//   "registerWithErrors": false,
//   "user": {
//     "firstname": "Gonzalo",
//     "uid": 1111-2222-3333-4444,
//     "email": "gonzalo@email.com"
//   },
//   "errorMessage": ""
// }


function loginRequest(state, email) {
  return state
          .set('isFetching', true)
          .setIn(['user','email'], email)
}

function loginSuccess(state, user) {
  return state
          .set('isAuthenticated', true)
          .set('isFetching', false)
          .setIn(['user','firstname'], user.firstname)
          .setIn(['user','email'], user.email)
          .setIn(['user','uid'], user.uid)
}

function loginFailure(state, errorMessage) {
  return state
          .set('isFetching', false)
          .set('loginWithErrors', true)
          .set('errorMessage', errorMessage);
}


const initialState = fromJS({
  isAuthenticated: false, 
  isFetching: false,
  loginWithErrors: false,
  registerWithErrors: false,
  user: Map(),
  errorMessage: ''        
})
// let initialState = Map()

export default function currentUser(state=initialState, action) {
  switch (action.type) {

    case LOGIN_REQUEST:
      return loginRequest(state, action.user.email);

    case LOGIN_SUCCESS:
      return loginSuccess(state, action.user)

    case LOGIN_FAILURE:
      return loginFailure(state, action.errorMessage) 

    case LOGOUT_REQUEST:
      return state.set('isFetching', true)

    case LOGOUT_SUCCESS:
      return state
              .set('isAuthenticated', false)
              .set('isFetching', false)
              .set('user', Map())

    case LOGOUT_FAILURE:
      return state
              .set('isFetching', false)
              .set('errorMessage', action.errorMessage);

    case REGISTER_REQUEST:
      return state
              .set('isFetching', true)
              .set('registerWithErrors', false)
              .set('errorMessage', '');

    case REGISTER_SUCCESS:
      return state
              .set('isFetching', false)
              .set('user', Map())

    case REGISTER_FAILURE:
      return state
              .set('isFetching', false)
              .set('registerWithErrors', true)
              .set('errorMessage', action.errorMessage);

    case LOAD_USER_REQUEST:
      return state
              .set('isFetching', true)

    case LOAD_USER_FAILURE:
      return state
              .set('isFetching', false)

    default:
      return state
  }
}