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
import { validateEmail } from '../helpers/validation';
import Footer from './Footer';
import Header from './Header';
import YourAreHere from '../components/YouAreHere';
import Dimensions from 'Dimensions';
const { width } = Dimensions.get('window');

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { 
      username: '',
      password: '',
      firstname: '',
      emptyUsernameInput: false,
      emptyPasswordInput: false,
      emptyFirstnameInput: false,
      usernamePlaceholder: 'Email address',
      passwordPlaceholder: 'Password',
      firstnamePlaceholder: 'First name'
    };
    this.handleRegister = this.handleRegister.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
  }

  // User clicks on button 'Register'
  handleRegister() {
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
    if(this.state.firstname == '') { 
      this.setState({ 
        emptyFirstnameInput: true,
        firstnamePlaceholder: 'Firstname cannot be empty'
      });
    }
    if(this.state.username != '' && this.state.username != '' && this.state.username != '' && validateEmail(this.state.username)) 
      this.props.handleRegister(this.state.firstname, this.state.username, this.state.password) // Callback to container ../scenes/Register.js
  }

  // User is typing his/her username (email)
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

  // User is typing his/her first name
  handleFirstnameChange(firstname) {
    this.setState({ 
      firstname, 
      emptyFirstnameInput: false,
      fistnamePlaceholder: 'First name'
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <YourAreHere
          scene={'src/scenes/Register.js'}
          component={'src/components/RegisterForm.js'}
        />        
        <Header /> 
        <View style={styles.registerFormContainer}>
          <Text style={{ fontSize:16, fontWeight:'bold', textAlign:'center', marginBottom:5, color:Colors.GREY }}>
            Register a new user with {'\n'} email and password
          </Text>
          <View style={[styles.inputContainer, this.state.emptyFirstnameInput && styles.emptyInput]}>
            <TextInput
              style={styles.input}
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholder={this.state.firstnamePlaceholder}
              value={this.state.firstname}
              onChangeText={this.handleFirstnameChange}
              onSubmitEditing={this.onLogin}
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType={'default'}
              placeholderTextColor={this.state.emptyFirstnameInput ? Colors.RED : Colors.MEDIUM_GREY} 
            />
          </View>      

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
              placeholderTextColor={this.state.emptyPasswordInput ? Colors.RED : Colors.MEDIUM_GREY} 
            />
          </View>
          
          <TouchableOpacity style={styles.button} onPress={this.handleRegister}>
            <Text style={{ color: Colors.WHITE }}>
              {this.props.currentUser.isFetching ? 'Registering user ... Wait ...' : 'Register'}
            </Text>
          </TouchableOpacity>
        </View>

        <Footer
          handleOnPress={this.props.handleLoginRoute}
          smallText="Already have an account?"
          bigText=" Login"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: Colors.BLUE_BG
  },
  registerFormContainer: {
    flex: 0.6,
    paddingLeft: (width * 0.1),
    paddingRight: (width * 0.1)
  },
  button: {
    backgroundColor: Colors.GREY,
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
    fontSize:13, 
    color:'#0077CC', 
    textAlign:'right',
    marginTop:5
  }
});

RegisterForm.propTypes = {
  handleRegister: React.PropTypes.func.isRequired,
  handleLoginRoute: React.PropTypes.func.isRequired,
  currentUser: React.PropTypes.object.isRequired
} 