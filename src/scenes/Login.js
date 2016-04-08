import React, {
  Component,
  View
} from 'react-native';

import routes from '../routes/routes';
import { connect } from 'react-redux';
import { saveUserToken } from '../helpers/asyncStorage';
import { handleAlerts } from '../helpers/alerts.js';
import { authWithPassword, getUserProfile } from '../helpers/firebase';
import { loginRequest, loginSuccess, loginFailure  } from '../actions/authentication';
import LoginForm from '../components/LoginForm';

class Login extends Component {

  constructor(props) {
    super(props);
    this.handleRegisterRoute = this.handleRegisterRoute.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleRegisterRoute() {
    this.props.navigator.push( routes.getRegister() );
  }

  handleLogin(username, password) {
    let { loginRequest, loginSuccess, loginFailure, navigator } = this.props;

    loginRequest(username)
    authWithPassword(username, password, function(error, authData) {
      if (error) {
        // console.log("Login Failed!", error);
        loginFailure(error);
        handleAlerts(
          null,             // title
          error.toString(), // message
          'Try again',      // btn1
          null,             // btn2
          () => true        // callback
        )

      } else {
        // console.log("Authenticated successfully with payload:", authData);
        let authToken = authData.token.toString();
        let uid = authData.uid.toString();
        saveUserToken(authToken)
          .then(user => {
            // console.log('User profile loaded.. Going home!')
            getUserProfile(authData.uid, function(error, profile) {
              if(error) console.log('Error getting user profile: ', error)
              if(!error) {
                let credentials = {
                  firstname: profile.firstname,
                  email: username,
                  uid
                }
                loginSuccess(credentials)
              }
              navigator.push( routes.getHome() )
            })
          })
          .catch(error => {
            console.log('Error saving user: ',error)
          });    
      }
    })
  }

  render() {
    return (
      <View style={{ flex:1, flexDirection:'column' }}>
        <LoginForm 
          handleLogin={this.handleLogin}
          handleRegisterRoute={this.handleRegisterRoute}
          currentUser={this.props.currentUser}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.get('currentUser').toObject()
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: (creds) => dispatch(loginRequest(creds)),
    loginSuccess: (user) => dispatch(loginSuccess(user)),
    loginFailure: (errorMessage) => dispatch(loginFailure(errorMessage))
  };
}

Login.propTypes = {
  currentUser: React.PropTypes.object.isRequired,
  loginRequest: React.PropTypes.func.isRequired,
  loginSuccess: React.PropTypes.func.isRequired,
  loginFailure: React.PropTypes.func.isRequired,
  navigator: React.PropTypes.object.isRequired
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Login);
