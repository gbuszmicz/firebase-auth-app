// Ref.: http://kyrisu.com/2016/01/31/unit-testing-react-native-components-with-enzyme-part-1/
// Testing for src/reduces/authentication

import { Map, fromJS } from 'immutable';
import { expect } from 'chai';
import configureStore from '../src/store/configureStore';
import { 
  loginRequest, loginSuccess, loginFailure,
  logoutRequest, logoutSuccess, logoutFailure
} from '../src/actions/authentication';
import authReducer from '../src/reducers/authentication';

describe('User reducer', () => {

   /***********************************************/
  it('handles LOGIN_REQUEST', () => {
    const initialState = Map({
      isAuthenticated: false, 
      isFetching: false,
      loginWithErrors: false,
      registerWithErrors: false,
      user: Map(),
      errorMessage: ''        
    })
    const credentials = {
      email: 'gonzalo@email.com'
    }
    const nextState = authReducer(initialState, loginRequest(credentials));
    expect(nextState).to.equal(fromJS({
        'isAuthenticated': false, 
        'isFetching': true,
        loginWithErrors: false,
        registerWithErrors: false,
        'user': Map({
          email:'gonzalo@email.com'
        }),
        'errorMessage': ''
      })
    )  
  })

   /***********************************************/
  it('handles LOGIN_SUCCESS', () => {
    const initialState = Map({
      isAuthenticated: false, 
      isFetching: true,
      loginWithErrors: false,
      registerWithErrors: false,
      user: Map(),
      errorMessage: ''
    })
    const user = {
      email: 'gonzalo@email.com',
      firstname: 'Gonzalito',
      uid: '1111-2222-3333-4444'
    }
    const nextState = authReducer(initialState, loginSuccess(user));
    expect(nextState).to.equal(fromJS({
      'isAuthenticated': true, 
      'isFetching': false,
      loginWithErrors: false,
      registerWithErrors: false,
      'user': {
        email: 'gonzalo@email.com',
        firstname: 'Gonzalito',
        uid: '1111-2222-3333-4444'
      },
      'errorMessage': ''
    }))  
  })

  /***********************************************/
  it('handles LOGIN_FAILURE', () => {
    const initialState = Map({
      isAuthenticated: false, 
      isFetching: true,
      loginWithErrors: false,
      registerWithErrors: false,
      user: Map({
        email: 'gonzalo@email.com'
      }),
      errorMessage: ''
    })
    const nextState = authReducer(initialState, loginFailure('Authentication error'));
    expect(nextState).to.equal(fromJS({
      'isAuthenticated': false, 
      'isFetching': false,
      loginWithErrors: true,
      registerWithErrors: false,
      'user': Map({
        email: 'gonzalo@email.com'
      }),
      'errorMessage': 'Authentication error'
    }))  
  });

  /***********************************************/
  it('handles LOGOUT_REQUEST', () => {
    const initialState = Map({
      isAuthenticated: true, 
      isFetching: false,
      loginWithErrors: false,
      registerWithErrors: false,
      user: Map({
        email: 'gonzalo@email.com'
      }),
      errorMessage: ''
    })
    const nextState = authReducer(initialState,logoutRequest())
    expect(nextState).to.equal(fromJS({
      isAuthenticated: true, 
      isFetching: true,
      loginWithErrors: false,
      registerWithErrors: false,
      user: {
        email: 'gonzalo@email.com'
      },
      errorMessage: ''
    }))  
  });

  /***********************************************/
  it('handles LOGOUT_SUCCESS', () => {
    const initialState = Map({
      isAuthenticated: true, 
      isFetching: true,
      loginWithErrors: false,
      registerWithErrors: false,
      user: Map({
        email: 'gonzalo@email.com'
      }),
      errorMessage: ''
    })
    const nextState = authReducer(initialState, logoutSuccess());
    expect(nextState).to.equal(fromJS({
      isAuthenticated: false, 
      isFetching: false,
      loginWithErrors: false,
      registerWithErrors: false,
      user: Map(),
      errorMessage: ''
    }))  
  });

  /***********************************************/
  it('handles LOGOUT_FAILURE', () => {
    const initialState = Map({
      isAuthenticated: true, 
      isFetching: true,
      loginWithErrors: false,
      registerWithErrors: false,
      user: Map({
        email: 'gonzalo@email.com'         
      }),
      errorMessage: ''
    })
    const nextState = authReducer(initialState, logoutFailure('Error logging out'));
    expect(nextState).to.equal(fromJS({
      'isAuthenticated': true, 
      'isFetching': false,
      loginWithErrors: false,
      registerWithErrors: false,
      'user': Map({
        email: 'gonzalo@email.com'
      }),
      'errorMessage': 'Error logging out'
    }))  
  });

  /***********************************************/
  it('handles a series of actions: LOGIN -> LOGOUT', () => {
    const initialState = Map({
      isAuthenticated: false, 
      isFetching: false,
      loginWithErrors: false,
      registerWithErrors: false,
      user: Map(),
      errorMessage: ''        
    })
    const credentials = {
      email: 'gonzalo@email.com'
    }
    const user = {
      email: 'gonzalo@email.com',
      firstname: 'Gonzalito',
      uid: '1111-2222-3333-4444'
    }
    const actions = [
      loginRequest(credentials),
      loginSuccess(user),
      logoutRequest(),
      logoutSuccess()
    ]
    const finalState = actions.reduce(authReducer, initialState)
    expect(finalState).to.equal(fromJS({
      'isAuthenticated': false, 
      'isFetching': false,
      loginWithErrors: false,
      registerWithErrors: false,
      'user': Map(),
      'errorMessage': ''
    }))    
  });
});
