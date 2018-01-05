import {createLogger} from 'redux-logger'
// import thunkMiddleware from 'redux-thunk'
// import devTools from 'remote-redux-devtools'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from '../reducers/index'
import { Map, fromJS } from 'immutable';

const loggerMiddleware = createLogger({
  collapsed: true,
  stateTransformer: state => state.toJS() // Transformation necessary because of Immutable.js
})
const combineMiddleware = applyMiddleware(
  loggerMiddleware
  // thunkMiddleware
)
const enhancer = compose(
  combineMiddleware
  // devTools()  // To use remote dev tools enable this and the import devTools
)

// Default inicial state
const initialState = fromJS({
  currentUser: {
    isAuthenticated: false, 
    isFetching: false,
    loginWithErrors: false,
    registerWithErrors: false,
    user: Map(),
    errorMessage: ''        
  }
})

export default function configureStore(state = initialState) {
  return createStore(
    reducer, 
    state,
    enhancer
  )
}