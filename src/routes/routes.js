import ExNavigator from '@exponent/react-native-navigator'
import Home from '../scenes/Home'
import Login from '../scenes/Login'
import Splash from '../scenes/Splash'
import Register from '../scenes/Register'
import Remove from '../scenes/Remove'

const routes = {}

// Home screen. This is private. User must be authenticated
routes.getHome = () => ({
  getSceneClass() {
    return Home;
  },
  configureScene() {
    return ExNavigator.SceneConfigs.ZoomFromRight;
  }
})

// Login form
routes.getLogin = () => ({
  getSceneClass() {
    return Login;
  },
  configureScene() {
    return ExNavigator.SceneConfigs.FloatFromLeft;
  }
})

// Splash
routes.getSplash = () => ({
  getSceneClass() {
    return Splash;
  },
  configureScene() {
    return ExNavigator.SceneConfigs.ZoomFromFront;
  }
})

// Register form
routes.getRegister = () => ({
  getSceneClass() {
    return Register;
  },
  configureScene() {
    return ExNavigator.SceneConfigs.FloatFromRight;
  }
})

// Remove account form
routes.getRemoveAccount = () => ({
  getSceneClass() {
    return Remove;
  },
  configureScene() {
    return ExNavigator.SceneConfigs.FloatFromBottom;
  }
})

export default routes