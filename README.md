# Auth App with React-Native and Firebase

[![Dependency Status](https://david-dm.org/gbuszmicz/firebase-auth-app.svg?style=flat)](https://david-dm.org/gbuszmicz/firebase-auth-app)
[![devDependency Status](https://david-dm.org/gbuszmicz/firebase-auth-app/dev-status.svg?style=flat)](https://david-dm.org/gbuszmicz/firebase-auth-app#info=devDependencies)

A simple auth app built using [Firebase](https://www.firebase.com/) as backend. 
You can:
- **Register a new account** with email and password
- **Login**
- **Logout**
- **Remove the account**

Tested only with **Android** so far

<p align="center">
  <img src ="https://fat.gfycat.com/SingleMadAlligatorsnappingturtle.gif" />
</p>

It saves the session token using [AsyncStorage](https://facebook.github.io/react-native/docs/asyncstorage.html), in your device.
If you are authenticated and close the App, next time you open it you will still be authenticated.

## Requirements
- [Node](https://nodejs.org) 4.x or newer
- [React Native](http://facebook.github.io/react-native/docs/getting-started.html) for development
- [Firebase](https://www.firebase.com/)
- [Android SDK](https://developer.android.com/sdk/) for Android development (optional)

## Stack
- [React Native](https://facebook.github.io/react-native/), for building native apps using react
- [Redux](http://rackt.github.io/redux/index.html), a predictable state container for Javascript apps
- [Remote Redux DevTools](https://github.com/zalmoxisus/remote-redux-devtools) to use Redux DevTools remotely for React Native apps
- [Babel](http://babeljs.io/), for ES6+ support
- [Immutable](https://facebook.github.io/immutable-js/), an immutable persistent data collections for Javascript
- [ExNavigator](https://github.com/exponentjs/ex-navigator), a route-centric navigation built on top of React Native's Navigator    


## Installation
Just [clone](github-windows://openRepo/https://github.com/gbuszmicz/firebase-auth-app.git) the repo
and start :
```shell
$ git clone https://github.com/gbuszmicz/firebase-auth-app.git FirebaseAuthApp
$ cd FirebaseAuthApp
$ npm install    # Install packages and libraries listed in ./package.json
```
And see [Getting Started](https://facebook.github.io/react-native/docs/getting-started.html) to install requirement tools.

### Usage
#### Create an account in Firebase
If you already have an account in Firebase you can use it. If not create a new one. It's **free**.
Just change this line in ```src/helpers/firebase.js```:
```javascript
import Firebase from 'firebase';
const FirebaseBaseUrl = 'https://<YOUR_ACCOUNT_HERE>.firebaseio.com';
```
Replace <YOUR_ACCOUNT_HERE> with your own account, for example:
```javascript
import Firebase from 'firebase';
const FirebaseBaseUrl = 'https://radiant-torch-2349.firebaseio.com';
```
In your Firebase Dashboard, enable **Email & Password Authentication** in the "Login & Auth" section


#### Build the app (debug-mode) into your emulator or device
You can use [Genymotion](https://www.genymotion.com/) as emulator for Android. 
You can also use your [Android device](https://facebook.github.io/react-native/docs/running-on-device-android.html). 
First of all check you have one (and only one) device connected:
```shell
$ adb devices
List of devices attached
192.168.58.101:5555    device
```

If you are running the app in a fisical device you will need to enable the ports (note that this option is available on devices running Android 5.0):
```shell
$ npm run android-setup-port    # adb reverse tcp:8081 tcp:8080
```

Then, just run (emulator/device):
```shell
$ react-native run-android
```

Once the app is built run this command to start the development server:
```shell
$ npm start    # or: react-native start
```
Note that the app only works with the development server on.

#### Testing the modules
You can test the reducers and actions
```shell
$ npm run test
```

For live testing run:
```shell
$ npm run test:watch
```

#### Linting the source code
```shell
$ npm run lint
```

### Redux DevTools
Update ```src/store/configureStore.js```:

Replace this:
```javascript
import { Platform } from 'react-native'
import createLogger from 'redux-logger'
// import thunkMiddleware from 'redux-thunk'
// import devTools from 'remote-redux-devtools'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from '../reducers/index'

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

[ ... ]
```

Uncomment this lines:
```javascript
import { Platform } from 'react-native'
import createLogger from 'redux-logger'
//import thunkMiddleware from 'redux-thunk'
import devTools from 'remote-redux-devtools'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from '../reducers/index'

const loggerMiddleware = createLogger({
  collapsed: true,
  stateTransformer: state => state.toJS() // Transformation necessary because of Immutable.js
})
const combineMiddleware = applyMiddleware(
  loggerMiddleware 
  //thunkMiddleware
)
const enhancer = compose(
  combineMiddleware,
  devTools()  // To use remote dev tools enable this and the import devTools
)

[ ... ]
```

Use ```Redux Devtools``` [Chrome extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) to check the redux actions and state changes.
Also you can select ```Debug in Chrome``` within the emulator ([Genymotion](https://www.genymotion.com/) for example) o device to check redux states in the inspection window


### Bundling APK file for release
To distribute this Android application via Google Play store or to other devices, you'll need to generate a signed release APK.
Follow the [oficial documentation](https://facebook.github.io/react-native/docs/signed-apk-android.html)


### Comments and issues
Feel free to contact me in [twitter](https://twitter.com/gbuszmicz) or [create an issue](https://github.com/gbuszmicz/firebase-auth-app/issues/new)
