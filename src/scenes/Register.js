import React, {
  Component,
  View
} from 'react-native';

import routes from '../routes/routes';
import { connect } from 'react-redux';
import { handleAlerts } from '../helpers/alerts.js';
import { createUser, addUserProfile, authWithPassword } from '../helpers/firebase';
import { 
  registerRequest, registerSuccess, registerFailure,
  loginSuccess, loginFailure 
} from '../actions/authentication';
import { saveUserToken } from '../helpers/asyncStorage';
import RegisterForm from '../components/RegisterForm';

class Register extends Component {

  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLoginRoute = this.handleLoginRoute.bind(this);
  }

  handleLoginRoute() {
    this.props.navigator.pop();
  }

  handleRegister(firstname, username, password) {
    let { 
      registerRequest, registerFailure,
      loginSuccess, loginFailure,
      navigator 
    } = this.props;
    registerRequest();
    createUser(username, password, function(error, userData) {
      if (error) {
        // console.log("Error creating user:", error);
        registerFailure(error);
        handleAlerts(
          null,             // title
          error.toString(), // message
          'Try again',      // btn1
          null,             // btn2
          () => true        // callback
        );

      } else {
        // console.log("Successfully created user account with uid:", userData.uid);

        let lastActivity = new Date().getTime();
        let userProfile = {
          provider: 'password',
          email: username,
          firstname,
          createdAt: lastActivity,
          lastActivity
        }
        addUserProfile(userData.uid.toString(), userProfile, function(error, profile) {
          if(error) throw new Error('Error saving user profile. ',error) // TODO. handle
          if(!error) throw new Error(profile)

          // Autologin after registration
          authWithPassword(username, password, function(error, authData) {
            if (error) {
              // console.log("Autologin Failed!", error);
              handleAlerts(
                null,             // title
                error.toString(), // message
                'Try again',      // btn1
                null,             // btn2
                () => true        // callback
              );
              loginFailure(error)
              navigator.push( routes.getLogin() );

            } else {
              let authToken = authData.token.toString();
              let uid = authData.uid.toString();

              // Save token
              saveUserToken(authToken)
                .then(() => {
                  let credentials = {
                    firstname,
                    email: username,
                    uid
                  }
                  loginSuccess(credentials)
                  navigator.push( routes.getHome() )
                })
                .catch(error => {
                  throw new Error('Error saving user: ',error)
                });
            }
          })
        })
      }
    });
  }

  render() {
    return (
      <View style={{ flex:1, flexDirection:'column' }}>
        <RegisterForm 
          handleRegister={this.handleRegister}
          handleLoginRoute={this.handleLoginRoute}
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
    registerRequest: (creds) => dispatch(registerRequest(creds)),
    registerSuccess: (user) => dispatch(registerSuccess(user)),
    registerFailure: (errorMessage) => dispatch(registerFailure(errorMessage)),
    loginSuccess: (user) => dispatch(loginSuccess(user)),
    loginFailure: (errorMessage) => dispatch(loginFailure(errorMessage))
  };
}

Register.propTypes = {
  currentUser: React.PropTypes.object.isRequired,
  registerRequest: React.PropTypes.func.isRequired,
  registerSuccess: React.PropTypes.func.isRequired,
  registerFailure: React.PropTypes.func.isRequired,
  loginSuccess: React.PropTypes.func.isRequired,
  loginFailure: React.PropTypes.func.isRequired,
  navigator: React.PropTypes.object.isRequired
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Register);
