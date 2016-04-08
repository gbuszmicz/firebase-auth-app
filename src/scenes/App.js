import React, { Component } from 'react-native';
import ExNavigator from '@exponent/react-native-navigator';
import routes from '../routes/routes';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';

export default class FirebaseAuthApp extends Component {

  render() {
    let store = configureStore()
    return (
      <Provider store={ store } >
        <ExNavigator
          initialRoute={ routes.getSplash() }
          showNavigationBar={ false }
        />
      </Provider>
    );
  }
}
