import React, { 
  Component, 
  View, 
  Text, 
  TextInput, 
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Colors from '../constants/Colors';
import Dimensions from 'Dimensions';
import { validateEmail } from '../helpers/validation';
import Footer from './Footer';
import Header from './Header';
import YourAreHere from '../components/YouAreHere';

const { width } = Dimensions.get('window');

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { 
      username: '',
      password: '',
      emptyUsernameInput: false,
      emptyPasswordInput: false,
      usernamePlaceholder: 'Email address',
      passwordPlaceholder: 'Password',
      showPassword: true,  // Default show password
      showPasswordText: 'Hide password'
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleShowPassword = this.handleShowPassword.bind(this);
    this.handleRegisterRoute = this.handleRegisterRoute.bind(this);
  }

  // Callback to scene login (../scenes/Login.js)
  handleLogin() { 
    if(this.state.username == '') { 
      this.setState({ 
        emptyUsernameInput: true,
        usernamePlaceholder: 'Email cannot be empty'
      });
    }
    if(this.state.username != '' && !validateEmail(this.state.username)) { 
      this.setState({ 
        emptyUsernameInput: true
      });
    }
    if(this.state.password == '') { 
      this.setState({ 
        emptyPasswordInput: true,
        passwordPlaceholder: 'Password cannot be empty'
      });
    }
    if(this.state.username != '' && this.state.username != '' && validateEmail(this.state.username)) 
      this.props.handleLogin(this.state.username, this.state.password)
  }

  // Callback to scene login (../scenes/Login.js)
  handleRegisterRoute() { 
    this.props.handleRegisterRoute()
  }

  // User is typing his/her username (username = email actually)
  handleUsernameChange(username) {
    this.setState({ 
      username, 
      emptyUsernameInput: false,
      usernamePlaceholder: 'Email address'
    });
  }

  // User is typing his/her password
  handlePasswordChange(password) {
    this.setState({ 
      password, 
      emptyPasswordInput: false,
      passwordPlaceholder: 'Password'
    });
  }

  // Handle clicking on link 'Show password'/'Hide password'
  handleShowPassword() {
    let text = 'Hide password'
    if(this.state.showPasswordText == 'Hide password') text = 'Show password'
    this.setState({ 
      showPassword: !this.state.showPassword,
      showPasswordText: text
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <YourAreHere
          scene={'src/scenes/Login.js'}
          component={'src/components/LoginForm.js'}
        />
        <Header /> 
        <View style={styles.loginFormContainer}>
          <Text style={{ fontSize:16, fontWeight:'bold', textAlign:'center', marginBottom:5 }}>Login with email and password</Text>
          <View style={[styles.inputContainer, this.state.emptyUsernameInput && styles.emptyInput]}>
            <TextInput
              style={styles.input}
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholder={this.state.usernamePlaceholder}
              value={this.state.username}
              onChangeText={this.handleUsernameChange}
              onSubmitEditing={this.onLogin}
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType={'email-address'}
              placeholderTextColor={this.state.emptyUsernameInput ? Colors.RED : Colors.MEDIUM_GREY} 
            />
          </View>      

          <View style={[styles.inputContainer, this.state.emptyPasswordInput && styles.emptyInput]}>
            <TextInput
              style={styles.input}
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholder={this.state.passwordPlaceholder}
              value={this.state.password}
              onChangeText={this.handlePasswordChange}
              onSubmitEditing={this.onLogin}
              autoCorrect={false}
              autoCapitalize="none"
              secureTextEntry={!this.state.showPassword}
              placeholderTextColor={this.state.emptyPasswordInput ? Colors.RED : Colors.MEDIUM_GREY} 
            />
          </View>
          
          <Text style={styles.linkText} onPress={this.handleShowPassword}>
            {this.state.showPasswordText}
          </Text>
          
          <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
            <Text style={{ color: Colors.WHITE }}>
              {this.props.currentUser.isFetching ? 'Logging in ... Wait ...' : 'Login'}
            </Text>
          </TouchableOpacity>

        </View>
        <Footer
          handleOnPress={this.handleRegisterRoute}
          smallText="Don't have an account?"
          bigText=" Register"
        />
      </View>
    );
  }
}

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: Colors.LIGHT_GREY
  },
  loginFormContainer: {
    flex: 0.6,
    paddingLeft: (width * 0.1),
    paddingRight: (width * 0.1)
  },
  button: {
    backgroundColor: Colors.LIGHT_BLUE,
    padding: 10,
    alignItems: 'center',
    borderWidth: 0,
    borderRadius: 8,
    marginTop: 20
  },
  inputUsername: {
    marginLeft: 5,
    width: 20,
    height: 18
  },
  inputContainer: {
    backgroundColor: Colors.WHITE,
    borderColor: Colors.WHITE,
    borderWidth: 2,
    borderRadius: 8,
    marginTop: 5
  },
  input: {
    position: 'relative',
    left: 10,
    top: 0,
    right: 0,
    height: 40,
    fontSize: 14,
    color: Colors.GREY       
  },
  emptyInput: {
    borderColor: Colors.RED
  },
  linkText: {
    fontSize:14, 
    color:Colors.BLUE, 
    textAlign:'right',
    marginTop:10,
    textDecorationLine:'underline'
  }
});

LoginForm.propTypes = {
  handleLogin: React.PropTypes.func.isRequired,
  handleRegisterRoute: React.PropTypes.func.isRequired,
  currentUser: React.PropTypes.object.isRequired
} 