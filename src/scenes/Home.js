import React, {
  Component
} from 'react-native';
import { connect } from 'react-redux';
import { removeUserToken } from '../helpers/asyncStorage';
import routes from '../routes/routes';
import Welcome from '../components/Welcome';
import { logoutRequest, logoutSuccess, logoutFailure } from '../actions/authentication';

class Home extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.hanldeRemoveAccount = this.hanldeRemoveAccount.bind(this);
  }

  handleLogout() {
    let { logoutRequest, logoutSuccess, logoutFailure, navigator } = this.props;
    logoutRequest();
    removeUserToken()
      .then(() => {
        logoutSuccess();
        navigator.push(routes.getLogin());
      })
      .catch(error => {
        // console.log('Error removing user', error)
        logoutFailure(error);
      });  
  }

  // Handle user clicks over Remove account
  hanldeRemoveAccount() {
    this.props.navigator.push(routes.getRemoveAccount());
  }

  render() {
    return (
      <Welcome 
        user={this.props.user}
        handleLogout={this.handleLogout} 
        hanldeRemoveAccount={this.hanldeRemoveAccount}
      />
    );
  }
}

Home.propTypes = {
  user: React.PropTypes.object.isRequired,
  logoutRequest: React.PropTypes.func.isRequired,
  logoutSuccess: React.PropTypes.func.isRequired,
  logoutFailure: React.PropTypes.func.isRequired,
  navigator: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return { 
    user: state.get('currentUser').get('user').toObject()
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    logoutRequest: () =>  dispatch(logoutRequest()),
    logoutSuccess: () => dispatch(logoutSuccess()),
    logoutFailure: (errorMessage) => dispatch(logoutFailure(errorMessage))
  };
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Home);
