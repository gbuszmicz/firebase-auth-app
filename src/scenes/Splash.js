import React, {
  Component,
  View
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Colors from '../constants/Colors';
import { connect } from 'react-redux';
import routes from '../routes/routes';
import { getUserToken } from '../helpers/asyncStorage';
import { authWithCustomToken, getUserProfile } from '../helpers/firebase';
import { 
  loadUserRequest, loadUserFailure, 
  loginSuccess, loginFailure 
} from '../actions/authentication';

class Splash extends Component {

  constructor(props) {
    super(props);
    this.handleLoginWithToken = this.handleLoginWithToken.bind(this);
    this.state = { visible: true }
  }

  componentDidMount() {
    this.checkUserToken()
  }

  componentWillUnmount() {
    this.setState({ visible: false });
  }

  checkUserToken() {
    let _self = this;
    let { loadUserFailure, loadUserRequest, navigator } = this.props;
    loadUserRequest();
    getUserToken().then(user => {
      if(!user) {
        // console.log('No user found')
        loadUserFailure()
        navigator.push(routes.getLogin())
      } else {
        // console.log('User found: ',user)
        let authToken = user.token.toString();
        _self.handleLoginWithToken(authToken);
      }
    })
  }

  handleLoginWithToken(authToken) {
    let { navigator, loginSuccess, loginFailure } = this.props;
    authWithCustomToken(authToken, function(error, authData) {
      if(error) {
        navigator.push(routes.getLogin())
        loginFailure(error)
      
      } else {
      //   console.log("Login Failed!", error);
      // } else {
        // console.log("Authenticated successfully with payload:", authData);
        getUserProfile(authData.uid, function(error, profile) {
          if(error) {
            // console.log('Error getting user profile: ', error)
            navigator.push(routes.getLogin())
            loginFailure(error)
          } else {
            if(profile) {
              let credentials = {
                firstname: profile.firstname,
                email: profile.email,
                uid: authData.uid.toString()
              }
              loginSuccess(credentials)
              navigator.push(routes.getHome())
            } else {
              navigator.push(routes.getLogin())
            }

          }
        })
      }
    })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Spinner 
          visible={this.state.visible} 
          overlayColor={Colors.LIGHT_GREY} 
          color={Colors.GREEN}
        />
      </View>
    );
  }
}

Splash.propTypes = {
  currentUser: React.PropTypes.object.isRequired,
  loadUserRequest: React.PropTypes.func.isRequired,
  loginSuccess: React.PropTypes.func.isRequired,
  loadUserFailure: React.PropTypes.func.isRequired,
  loginFailure: React.PropTypes.func.isRequired,
  navigator: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.get('currentUser').toObject()
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loadUserRequest: () => dispatch(loadUserRequest()),
    loginSuccess: (creds) => dispatch(loginSuccess(creds)), // creds = email + password
    loadUserFailure: () => dispatch(loadUserFailure()),
    loginFailure: (errorMessage) => dispatch(loginFailure(errorMessage))
  };
}
export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Splash);