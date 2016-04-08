import React, {
  Component,
  View
} from 'react-native';

import routes from '../routes/routes';
import { connect } from 'react-redux';
import { removeUserToken } from '../helpers/asyncStorage';
import { handleAlerts } from '../helpers/alerts.js';
import { removeUser, remove } from '../helpers/firebase';
import { logoutRequest, logoutSuccess, logoutFailure  } from '../actions/authentication';
import RemoveForm from '../components/RemoveForm';

class Remove extends Component {

  constructor(props) {
    super(props);
    this.handleRemoveAccount = this.handleRemoveAccount.bind(this);
    this.handleHomeRoute = this.handleHomeRoute.bind(this);
  }

  handleRemoveAccount(password) {
    let { user, logoutRequest, logoutSuccess, logoutFailure, navigator } = this.props;
    // console.log('Removing user: ', user.firstname)
    logoutRequest();
    // First remove the user
    removeUser(user.email.toString(), password, function(error) {
      logoutFailure();
      if (error) {
        handleAlerts(
          null, 
          error.toString(), 
          'Try again',
          null, 
          () => true
        )
      } else {
        // console.log('User removed! Now removing user profile')
        // Then remove the user profile (info)
        remove(user.uid.toString(), function(error) {
          if (error) {
            handleAlerts(
              null, 
              error.toString(), 
              'Try again',
              null, 
              () => true
            )
          } else {
            // console.log('User profile removed! Finally removing token from device')
            // Finally remove token from device
            removeUserToken()
              .then(() => {
                logoutSuccess();
                navigator.push(routes.getLogin());
                // console.log("User account deleted successfully!");
              })
              .catch(error => {
                // console.log('Error removing user', error)
                logoutFailure(error);
                navigator.push(routes.getLogin());
              })  
          }
        })
      }
    })
  }

  handleHomeRoute() {
    this.props.navigator.pop()
  }

  render() {
    return (
      <View style={{ flex:1, flexDirection:'column' }}>
        <RemoveForm 
          handleRemoveAccount={this.handleRemoveAccount}
          handleHomeRoute={this.handleHomeRoute}
          isFetching={this.props.isFetching}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.get('currentUser').get('user').toObject(),
    isFetching: state.get('currentUser').get('isFetching')
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logoutRequest: (creds) => dispatch(logoutRequest(creds)),
    logoutSuccess: (user) => dispatch(logoutSuccess(user)),
    logoutFailure: (errorMessage) => dispatch(logoutFailure(errorMessage))
  };
}

Remove.propTypes = {
  user: React.PropTypes.object.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  logoutRequest: React.PropTypes.func.isRequired,
  logoutSuccess: React.PropTypes.func.isRequired,
  logoutFailure: React.PropTypes.func.isRequired,
  navigator: React.PropTypes.object.isRequired
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Remove);
